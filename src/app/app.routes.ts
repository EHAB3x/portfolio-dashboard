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
import { SkillsComponent } from './modules/skillsModule/skills/skills.component';
import { HomeSkillsComponent } from './modules/skillsModule/home-skills/home-skills.component';
import { AddSkillsComponent } from './modules/skillsModule/add-skills/add-skills.component';
import { EditSkillsComponent } from './modules/skillsModule/edit-skills/edit-skills.component';
import { AdminComponent } from './modules/adminModule/admin/admin.component';
import { HomeAdminComponent } from './modules/adminModule/home-admin/home-admin.component';
import { AddAdminComponent } from './modules/adminModule/add-admin/add-admin.component';
import { EditAdminComponent } from './modules/adminModule/edit-admin/edit-admin.component';
import { ServiceComponent } from './modules/servicesModule/service/service.component';

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
  {
    path: 'skills',
    component: SkillsComponent,
    canActivate:[authGuard],
    children:[
      {
        path: '',
        component: HomeSkillsComponent,
      },
      {
        path:"add-skills",
        component: AddSkillsComponent
      },
      {
        path:"edit-skills/:skillId",
        component: EditSkillsComponent
      }
    ]
  },
  {
    path: 'admins',
    component: AdminComponent,
    children:[
      {
        path:'',
        component: HomeAdminComponent,
      },
      {
        path: 'add-admins',
        component: AddAdminComponent
      },
      {
        path: 'edit-admins/:adminId',
        component: EditAdminComponent
      },
    ]
  },
  {
    path: 'services',
    component: ServiceComponent
  }
];
