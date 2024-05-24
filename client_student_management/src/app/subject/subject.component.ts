import { SemesterService } from './../services/semester.service';
import { SubjectService } from './../services/subject.service';
import { Component } from '@angular/core';
import { TableSubjectComponent } from '../components/table-subject/table-subject.component';
import { Semester, Subject, Class } from '../type';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassService } from '../services/class.service';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [
    TableSubjectComponent,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './subject.component.html',
  styleUrl: './subject.component.css',
})
export class SubjectComponent {
  private initSubject: Subject = {
    id: -1,
    name: '',
    rooms: [],
    semesters: [],
  };
  next: string | null = null;
  previous: string | null = null;
  sort: string = '+id';
  search: string = '';

  form = new FormGroup({
    semesterSelected: new FormControl('0'),
    roomSelected: new FormControl('0'),
  });
  semesters: Semester[] = [];
  semestersSelected: Semester[] = [];
  rooms: Class[] = [];
  roomsSelected: Class[] = [];
  subject: Subject = {
    ...this.initSubject,
  };

  subjects: Subject[] = [];

  constructor(
    private subjectService: SubjectService,
    private roomService: ClassService,
    private semesterService: SemesterService
  ) {
    this.getData();
    this.getRooms();
    this.getSemesters();
  }

  private getData(url?: null | string) {
    const classesObservable = url
      ? this.subjectService.getSubjects(url, this.sort, this.search)
      : this.subjectService.getSubjects(undefined, this.sort, this.search);
    classesObservable.subscribe((data: any) => {
      this.subjects = data.results;
      this.next = data.next;
      this.previous = data.previous;
    });
  }

  getSemesters() {
    this.semesterService.getAllSemesters().subscribe(
      (data) => {
        this.semesters = data;
      },
      (error) => {
        this.semesters = [];
      }
    );
  }
  getRooms() {
    this.roomService.getAllClasses().subscribe(
      (data) => {
        this.rooms = data;
      },
      (error) => {
        this.rooms = [];
      }
    );
  }

  get title(): string {
    if (this.subject.id == -1) {
      return 'Add';
    } else {
      return 'Subject with id ' + this.subject.id;
    }
  }

  private dataJson = () => {
    return {
      ...this.subject,
      semester_ids: this.semestersSelected.map((item) => item.id),
      room_ids: this.roomsSelected.map((item) => item.id),
    };
  };

  onAdd() {
    this.subjectService.addSubject(this.dataJson()).subscribe(
      (data) => {
        alert('Adding subject successfully');
        this.getData();
        this.subject = { ...this.initSubject };
      },
      (error) => {
        alert(error?.error?.name);
      }
    );
  }

  onReset() {
    this.subject = {
      ...this.initSubject,
    };
    this.roomsSelected = [];
    this.semestersSelected = [];
    this.form.controls.roomSelected.setValue('0');
    this.form.controls.semesterSelected.setValue('0');
  }

  onClickTable(subject: Subject) {
    this.subject = { ...subject };
    this.semestersSelected = this.semesters.filter((item) =>
      [...subject.semesters].includes(item.name)
    );
    this.roomsSelected = this.rooms.filter((item) =>
      [...subject.rooms].includes(item.name)
    );
  }

  onDelete() {
    const check = confirm(
      'Are you sure delete this subject with id ' + this.subject.id
    );
    if (check) {
      this.subjectService.deleteSubject(this.subject.id as number).subscribe(
        (success) => {
          alert('Delete subject with id ' + this.subject.id + ' successfully');
          this.subject = { ...this.initSubject };
          this.getData();
        },
        (error) => {
          alert('Something went wrong');
        }
      );
    }
  }

  onUpdate() {
    this.subjectService
      .editSubject(this.dataJson(), this.subject.id as number)
      .subscribe((success) => {
        alert('Edit subject with id ' + this.subject.id + ' successfully');
        this.getData();
      });
  }

  addSemesterSelected(event: Event | null) {
    const target = event?.target as HTMLSelectElement;
    const value: any = target?.value;
    const selectedSemester = this.semesters.find(
      (semester) => semester.id == value
    );
    if (
      selectedSemester &&
      !this.semestersSelected.some((s) => s.id == selectedSemester.id)
    ) {
      this.semestersSelected = [...this.semestersSelected, selectedSemester];
    }
  }
  addRoomSelected(event: Event | null) {
    const target = event?.target as HTMLSelectElement;
    const value: any = target?.value;
    const selectedRoom = this.rooms.find((room) => room.id == value);
    if (
      selectedRoom &&
      !this.roomsSelected.some((s) => s.id == selectedRoom.id)
    ) {
      this.roomsSelected = [...this.roomsSelected, selectedRoom];
    }
  }

  removeSemesterSelected(name: string | undefined) {
    if (name) {
      this.semestersSelected = this.semestersSelected.filter(
        (item) => item.name != name
      );
    }
  }
  removeRoomSelected(name: string | undefined) {
    if (name) {
      this.roomsSelected = this.roomsSelected.filter(
        (item) => item.name != name
      );
    }
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
