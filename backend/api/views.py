from django.shortcuts import render
import random
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from api import serializer as api_serializer
from django.db import models
from django.db.models import Count, Sum
from django.db.models.functions import TruncDate
from django.utils import timezone
from datetime import timedelta
from userauths.models import User, Profile

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = api_serializer.MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = api_serializer.RegisterSerializer
    permission_classes = [AllowAny]

def generate_random_otp(length=7):
    otp = ''.join([str(random.randint(0, 9)) for _ in range(length)])

class PasswordResetEmailVerifyAPIView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.UserSerializer

    def get_object(self):
        email = self.kwargs['email']

        user = User.objects.filter(email=email).first()

        if user:
            uuidb64 = user.pk
            refresh =RefreshToken.for_user(user)
            refresh_token = str(refresh.access_token)
            user.refresh_token = refresh_token
            otp = generate_random_otp()
            user.otp = generate_random_otp()
            user.save()

            

            link = f"http://localhost:5173/create-new-password/?otp={otp}&uuidb64={uuidb64}&refresh_token={refresh_token}"

            merge_data = {
                "link": link,
                "username": user.username,
            }

            subject = "Password Reset Email"
            text_body = render_to_string("email/password_reset.txt", merge_data)
            html_body = render_to_string("email/password_reset.html", merge_data)

            msg = EmailMultiAlternatives(
                subject=subject,
                from_email=settings.FROM_EMAIL,
                to=[user.email],
                body=text_body
                )
            
            msg.attach_alternative(html_body, "text/html")
            msg.send()

            print("link ====", link)
        return user

class PasswordChangeAPIView(generics.UpdateAPIView):
    permission_classes = [AllowAny]
    serializer_class = api_serializer.UserSerializer

    def create(self,request,*args, **kwargs):
        payload = request.data  

        otp = payload['otp']
        uuidb64 = payload['uuidb64']
        password = request.data['password']

        user = User.objects.get(id=uuidb64, otp=otp)
        if user:
            user.set_password(password)
            user.otp = ""
            user.save()

            return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"message": "User Does Not Exist"}, status=status.HTTP_404_NOT_FOUND)

class InstructorDashboardStatsAPIView(generics.GenericAPIView):
    serializer_class = api_serializer.InstructorSummarySerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        # Basic aggregation; adjust if you have dedicated teacher relation
        courses = user.course_set.all() if hasattr(user, 'course_set') else []
        total_courses = len(courses)
        # Gather enrolled students via related EnrolledCourse model
        from api.models import EnrolledCourse, CartOrderItem
        total_students = EnrolledCourse.objects.filter(course__teacher__user=user).values('user').distinct().count()
        # Simplistic revenue: sum order item totals for teacher
        revenue_qs = CartOrderItem.objects.filter(teacher__user=user)
        total_revenue = revenue_qs.aggregate(models.Sum('total')).get('total__sum') or 0

        data = {
            'total_courses': total_courses,
            'total_students': total_students,
            'total_revenue': total_revenue,
        }
        serializer = self.get_serializer(data)
        return Response(serializer.data, status=200)

class InstructorCourseListAPIView(generics.ListAPIView):
    serializer_class = api_serializer.InstructorCourseMiniSerializer
    permission_classes = [IsAuthenticated]
    page_size = 10

    def get_queryset(self):
        user = self.request.user
        qs = user.course_set.all().order_by('-date') if hasattr(user, 'course_set') else []
        if qs:
            qs = qs.annotate(enrolled=Count('enrolledcourse', distinct=True))
        search = self.request.query_params.get('q')
        if search:
            qs = qs.filter(title__icontains=search)
        return qs

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        page = request.query_params.get('page', 1)
        page_size = int(request.query_params.get('page_size', self.page_size))
        try:
            page = int(page)
        except ValueError:
            page = 1
        start = (page - 1) * page_size
        end = start + page_size
        items = queryset[start:end]
        serializer = self.get_serializer(items, many=True)
        return Response({
            'count': queryset.count(),
            'page': page,
            'page_size': page_size,
            'results': serializer.data,
        })

class InstructorRevenueTrendAPIView(generics.GenericAPIView):
    serializer_class = api_serializer.RevenueDaySerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        from api.models import CartOrderItem
        user = request.user
        today = timezone.now().date()
        start = today - timedelta(days=29)
        qs = CartOrderItem.objects.filter(teacher__user=user, date__date__gte=start, date__date__lte=today)
        daily = (qs.annotate(day=TruncDate('date'))
                   .values('day')
                   .annotate(total=Sum('total'))
                   .order_by('day'))
        data = [{'date': d['day'], 'total': d['total'] or 0} for d in daily]
        return Response(data, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def featured_courses(request):
    from api.models import Course
    from api.serializer import CourseSerializer
    qs = Course.objects.filter(platform_status='active', teacher_status='available', featured=True).order_by('-date')[:8]
    ser = CourseSerializer(qs, many=True, context={'request': request})
    # slim down payload
    slim = []
    for c in ser.data:
        slim.append({
            'id': c['id'],
            'title': c['title'],
            'slug': c['slug'],
            'image': c['image'],
            'price': c['price'],
            'level': c['level'],
            'average_rating': c['average_rating'],
            'rating_count': c['rating_count'],
        })
    return Response(slim, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def recent_reviews(request):
    from api.models import Review
    from api.serializer import ReviewSerializer
    qs = Review.objects.filter(active=True).order_by('-date')[:6]
    ser = ReviewSerializer(qs, many=True, context={'request': request})
    data = []
    for r in ser.data:
        data.append({
            'id': r['id'],
            'review': r['review'],
            'rating': r['rating'],
            'course': r['course'],
            'date': r['date'],
        })
    return Response(data, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def course_detail(request, slug):
    from api.models import Course
    from api.serializer import CourseSerializer
    try:
        course = Course.objects.get(slug=slug, platform_status='active', teacher_status='available')
    except Course.DoesNotExist:
        return Response({"message": "Course not found"}, status=status.HTTP_404_NOT_FOUND)
        
    serializer = CourseSerializer(course, context={'request': request})
    return Response(serializer.data, status=200)

@api_view(['GET'])
@permission_classes([AllowAny])
def search_course(request):
    from api.models import Course
    from api.serializer import CourseSerializer
    
    query = request.GET.get('q')
    if query:
        courses = Course.objects.filter(title__icontains=query, platform_status='active', teacher_status='available')
        serializer = CourseSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response([], status=status.HTTP_200_OK)