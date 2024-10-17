import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
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
  @Output() add: EventEmitter<void> = new EventEmitter(false);
  @Output() edit: EventEmitter<Course> = new EventEmitter(false);
  @Output() delete: EventEmitter<Course> = new EventEmitter(false);

  displayedColumns: string[] = ['name', 'category', 'actions'];

  onAdd(): void {
    this.add.emit();
  }

  onEdit(course: Course): void {
    this.edit.emit(course);
  }

  onDelete(course: Course): void {
    this.delete.emit(course);
  }
}
