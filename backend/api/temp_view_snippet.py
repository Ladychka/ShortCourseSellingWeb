
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
