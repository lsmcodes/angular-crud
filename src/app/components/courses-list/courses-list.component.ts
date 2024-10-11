import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../models/Course';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  displayedColumns = ['name', 'category', 'actions'];
}
