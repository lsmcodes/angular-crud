import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule
} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Course } from '../../models/Course';
import { CoursesService } from '../../services/courses.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    MatCardModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    CoursesListComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent {
  courses$: Observable<Course[]> | null = null;
  private coursesService: CoursesService = inject(CoursesService);
  private dialog: MatDialog = inject(MatDialog);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  constructor() {
    this.getCourses();
  }

  private getCourses(): void {
    this.courses$ = this.coursesService.getCourses().pipe(
      catchError(() => {
        this.onError(
          'Something went wrong while loading the courses. Try again later.'
        );
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

  onDelete(course: Course): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Do you really want to delete the course "${course.name}"?`,
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {
        if (result) {
          this.getCourses();
          this.coursesService.deleteCourse(course._id).subscribe({
            next: () =>
              this.snackBar.open(
                'The course was deleted successfully!',
                'Close',
                {
                  duration: 5000,
                }
              ),
            error: () =>
              this.onError(
                'Something went wrong while deleting the course. Try again later.'
              ),
          });
        }
      },
    });
  }
}
