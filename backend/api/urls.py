from api import views as api_views
from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path("user/token/", api_views.MyTokenObtainPairView.as_view()),
    path("user/token/refresh", TokenObtainPairView.as_view(), name="token_refresh"),
    path("user/register/", api_views.RegisterView.as_view(), name="register"),
    path("user/password-reset/<email>/", api_views.PasswordResetEmailVerifyAPIView.as_view()),
    path("user/password-change/", api_views.PasswordChangeAPIView.as_view()),
    path("instructor/dashboard-stats/", api_views.InstructorDashboardStatsAPIView.as_view()),
    path("instructor/courses-mini/", api_views.InstructorCourseListAPIView.as_view()),
    path("instructor/revenue-trend/", api_views.InstructorRevenueTrendAPIView.as_view()),
    path("home/featured-courses/", api_views.featured_courses),
    path("home/recent-reviews/", api_views.recent_reviews),
    path("course-detail/<slug>/", api_views.course_detail),
    path("course/search/", api_views.search_course),
]