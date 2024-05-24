import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from '../../type';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table-subject.component.html',
  styleUrl: './table-subject.component.css',
})
export class TableSubjectComponent implements OnInit {
  @Input() subjects: Subject[] = [];
  @Output() clickTable = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClick(semester: Subject) {
    this.clickTable.emit(semester);
  }


}
