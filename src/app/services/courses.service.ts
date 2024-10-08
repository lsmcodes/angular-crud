import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API: string = 'http://localhost:8080/api/courses';
  private httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  getCourses() {
    return this.httpClient.get<Course[]>(this.API).pipe(first());
  }
}
