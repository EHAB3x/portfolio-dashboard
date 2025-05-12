import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { authGuard } from '../../core/guards/auth.guard';
import { HomeEducationComponent } from '../educationModule/home-education/home-education.component';
import { AddEducationComponent } from '../educationModule/add-education/add-education.component';
import { EditEducationComponent } from '../educationModule/edit-education/edit-education.component';
import { HomeProjectComponent } from './home-project/home-project.component';
import { AddProject } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const projectsRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeProjectComponent,
      },
      {
        path: 'add-projects',
        component: AddProject,
      },
      {
        path: 'edit-projects/:prjId',
        component: EditProjectComponent,
      },
    ],
  },
];
