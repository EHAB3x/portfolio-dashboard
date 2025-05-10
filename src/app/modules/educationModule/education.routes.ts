import { Routes } from '@angular/router';
import { EducationComponent } from './education/education.component';
import { authGuard } from '../../core/guards/auth.guard';
import { HomeEducationComponent } from './home-education/home-education.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { EditEducationComponent } from './edit-education/edit-education.component';

export const educationRoutes: Routes = [
  {
    path: 'educations',
    component: EducationComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: HomeEducationComponent,
      },
      {
        path: 'add-educations',
        component: AddEducationComponent,
      },
      {
        path: 'edit-educations/:eduId',
        component: EditEducationComponent,
      },
    ],
  },
];
