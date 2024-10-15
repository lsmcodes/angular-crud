import { Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CoursesService } from '../../services/courses.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private coursesService: CoursesService = inject(CoursesService);
  private formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private location: Location = inject(Location);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  form: FormGroup = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],
  });

  constructor() {
    const course: Course = this.activatedRoute.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
  }

  onSubmit(): void {
    this.coursesService.saveCourse(this.form.value).subscribe({
      next: () => this.onSuccess(),
      error: () => this.onError(),
    });
  }

  onCancel(): void {
    this.location.back();
  }

  private onError(): void {
    this.snackBar.open('Error while saving course.', 'Close', {
      duration: 5000,
    });
  }

  private onSuccess(): void {
    this.snackBar.open('The course was saved successfully!', 'Close', {
      duration: 5000,
    });
    this.onCancel();
  }
}
