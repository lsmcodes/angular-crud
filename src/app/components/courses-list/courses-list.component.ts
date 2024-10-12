import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/Course';
import { CategoryPipe } from '../../pipes/category.pipe';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule, CategoryPipe],
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
