import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './core/guards/auth.guard';
import { EducationComponent } from './modules/educationModule/education/education.component';
import { AddEducationComponent } from './modules/educationModule/add-education/add-education.component';
import { EditEducationComponent } from './modules/educationModule/edit-education/edit-education.component';
import { HomeEducationComponent } from './modules/educationModule/home-education/home-education.component';

export const routes: Routes = [
  {
    pathMatch:'full',
    path: '',
    component: HomePageComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'educations',
    component: EducationComponent,
    canActivate:[authGuard],
    children:[
      {
        path: '',
        component: HomeEducationComponent
      },
      {
        path:"add-educations",
        component:AddEducationComponent
      },
      {
        path:"edit-educations/:eduId",
        component:EditEducationComponent
      }
    ]
  },
  {
    path: 'projects',
    canActivate:[authGuard],
    children:[
      {
        path: '',
      },
      {
        path:"add-projects",
      },
      {
        path:"edit-projects/:prjId",
      }
    ]
  },
];
