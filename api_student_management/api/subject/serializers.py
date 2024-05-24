from rest_framework import serializers

from semester.models import Semester
from .models import *


class SubjectSerializer(serializers.ModelSerializer):
    rooms = serializers.SerializerMethodField()
    semesters = serializers.SerializerMethodField()
    
    class Meta:
        model = Subject
        fields = ["id", "name", "rooms", "semesters"]

    def get_rooms(self, obj):
        return [room.name for room in obj.rooms.all()]
    
    def get_semesters(self, obj):
        return [semester.name for semester in obj.semesters.all()]
    
    def to_internal_value(self, data):
        # Copy the input data to allow modification
        validated_data = super().to_internal_value(data)
        print(data)
        # Retrieve the class name from the input data
        room_ids = data.get("room_ids", [])
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
        if room_ids:
            rooms = []
            for room_id in room_ids:
                try:
                    room = SchoolClass.objects.get(id=room_id)
                    rooms.append(room)
                except SchoolClass.DoesNotExist:
                    raise serializers.ValidationError(
                        {"room_ids": f'room with id "{room_id}" does not exist.'}
                    )
            validated_data["rooms"] = rooms

        return validated_data
