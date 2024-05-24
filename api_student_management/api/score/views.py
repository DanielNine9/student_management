from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Score
from .serializers import ScoreSerializer


class ScoreViewSet(viewsets.ModelViewSet):
    queryset = Score.objects.all()
    serializer_class = ScoreSerializer

    @action(
        detail=False,
        methods=["get"],
        url_path="(?P<class_id>[^/.]+)/(?P<semester_id>[^/.]+)/(?P<student_id>[^/.]+)/(?P<subject_id>[^/.]+)",
    )
    def get_scores_by_class_semester_and_student(
        self, request, class_id=None, semester_id=None, student_id=None, subject_id=None
    ):
        if not class_id or not semester_id or not student_id or not subject_id:
            return Response(
                {"error": "class_id, semester_id, and student_id are required"},
                status=400,
            )

        print(class_id)
        print(semester_id)
        print(student_id)
        print(subject_id)
        scores = Score.objects.filter(
            student__id=student_id,
            room__id=class_id,
            semester__id=semester_id,
            subject__id=subject_id,
        ).distinct()

        serializer = self.get_serializer(scores, many=True)
        return Response(serializer.data)
