import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Course } from '../../models/Course';
import { catchError, Observable, of } from 'rxjs';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  private coursesService: CoursesService = inject(CoursesService);
  courses$: Observable<Course[]>;

  constructor() {
    this.courses$ = this.coursesService.getCourses().pipe(
      catchError(() => {
        return of([]);
      })
    );
  }
}
