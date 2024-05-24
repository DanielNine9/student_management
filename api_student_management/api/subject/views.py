from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Subject
from .serializers import SubjectSerializer

class SubjectViewSet(viewsets.ModelViewSet):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
    filter_backends = [filters.OrderingFilter, filters.SearchFilter]
    search_fields = ["name"]

    @action(detail=False, methods=['get'], url_path='filter-by-class-and-semester')
    def get_subjects_by_class_and_semester(self, request):
        class_id = request.query_params.get('class_id')
        semester_id = request.query_params.get('semester_id')

        if not class_id or not semester_id:
            return Response({'error': 'class_id and semester_id are required'}, status=400)

        subjects = Subject.objects.filter(
            rooms__id=class_id,
            semesters__id=semester_id
        ).distinct()

        serializer = self.get_serializer(subjects, many=True)
        return Response(serializer.data)
