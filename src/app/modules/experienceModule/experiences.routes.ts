import { Routes } from '@angular/router';
import { ExperienceComponent } from './experience/experience.component';

export const experiencesRoutes: Routes = [
  {
    path: 'experiences',
    component: ExperienceComponent,
    // children:[
    //   {
    //     path:'',
    //     component: HomeServiceComponent,
    //   },
    //   {
    //     path:'add-experiences',
    //     component: AddServiceComponent,
    //   },
    //   {
    //     path:'edit-experiences/:experienceId',
    //     component: EditServiceComponent
    //   },
    // ]
  }
];
