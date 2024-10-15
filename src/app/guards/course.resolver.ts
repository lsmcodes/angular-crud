import { ResolveFn } from '@angular/router';
import { CoursesService } from '../services/courses.service';
import { inject } from '@angular/core';
import { Course } from '../models/Course';

export const courseResolver: ResolveFn<Course> = (route, state) => {
  const coursesService: CoursesService = inject(CoursesService);

  if (route.params && route.params['id']) {
    return coursesService.loadCourseById(route.params['id']);
  }
  return { _id: '', name: '', category: '' };
};
