from django.db import models

from semester.models import Semester
from students.models import SchoolClass


# Create your models here.
class Subject(models.Model):
    name = models.CharField(max_length=100, null = False, unique=True)
    semesters = models.ManyToManyField(Semester, related_name="subjects")
    rooms = models.ManyToManyField(SchoolClass, related_name="subjects")

    
    def __str__(self):
        return self.name
    