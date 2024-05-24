# Generated by Django 5.0.6 on 2024-05-20 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('semester', '0001_initial'),
        ('students', '0002_rename_schoolclass_student_school_class_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='semester',
            name='rooms',
            field=models.ManyToManyField(related_name='semesters', to='students.schoolclass'),
        ),
        migrations.AlterField(
            model_name='semester',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
