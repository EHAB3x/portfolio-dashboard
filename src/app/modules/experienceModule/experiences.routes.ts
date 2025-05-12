import { Routes } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';
import { HomeExperienceComponent } from './home-experience/home-experience.component';

export const experiencesRoutes: Routes = [
  {
    path: 'experiences',
    component: ExperienceComponent,
    children:[
      {
        path:'',
        component: HomeExperienceComponent,
      },
      // {
      //   path:'add-experiences',
      //   component: AddServiceComponent,
      // },
      // {
      //   path:'edit-experiences/:experienceId',
      //   component: EditServiceComponent
      // },
    ]
  }
];
