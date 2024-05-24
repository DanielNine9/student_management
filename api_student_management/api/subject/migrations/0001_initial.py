# Generated by Django 5.0.6 on 2024-05-20 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('semester', '0003_remove_semester_rooms'),
        ('students', '0004_schoolclass_semesters'),
    ]

    operations = [
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('rooms', models.ManyToManyField(related_name='subjects', to='students.schoolclass')),
                ('semesters', models.ManyToManyField(related_name='subjects', to='semester.semester')),
            ],
        ),
    ]
