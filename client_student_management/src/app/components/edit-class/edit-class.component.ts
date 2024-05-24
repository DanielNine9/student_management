import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Class, Semester } from '../../type';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SemesterService } from '../../services/semester.service';

@Component({
  selector: 'app-edit-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-class.component.html',
  styleUrl: './edit-class.component.css',
})
export class EditClassComponent implements AfterViewInit, OnChanges {
  semesters: Semester[] = [];
  semestersSelected: Semester[] = [];
  @Input() schoolClass: Class = {
    name: '',
  };
  @Input() isAdd: boolean = true;
  @Output() cancelModal = new EventEmitter();
  @Output() submit = new EventEmitter();

  @ViewChild('modal') modal: ElementRef | undefined;
  @ViewChild('nameInput', { static: false }) nameInput: ElementRef | undefined;

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    selectedSemester: new FormControl(''),
  });
  constructor(private semesterService: SemesterService) {
    this.getSemesters();
   

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['schoolClass'] && changes?.['schoolClass'].currentValue) {
      this.form.patchValue({
        name: this.schoolClass.name,
      });
      this.getSemesters();
    }
  }

  private getSemesters() {
    this.semesterService.getAllSemesters().subscribe((data) => {
      this.semesters = data;
      this.semestersSelected = this.semesters.filter(
        item => this.schoolClass.semester_ids?.includes(item.id as number)
      )
    });
  }

  ngAfterViewInit(): void {}

  onCancel() {
    this.cancelModal.emit(true);
    this.form.controls.selectedSemester.setValue("")

    // this.form.reset();
    // this.schoolClass = {name: ""}
  }

  onSubmit() {
    this.submit.emit({
      name: this.form.controls.name?.value,
      semester_ids: this.semestersSelected.map((item) => item.id),
    });
    this.cancelModal.emit(true);
    this.form.controls.selectedSemester.setValue("")
    this.form.reset();
    this.semestersSelected = []
  }

  get fc() {
    return this.form.controls;
  }

  get title(): string {
    if (this.isAdd) {
      return 'Add';
    } else return 'Edit';
  }

  addSemesterSelected(event: Event | null) {
    const target = event?.target as HTMLSelectElement;
    const selectedSemesterId: any = target?.value;
    const selectedSemester = this.semesters.find(
      (semester) => semester.id == selectedSemesterId
    );
    if (
      selectedSemester &&
      !this.semestersSelected.some((s) => s.id == selectedSemester.id)
    ) {
      this.semestersSelected = [...this.semestersSelected, selectedSemester];
    }
  }

  removeSemesterSelected(name: string | undefined) {
    if (name) {
      this.semestersSelected = this.semestersSelected.filter(
        (item) => item.name != name
      );
    }
  }
}
