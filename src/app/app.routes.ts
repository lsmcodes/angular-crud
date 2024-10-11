import { Routes } from '@angular/router';
import { CourseFormComponent } from './components/course-form/course-form.component';

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
  },
];
