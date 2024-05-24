import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent {
  form = new FormGroup({
    score: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(100),
    ]),
    school_class_name: new FormControl('', [Validators.required]),
  });

  get fc() {
    return this.form.controls;
  }
}
