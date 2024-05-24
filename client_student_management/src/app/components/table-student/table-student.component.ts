import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Class, Student } from '../../type';
import { StudentService } from '../../services/student.service';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';
import { EditStudentComponent } from '../edit-student/edit-student.component';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table-student',
  standalone: true,
  imports: [CommonModule, EditStudentComponent, RouterLink, FormsModule],
  templateUrl: './table-student.component.html',
  styleUrl: './table-student.component.css',
})
export class TableStudentComponent implements OnInit {
  students: any[] = [];
  classes: Class[] = [];
  next: string | null = null;
  previous: string | null = null;
  sort: string = '+id';
  search: string = '';
  constructor(
    private studentService: StudentService,
    private classService: ClassService
  ) {}

  ngOnInit(): void {
    this.getStudents();
    this.getClasses();
  }

  private getClasses() {
    this.classService.getAllClasses().subscribe((data) => {
      this.classes = [];
    });
  }

  private getStudents(url?: string | null) {
    const studentObserver = url
      ? this.studentService.getStudents(url, this.sort, this.search)
      : this.studentService.getStudents(undefined, this.sort, this.search);
    studentObserver.subscribe((data: any) => {
      this.next = data.next;
      this.previous = data.previous;
      this.students = data.results;
    });
  }

  onSubmit(student: Student) {
    this.studentService.addStudent(student).subscribe(
      () => {
        this.getStudents();
        alert('Adding student successfully');
      },
      (error) => {
        alert(error?.error?.name);
      }
    );
  }
  changePage(url: string | null) {
    this.getStudents(url);
  }

  onChangeSort() {
    this.getStudents();
  }

  onClickSearch() {
    this.getStudents();
  }
}
