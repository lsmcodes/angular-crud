import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss',
})
export class CoursesListComponent {
  @Input() courses: Course[] = [];
  displayedColumns = ['name', 'category'];
}
