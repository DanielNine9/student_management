import { RouterLink } from '@angular/router';
import { Class, Semester } from './../../type';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditClassComponent } from '../edit-class/edit-class.component';
import { ClassService } from '../../services/class.service';
import { SemesterService } from '../../services/semester.service';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-table-class',
  standalone: true,
  imports: [
    CommonModule,
    EditClassComponent,
    RouterLink,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginator,
  ],
  templateUrl: './table-class.component.html',
  styleUrl: './table-class.component.css',
})
export class TableClassComponent implements OnInit {
  classes: Class[] = [];
  semesters: Semester[] = [];
  sort: string = '+id';
  search: string = '';
  dataSource: Class[] = [];
  displayedColumns: string[] = ['id', 'name', 'semesters', 'quantity'];
  @Output() updatedClass: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(MatSort) matSort: MatSort | null = null;
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  pageEvent: PageEvent | null = null;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getClasses();
  }

  constructor(
    private classService: ClassService,
    private semesterService: SemesterService
  ) {}
  next: string | null = null;
  previous: string | null = null;
  ngOnInit(): void {
    this.getClasses();
  }

  private getClasses(url?: string | null) {
    this.sort =
      '&ordering=' +
      (this?.matSort?.direction == 'asc' ? '+' : '-') +
      (this?.matSort?.active ? this?.matSort?.active : 'id');
      console.log(this.sort)
    const limit = '?limit=' + this.pageSize;
    const offset = '&offset=' + this.pageIndex * this.pageSize;
    const searchParams = limit + offset + this.sort;
    const classesObservable = url
      ? this.classService.getClasses(url, searchParams)
      : this.classService.getClasses(undefined, searchParams);
    classesObservable.subscribe((data: any) => {
      this.classes = data.results;
      this.next = data.next;
      this.previous = data.previous;
      this.dataSource = data.results;
      this.length = data.count;
      console.log("vao day")
    });
  }

  onSubmit(data: any) {
    this.classService.addClass(data).subscribe(
      () => {
        this.getClasses();
        this.updatedClass.emit(true);
      },
      (error) => {
        alert(error?.error?.name);
      }
    );
  }

  changePage(url: string | null) {
    this.getClasses(url);
  }

  onChangeSort() {
    this.getClasses();
  }

  onClickSearch() {
    this.getClasses();
  }
}
