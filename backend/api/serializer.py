from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from api import models as api_models
from userauths.models import User, Profile

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['full_name'] = user.full_name

        return token
    
class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)
    full_name = serializers.CharField(required=False, allow_blank=True, allow_null=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'full_name', 'password', 'password2')
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        full_name = validated_data.pop('full_name', None)
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        if full_name:
            user.full_name = full_name
            user.save(update_fields=['full_name'])
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Category
        fields = ['title','image','slug','course_count']

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Teacher
        fields = [
            'user',
            'image',
            'full_name',
            'bio',
            'facebook',
            'twitter',
            'linkedin',
            'about',
            'country',
            'students',
            'courses',
            'review'
        ]




class VariantItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.VariantItem
        exclude = ['variant']  # 🔥 avoid the circular issue





class VariantSerializer(serializers.ModelSerializer):
    variant_items=VariantItemSerializer(many=True)
    class Meta:
        model = api_models.Variant
        fields = '__all__'


class Question_Answer_MessageSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(many=False)
    class Meta:
        model = api_models.Question_Answer_Message
        fields = '__all__'

class Question_AnswerSerializer(serializers.ModelSerializer):
    messages = Question_Answer_MessageSerializer(many=True)
    profile=ProfileSerializer(many=False)
    class Meta:
        model = api_models.Question_Answer
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Cart
        fields = '__all__'

class CartOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.CartOrderItem
        fields = '__all__'

class CartOrderSerializer(serializers.ModelSerializer):
    order_items = CartOrderItemSerializer(many=True)
    class Meta:
        model = api_models.CartOrder
        fields = '__all__'



class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Certificate
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    profile=ProfileSerializer(many=False)

    class Meta:
        model = api_models.Review
        fields = '__all__'

class CompletedLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.CompletedLesson
        fields = '__all__'



class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Note
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Notification
        fields = '__all__'  

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Coupon
        fields = '__all__'

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Wishlist
        fields = '__all__'

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Country
        fields = '__all__'

class EnrolledCourseSerializer(serializers.ModelSerializer):
    lectures=VariantItemSerializer(many=True,read_only=True)
    completed_lessons=CompletedLessonSerializer(many=True,read_only=True)
    curriculum=VariantItemSerializer(many=True,read_only=True)
    note=NoteSerializer(many=True,read_only=True)
    question_answer=Question_AnswerSerializer(many=True,read_only=True)
    review=ReviewSerializer(many=True,read_only=True)
    class Meta:
        model = api_models.EnrolledCourse
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(EnrolledCourseSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0

        else:
            self.Meta.depth = 3

class CourseSerializer(serializers.ModelSerializer):
    students=EnrolledCourseSerializer(many=True, read_only=True)
    curriculum=VariantSerializer(many=True, read_only=True)
    lectures=VariantItemSerializer(many=True, read_only=True)
    reviews=ReviewSerializer(many=True, read_only=True)
    class Meta:
        model = api_models.Course
        fields = [
            'id',
            'category',
            'teacher',
            'file',
            'image',
            'title',
            'description',
            'price',
            'language',
            'level',
            'platform_status',
            'teacher_status',
            'featured',
            'course_id',
            'slug',
            'date',
            'students',
            'curriculum',
            'lectures',
            'average_rating',
            'rating_count',
            'reviews'
        ]
        extra_kwargs = {
            'teacher': {'read_only': True},
        }

    def __init__(self, *args, **kwargs):
        super(CourseSerializer,self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0

        else:
            self.Meta.depth = 3

# student

class StudentSummarySerializer(serializers.Serializer):
    total_courses=serializers.IntegerField(default=0)
    completed_lessons=serializers.IntegerField(default=0)
    achieved_certificates=serializers.IntegerField(default=0)

class InstructorSummarySerializer(serializers.Serializer):
    total_courses = serializers.IntegerField(default=0)
    total_students = serializers.IntegerField(default=0)
    total_revenue = serializers.DecimalField(max_digits=12, decimal_places=2, default=0)

class InstructorCourseMiniSerializer(serializers.ModelSerializer):
    enrolled = serializers.SerializerMethodField()
    class Meta:
        model = api_models.Course
        fields = ['id','title','price','level','teacher_status','date','slug','enrolled','image']

    def get_enrolled(self, obj):
        from api.models import EnrolledCourse
        return EnrolledCourse.objects.filter(course=obj).count()

class RevenueDaySerializer(serializers.Serializer):
    date = serializers.DateField()
    total = serializers.DecimalField(max_digits=12, decimal_places=2)
    
        
        