import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { catchError, Observable, of } from 'rxjs';
import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses.service';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    CoursesListComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<Course[]>;
  private coursesService: CoursesService = inject(CoursesService);
  private dialog: MatDialog = inject(MatDialog);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  constructor() {
    this.courses$ = this.coursesService.getCourses().pipe(
      catchError(() => {
        this.onError('Something went wrong while loading the courses. Try again later.');
        return of([]);
      })
    );
  }

  private onError(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, { data: errorMessage });
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }
}
