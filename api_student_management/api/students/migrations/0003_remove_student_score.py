# Generated by Django 5.0.6 on 2024-05-20 08:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0002_rename_schoolclass_student_school_class_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='student',
            name='score',
        ),
    ]
