import { Component } from '@angular/core';
import { TableSemestersComponent } from '../components/table-semesters/table-semesters.component';
import { Semester } from '../type';
import { SemesterService } from '../services/semester.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-semesters',
  standalone: true,
  imports: [TableSemestersComponent, FormsModule, CommonModule, FormsModule],
  templateUrl: './semesters.component.html',
  styleUrl: './semesters.component.css',
})
export class SemestersComponent {
  private initSemester: Semester = {
    id: -1,
    name: '',
    rooms: [],
    subjects: [],
  };
  sort: string = '+id';
  search: string = '';
  next: string | null = null;
  previous: string | null = null;

  semester: Semester = {
    ...this.initSemester,
  };
  semesters: Semester[] = [];
  constructor(private semesterService: SemesterService) {
    this.getData();
  }

  private getData(url?: null | string) {
    const classesObservable = url
      ? this.semesterService.getSemesters(url, this.sort, this.search)
      : this.semesterService.getSemesters(undefined, this.sort, this.search);
    classesObservable.subscribe((data: any) => {
      this.semesters = data.results;
      this.next = data.next;
      this.previous = data.previous;
      console.log(data)
    });
  }

  get title(): string {
    if (this.semester.id == -1) {
      return 'Add';
    } else {
      return 'Semester with id ' + this.semester.id;
    }
  }

  onAdd() {
    this.semesterService.addSemester(this.semester).subscribe(
      (data) => {
        alert('Adding semester successfully');
        this.getData();
        this.semester = { ...this.initSemester };
      },
      (error) => {
        alert(error?.error?.name);
      }
    );
  }

  onReset() {
    this.semester = {
      ...this.initSemester,
    };
  }

  onClickTable(semester: Semester) {
    this.semester = { ...semester };
  }

  onDelete() {
    const check = confirm(
      'Are you sure delete this semester with id ' + this.semester.id
    );
    if (check) {
      this.semesterService.deleteSemester(this.semester.id as number).subscribe(
        (success) => {
          alert(
            'Delete semester with id ' + this.semester.id + ' successfully'
          );
          this.semester = { ...this.initSemester };
          this.getData();
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
  }

  onUpdate() {
    this.semesterService
      .editSemester(this.semester, this.semester.id as number)
      .subscribe((success) => {
        alert('Edit semester with id ' + this.semester.id + ' successfully');
        this.getData();
      });
  }

  changePage(url: string | null) {
    this.getData(url);
  }

  onChangeSort() {
    this.getData();
  }

  onClickSearch() {
    this.getData();
  }
}
