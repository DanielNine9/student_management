from rest_framework import serializers
from .models import Semester
from students.models import SchoolClass


class SemesterSerializer(serializers.ModelSerializer):
    # room_ids = serializers.ListField(
    #     child=serializers.IntegerField(), write_only=True, required=False
    # )
    rooms = serializers.SerializerMethodField()
    subjects = serializers.SerializerMethodField()

    class Meta:
        model = Semester
        fields = ["id", "name", "rooms", "subjects"]
        read_only_fields = ["rooms"]

    def get_rooms(self, obj):
        return [room.name for room in obj.rooms.all()]
    
    def get_subjects(self, obj):
        return [subject.name for subject in obj.subjects.all()]

    def update(self, instance, validated_data):
        # Pop the rooms data before updating the Semester instance
        rooms = validated_data.pop("rooms", [])
        instance.name = validated_data.get("name", instance.name)
        instance.save()
        if rooms:
            instance.rooms.set(rooms)
        return instance
    
