from rest_framework import serializers

from semester.models import Semester
from subject.models import Subject
from .models import Score
from students.models import SchoolClass, Student


class ScoreSerializer(serializers.ModelSerializer):
    room = serializers.SerializerMethodField()
    semester = serializers.SerializerMethodField()
    student = serializers.SerializerMethodField()
    subject = serializers.SerializerMethodField()

    def get_room(self, obj):
        return obj.room.name

    def get_semester(self, obj):
        return obj.semester.name

    def get_student(self, obj):
        return "ST" + str(obj.student.id)

    def get_subject(self, obj):
        return obj.subject.name

    class Meta:
        model = Score
        fields = ["id", "student", "semester", "room", "subject", "score"]
        read_only_fields = ["student", "semester", "room"]

    def to_internal_value(self, data):
        validated_data = super().to_internal_value(data)

        student_id = data.get("student_id")
        semester_id = data.get("semester_id")
        room_id = data.get("room_id")
        subject_id = data.get("subject_id")

        if student_id is None or semester_id is None or room_id is None:
            raise serializers.ValidationError(
                "student_id, semester_id, and class_id are required."
            )

        try:
            room = SchoolClass.objects.get(id=room_id)
            student = Student.objects.get(id=student_id)
            semester = Semester.objects.get(id=semester_id)
            subject = Subject.objects.get(id=subject_id)
        except (
            SchoolClass.DoesNotExist or Student.DoesNotExist or Semester.DoesNotExist
        ):
            raise serializers.ValidationError(
                {"errors": "student_id, semester_id, and class_id are invalid."}
            )
    
        validated_data["room"] = room
        validated_data["student"] = student
        validated_data["semester"] = semester
        validated_data["subject"] = subject

        return validated_data
