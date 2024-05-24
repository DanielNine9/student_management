import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ClassService } from '../../services/class.service';
import { Class, Subject } from '../../type';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../../services/subject.service';
import { ScoreService } from '../../services/score.service';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-control-score',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-score.component.html',
  styleUrl: './control-score.component.css',
})
export class ControlScoreComponent implements OnInit, OnChanges {
  @Input() idClass: number | undefined;
  @Input() idStudent: number | undefined;
  room: Class | undefined;
  subjects: any[] = [];
  edit: boolean = false;
  idSemester: number | undefined;


  constructor(
    private classService: ClassService,
    private subjectService: SubjectService,
    private scoreService: ScoreService
  ) {
    this.getClass();
  }

  private getClass() {
    console.log(this.idClass);
    if (this.idClass) {
      this.classService.getClass(this.idClass).subscribe(
        (data) => {
          this.room = data;
          this.getSubjects(this.room?.semester_ids?.[0]);
        },
        (error) => (this.room = undefined)
      );
    }
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['idClass'] &&
      changes['idStudent'] &&
      changes['idClass'].currentValue !== undefined &&
      changes['idStudent'].currentValue !== undefined
    ) {
      this.idClass = changes['idClass'].currentValue;
      this.idStudent = changes['idStudent'].currentValue;
      this.getClass();
    }
  }

  getSubjects(idSemester: any) {
    this.idSemester = idSemester;
    if (this.idClass && idSemester) {
      this.subjectService
        .getSubjectBasedOnIdClassAndIdSemester(this.idClass, idSemester)
        .subscribe((data) => {
          this.subjects = data;
          this.getScore();
        });
    }
  }

  onClickTab(idSemester: any) {
    this.getSubjects(idSemester);
  }

  onEdit() {
    this.edit = !this.edit;
  }

  getScore() {
    this.subjects.map((item, i) => {
      if (this.idClass && this.idStudent && this.idSemester)
        this.scoreService
          .getScoreBasedOnAll(
            this.idClass,
            this.idSemester,
            this.idStudent,
            item.id
          )
          .subscribe((data) => {
            if (data.length > 0) {
              this.subjects[i].score = data[0].score;
              this.subjects[i].id_score = data[0].id;
            } else {
              this.subjects[i].score = 'No Score';
              this.subjects[i].id_score = -1;
            }
          });
    });
  }

  onSave() {
    const observables = this.subjects
      .filter((item) => item.score !== 'No Score')
      .map((item) => {
        const data = {
          student_id: this.idStudent,
          score: item.score,
          room_id: this.idClass,
          semester_id: this.idSemester,
          subject_id: item.id,
        };
        return item.id_score === -1
          ? this.scoreService.addScore(data)
          : this.scoreService.editScore(data, item.id_score);
      });

    if (observables.length === 0) {
      alert('No scores to save');
      return;
    }

    forkJoin(observables).subscribe(
      () => alert('Edit score successfully'),
      (error) => {alert('Error occurred: ' + error.error.score), this.getSubjects(this.idSemester)}
    );
  }

  onChange() {
    console.log(this.subjects);
  }
}
