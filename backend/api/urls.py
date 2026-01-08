from api import views as api_views
from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("user/token/", api_views.MyTokenObtainPairView.as_view()),
    path("user/token/refresh", TokenObtainPairView.as_view(), name="token_refresh"),
    path("user/register/", api_views.RegisterView.as_view(), name="register"),
    path("user/password-reset/<email>/", api_views.PasswordResetEmailVerifyAPIView.as_view()),
    path("user/create-new-password/", api_views.PasswordChangeAPIView.as_view()),
    path("user/profile/update/", api_views.ProfileUpdateAPIView.as_view()),
    path('admin/dashboard/stats/', api_views.AdminDashboardStatsAPIView.as_view()),
    path('admin/courses/', api_views.AdminCourseListAPIView.as_view()),
    path("instructor/dashboard-stats/", api_views.InstructorDashboardStatsAPIView.as_view()),
    path("instructor/courses-mini/", api_views.InstructorCourseListAPIView.as_view()),
    path("instructor/course-detail/<slug>/", api_views.InstructorCourseDetailAPIView.as_view()),
    path("instructor/create-course/", api_views.CourseCreateAPIView.as_view()),
    path("instructor/revenue-trend/", api_views.InstructorRevenueTrendAPIView.as_view()),
    path("instructor/course/variant/create/", api_views.CourseVariantCreateAPIView.as_view()),
    path("instructor/course/variant/delete/<variant_id>/", api_views.CourseVariantDeleteAPIView.as_view()),
    path("instructor/course/variant-item/create/", api_views.CourseVariantItemCreateAPIView.as_view()),
    path("instructor/course/variant-item/delete/<variant_item_id>/", api_views.CourseVariantItemDeleteAPIView.as_view()),
    path("student/courses/", api_views.StudentCourseListAPIView.as_view()),
    path("student/dashboard-stats/", api_views.StudentDashboardStatsAPIView.as_view()),
    path('student/course-detail/<slug>/', api_views.StudentCourseDetailAPIView.as_view(), name='student_course_detail'),
    path('student/course/completed-lesson/', api_views.StudentCourseCompletedCreateAPIView.as_view(), name='student_course_completed_lesson'),
    path("home/featured-courses/", api_views.featured_courses),
    path("home/recent-reviews/", api_views.recent_reviews),
    path("course-detail/<slug>/", api_views.course_detail),
    path("course/category/", api_views.category_list),
    path("course/search/", api_views.search_course),
    path("admin/users/", api_views.AdminUserListAPIView.as_view()),
    path("instructor/students/", api_views.InstructorStudentListAPIView.as_view()),
    path("student/wishlist/", api_views.StudentWishlistListCreateAPIView.as_view()),
]