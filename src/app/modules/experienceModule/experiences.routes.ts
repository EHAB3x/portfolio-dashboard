import { Routes } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';
import { HomeExperienceComponent } from './home-experience/home-experience.component';
import { AddExperienceComponent } from './add-experience/add-experience.component';
import { EditExperienceComponent } from './edit-experience/edit-experience.component';

export const experiencesRoutes: Routes = [
  {
    path: 'experiences',
    component: ExperienceComponent,
    children:[
      {
        path:'',
        component: HomeExperienceComponent,
      },
      {
        path:'add-experiences',
        component: AddExperienceComponent,
      },
      {
        path:'edit-experiences/:experienceId',
        component: EditExperienceComponent
      },
    ]
  }
];
