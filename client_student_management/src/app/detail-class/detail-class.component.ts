import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from '../services/class.service';
import { Class } from '../type';
import { EditClassComponent } from '../components/edit-class/edit-class.component';

@Component({
  selector: 'app-detail-class',
  standalone: true,
  imports: [CommonModule, EditClassComponent],
  templateUrl: './detail-class.component.html',
  styleUrl: './detail-class.component.css',
})
export class DetailClassComponent {
  public currentClass: Class | undefined;
  public idClass: number | undefined;
  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((data: any) => {
      this.idClass = data?.params?.id;
      this.getData();
    });
  }
  onDelete() {
    if (this.currentClass == undefined) {
      return;
    }
    if (<number>this.currentClass.quantity > 0) {
      alert('This class already has students');
      return;
    }
    this.classService.deleteClass(this.idClass as number).subscribe(
      (success) => {
        this.router.navigate(['']);
        alert('Delete successfully');
      },
      (error) => alert('Delete failure')
    );
  }

  getData() {
    if (this.idClass) {
      this.classService.getClass(this.idClass).subscribe((data) => {
        this.currentClass = data;
      });
    }
  }

  onSubmit(data: any) {
    if (this.currentClass && this.currentClass.id) {
      this.classService.editClass(data, this.currentClass.id).subscribe(
        (success) => {
          alert('Edit class successfully');
          this.getData();
        },
        (error) => {
          alert('Edit failure');
          console.log(this.currentClass);
          this.getData();
        }
      );
    } else {
      alert('Current class is undefined');
    }
  }

  onCancel($event: any) {
    console.log('vao day tiep theo');

    this.getData();
  }
}
