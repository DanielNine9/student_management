from django.db import models

from semester.models import Semester


class Student(models.Model):
    name = models.CharField(max_length=100)
    school_class = models.ForeignKey(
        "SChoolClass", related_name="students", on_delete=models.CASCADE, null=True
    )

    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name'] 


class SchoolClass(models.Model):
    name = models.CharField(max_length=100, unique=True)
    semesters = models.ManyToManyField(Semester, related_name="rooms", default=[], null=True)
    
    @property
    def quantity(self):
        return self.students_count
    
    def __str__(self):
        return str(self.name)
    
    class Meta:
        ordering = ['id']
