import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './core/guards/auth.guard';
import { EducationComponent } from './modules/educationModule/education/education.component';
import { AddEducationComponent } from './modules/educationModule/add-education/add-education.component';
import { EditEducationComponent } from './modules/educationModule/edit-education/edit-education.component';
import { HomeEducationComponent } from './modules/educationModule/home-education/home-education.component';
import { ProjectComponent } from './modules/projectsModule/project/project.component';
import { HomeProjectComponent } from './modules/projectsModule/home-project/home-project.component';
import { AddProject } from './modules/projectsModule/add-project/add-project.component';
import { EditProjectComponent } from './modules/projectsModule/edit-project/edit-project.component';

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
    component: ProjectComponent,
    canActivate:[authGuard],
    children:[
      {
        path: '',
        component: HomeProjectComponent,
      },
      {
        path:"add-projects",
        component: AddProject
      },
      {
        path:"edit-projects/:prjId",
        component: EditProjectComponent
      }
    ]
  },
];
