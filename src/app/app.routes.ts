import { Routes } from '@angular/router';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { courseResolver } from './guards/course.resolver';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/courses',
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./components/courses/courses.component').then(
        (mod) => mod.CoursesComponent
      ),
  },
  {
    path: 'courses/new',
    component: CourseFormComponent,
    resolve: { course: courseResolver },
  },
  {
    path: 'courses/edit/:id',
    component: CourseFormComponent,
    resolve: { course: courseResolver },
  },
];
