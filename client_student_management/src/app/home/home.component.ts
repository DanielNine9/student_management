import { Component, OnInit, ViewChild } from '@angular/core';
import { ClassService } from '../services/class.service';
import { Class } from '../type';
import { TableClassComponent } from '../components/table-class/table-class.component';
import { TableStudentComponent } from '../components/table-student/table-student.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableClassComponent, TableStudentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  @ViewChild("appTableStudent") appTableStudent: any;
  public classes: Class[] = []
  constructor(private classService: ClassService) {
    this.classService.getClasses(undefined, undefined).subscribe(data => {
      this.classes = data
    }, error => console.log(error))
  }
  ngOnInit(): void {
  }

  onUpdatedClass(){
    this.appTableStudent.getClasses();
  }
  
}
