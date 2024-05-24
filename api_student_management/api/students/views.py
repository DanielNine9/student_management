# Create your views here.
from rest_framework import viewsets, filters
from .models import *
from .serializers import *
from .paginations import *
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
# Create your views here.


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    # pagination_class = CustomPagination
    ordering = ['id'] 
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ["id", "name"]
    search_fields = ["name", "school_class__name"]


class SchoolClassViewSet(viewsets.ModelViewSet):
    queryset = SchoolClass.objects.all()
    serializer_class = SchoolClassSerializer
    # pagination_class = CustomPagination
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ["id", "name"]
    search_fields = ["name"]
    @action(detail=False, methods=['get'], url_path='all')
    def list_all(self, request, *args, **kwargs):
        # self.pagination_class = None 
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    ordering = ['id']
