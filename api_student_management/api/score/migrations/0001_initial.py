# Generated by Django 5.0.6 on 2024-05-20 03:55

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('semester', '0002_semester_rooms_alter_semester_name'),
        ('students', '0002_rename_schoolclass_student_school_class_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)])),
                ('rooms', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores', to='students.schoolclass')),
                ('semester', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores', to='semester.semester')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores', to='students.student')),
            ],
        ),
    ]
