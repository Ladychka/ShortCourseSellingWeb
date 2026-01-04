from rest_framework import status
from rest_framework.test import APITestCase
from userauths.models import User
from api.models import Course, Teacher, Category

class InstructorEditCourseTest(APITestCase):
    def setUp(self):
        try:
            # Create instructor
            self.user = User.objects.create_user(username='instructor', email='inst@test.com', password='testpassword')
            self.teacher = Teacher.objects.create(user=self.user, full_name="Test Instructor")
            self.client.force_authenticate(user=self.user)
            
            # Create category and course
            self.category = Category.objects.create(title="Dev", slug="dev")
            self.course = Course.objects.create(
                title="Original Title",
                slug="original-title",
                category=self.category,
                teacher=self.teacher,
                price=10.00,
                description="Original Desc",
                level="Beginner",
                platform_status='active',
                teacher_status='available'
            )
        except Exception:
            import traceback
            traceback.print_exc()
            raise

    def test_get_course_detail(self):
        url = f"/api/v1/instructor/course-detail/{self.course.slug}/"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Original Title")
        print("\nTest passed: GET existing course.")

    def test_update_course_detail(self):
        url = f"/api/v1/instructor/course-detail/{self.course.slug}/"
        data = {
            "title": "Updated Title",
            "description": "Updated Desc",
            "price": 20.00,
            "level": "Advanced",
            "category": self.category.id  # Assuming serializer handles ID
        }
        # Note: In a real PUT, we might need all fields or use PATCH. 
        # Using PATCH for partial update safety if RetrieveUpdateAPIView allows it (it does).
        response = self.client.patch(url, data, format='json')
        
        if response.status_code != 200:
            print(f"Update failed: {response.data}")
            
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.course.refresh_from_db()
        self.assertEqual(self.course.title, "Updated Title")
        self.assertEqual(self.course.price, 20.00)
        print("\nTest passed: PATCH update course.")
