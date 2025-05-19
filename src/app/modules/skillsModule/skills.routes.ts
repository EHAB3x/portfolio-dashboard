import { Routes } from '@angular/router';
import { SkillsComponent } from './skills/skills.component';
import { HomeSkillsComponent } from './home-skills/home-skills.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { EditSkillsComponent } from './edit-skills/edit-skills.component';

export const skillsRoutes: Routes = [
  {
    path: 'skills',
    component: SkillsComponent,
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
];
