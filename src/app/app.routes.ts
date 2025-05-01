import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './core/guards/auth.guard';
import { EducationComponent } from './pages/educationModule/education/education.component';
import { AddEducationComponent } from './pages/educationModule/add-education/add-education.component';

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
  },
  {
    path:"add-educations",
    component:AddEducationComponent
  }
];
