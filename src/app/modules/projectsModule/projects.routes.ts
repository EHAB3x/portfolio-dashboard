import { Routes } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { HomeProjectComponent } from './home-project/home-project.component';
import { AddProject } from './add-project/add-project.component';
import { EditProjectComponent } from './edit-project/edit-project.component';

export const projectsRoutes: Routes = [
  {
    path: 'projects',
    component: ProjectComponent,
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
