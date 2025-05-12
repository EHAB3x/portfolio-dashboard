import { Routes } from '@angular/router';
import { EducationComponent } from './education/education.component';
import { HomeEducationComponent } from './home-education/home-education.component';
import { AddEducationComponent } from './add-education/add-education.component';
import { EditEducationComponent } from './edit-education/edit-education.component';

export const educationRoutes: Routes = [
  {
    path: 'educations',
    component: EducationComponent,
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
