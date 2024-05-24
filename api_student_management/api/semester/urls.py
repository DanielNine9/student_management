from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r"semester", SemesterViewSet, basename="semester")

urlpatterns = router.urls
