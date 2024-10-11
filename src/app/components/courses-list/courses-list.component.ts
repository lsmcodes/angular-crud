import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../models/Course';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  displayedColumns: string[] = ['name', 'category', 'actions'];

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
