import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { authGuard } from '../../core/guards/auth.guard';
import { HomeEducationComponent } from '../educationModule/home-education/home-education.component';
import { AddEducationComponent } from '../educationModule/add-education/add-education.component';
import { EditEducationComponent } from '../educationModule/edit-education/edit-education.component';

export const projectsRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeEducationComponent,
      },
      {
        path: 'add-projects',
        component: AddEducationComponent,
      },
      {
        path: 'edit-projects/:prjId',
        component: EditEducationComponent,
      },
    ],
  },
];
