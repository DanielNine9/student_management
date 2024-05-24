from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, SchoolClassViewSet

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'student', StudentViewSet, basename='student')
router.register(r'school-class', SchoolClassViewSet, basename='school_class')

urlpatterns = router.urls
