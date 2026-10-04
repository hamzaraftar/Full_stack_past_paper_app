from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app.views import UserInfo,PaperAPIView,ProfileAPIView,UniversityAPIView,UniversityPapersAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),    
    # for user related        
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # JWT authentication endpoints
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),    
    path('api/users/signup/', UserInfo.as_view(),name='register'),
    path('api/users/me/', UserInfo.as_view(), name='user_detail'),

    # my papers mean Profile
    path('api/profile/',ProfileAPIView.as_view() , name='profile'),

    # for papers
    path('api/papers/',PaperAPIView.as_view() ,name="todo_details"),
    path('api/papers/<int:pk>/',PaperAPIView.as_view() ,name="todo"),

    # for university
    path('api/university/',UniversityAPIView.as_view() ,name='universitys_details'),
    path('api/university/<int:pk>/',UniversityAPIView.as_view() ,name='universitys_details'),
    path('api/universitypapers/<int:pk>/',UniversityPapersAPIView.as_view() ,name='universitys_details')


]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )