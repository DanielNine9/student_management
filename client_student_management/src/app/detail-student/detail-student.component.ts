import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditStudentComponent } from '../components/edit-student/edit-student.component';
import { Student } from '../type';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import { StudentService } from '../services/student.service';
import { ControlScoreComponent } from '../components/control-score/control-score.component';

@Component({
  selector: 'app-detail-student',
  standalone: true,
  imports: [CommonModule, EditStudentComponent, ControlScoreComponent],
  templateUrl: './detail-student.component.html',
  styleUrl: './detail-student.component.css',
})
export class DetailStudentComponent {
  public currentStudent: Student | undefined;
  public idStudent: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private router: Router,
    private studentService: StudentService
  ) {
    this.route.paramMap.subscribe((data: any) => {
      this.idStudent = data?.params?.id;
      this.getData()
    });
  }
  onDelete() {
    if (this.currentStudent == undefined) {
      return;
    }

    this.studentService.deleteStudent(this.idStudent as number).subscribe(
      (success) => {
        this.router.navigate(['']);
        alert('Delete student successfully');
      },
      (error) => alert('Delete student failure')
    );
  }

  getData() {
    if (this.idStudent) {
      this.studentService.getStudent(this.idStudent).subscribe((data) => {
        this.currentStudent = data;
        console.log(this.currentStudent)
      });
    }
  }

  onSubmit(student: Student){
    if(this.currentStudent && this.currentStudent.id){
      this.studentService.editStudent(student, this.currentStudent?.id).subscribe(
        success => {
          alert("Edit student successfully")
          this.getData();
        }, 
        error => {
          alert("Edit student failure")
          this.getData()
        }
      )
    }
  }
}
