import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first, Observable } from 'rxjs';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API: string = 'api/courses';
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  getCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(this.API).pipe(first());
  }

  loadCourseById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }

  saveCourse(course: Partial<Course>): Observable<Course> {
    if (course._id) {
      return this.updateCourse(course);
    }
    return this.createCourse(course);
  }

  private createCourse(course: Partial<Course>): Observable<Course> {
    return this.httpClient.post<Course>(this.API, course).pipe(first());
  }

  private updateCourse(course: Partial<Course>): Observable<Course> {
    return this.httpClient
      .put<Course>(`${this.API}/${course._id}`, course)
      .pipe(first());
  }
}
