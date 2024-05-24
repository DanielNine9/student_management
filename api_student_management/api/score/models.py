from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator

from semester.models import Semester
from students.models import SchoolClass, Student
from subject.models import Subject


# Create your models here.
class Score(models.Model):
    score = models.IntegerField(
        default=0, validators=[MinValueValidator(0), MaxValueValidator(100)], null=True
    )
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name="scores")
    student = models.ForeignKey(
        Student, on_delete=models.CASCADE, related_name="scores"
    )
    semester = models.ForeignKey(
        Semester, on_delete=models.CASCADE, related_name="scores"
    )
    room = models.ForeignKey(
        SchoolClass, on_delete=models.CASCADE, related_name="scores"
    )

    class Meta:
        unique_together = ("subject", "student", "semester", "room")

    def __str__(self):
        return f"{self.student.name}: {self.score}"
