import { CommonModule } from '@angular/common';
import { Semester } from '../../type';
import { SemesterService } from './../../services/semester.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-semesters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-semesters.component.html',
  styleUrl: './table-semesters.component.css',
})
export class TableSemestersComponent implements OnInit {
  @Input() semesters: Semester[] = [];
  @Output() clickTable = new EventEmitter();

  constructor(private semesterService: SemesterService) {
  
  }

  
  ngOnInit(): void {}

  onClick(semester: Semester) {
    this.clickTable.emit(semester)
  }

  
}
