from rest_framework import serializers

from semester.models import Semester
from .models import Student, SchoolClass


class StudentSerializer(serializers.ModelSerializer):
    school_class_name = serializers.SerializerMethodField()
    id_class = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = ["id", "name", "school_class_name", "id_class"]

    def get_school_class_name(self, obj):
        return obj.school_class.name if obj.school_class else None
    
    def get_id_class(self, obj):
        return obj.school_class.id

    def to_internal_value(self, data):
        # Copy the input data to allow modification
        validated_data = super().to_internal_value(data)
        print(data)
        # Retrieve the class name from the input data
        school_class_name = data.get("school_class_name")
     
        try:
            school_class = SchoolClass.objects.get(name=school_class_name)
            validated_data["school_class"] = school_class
        except SchoolClass.DoesNotExist:
            raise serializers.ValidationError(
                {
                    "schoolClass": f'SchoolClass with name "{school_class_name}" does not exist.'
                }
            )

        return validated_data


class SchoolClassSerializer(serializers.ModelSerializer):
    quantity = serializers.SerializerMethodField()
    semesters = serializers.SerializerMethodField()
    semester_ids = serializers.SerializerMethodField()

    class Meta:
        model = SchoolClass
        fields = ["id", "name", "quantity", "semesters", "semester_ids"]

    def get_semesters(self, obj):
        return [semester.name for semester in obj.semesters.all()]
    
    def get_semester_ids(self, obj):
        return [semester.id for semester in obj.semesters.all()]

    def get_quantity(self, obj):
        return obj.students.count()

    def to_internal_value(self, data):
        validated_data = super().to_internal_value(data)
        semester_ids = data.get("semester_ids", [])

        if semester_ids:
            semesters = []
            for semester_id in semester_ids:
                try:
                    semester = Semester.objects.get(id=semester_id)
                    semesters.append(semester)
                except Semester.DoesNotExist:
                    raise serializers.ValidationError(
                        {"semester_ids": f'semester with id "{semester_id}" does not exist.'}
                    )
            validated_data["semesters"] = semesters


        return validated_data
