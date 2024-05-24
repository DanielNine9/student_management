from django.db import models

# Define the Semester model
class Semester(models.Model):
    name = models.CharField(max_length=100, null=False, unique=True)

    def __str__(self):
        return self.name
