from rest_framework import viewsets,filters
from .models import *
from .serializers import *
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class SemesterViewSet(viewsets.ModelViewSet):
    queryset = Semester.objects.all()
    serializer_class = SemesterSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    filterset_fields = ["id", "name"]
    search_fields = ["name"]
    
    @action(detail=False, methods=['get'], url_path='all')
    def list_all(self, request, *args, **kwargs):
        # self.pagination_class = None 
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
