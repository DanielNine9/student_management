import { Routes } from '@angular/router';
import { ClassesComponent } from './classes/classes.component';
import { StudentsComponent } from './students/students.component';
import { DetailClassComponent } from './detail-class/detail-class.component';
import { DetailStudentComponent } from './detail-student/detail-student.component';
import { HomeComponent } from './home/home.component';
import { SemestersComponent } from './semesters/semesters.component';
import { SubjectComponent } from './subject/subject.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'classes',
    component: ClassesComponent,
  },
  {
    path: 'classes/:id',
    component: DetailClassComponent,
  },
  {
    path: 'students',
    component: StudentsComponent,
  },
  {
    path: 'students/:id',
    component: DetailStudentComponent,
  },
  {
    path: 'semesters',
    component: SemestersComponent,
  },
  {
    path: 'subjects',
    component: SubjectComponent,
  },
];
