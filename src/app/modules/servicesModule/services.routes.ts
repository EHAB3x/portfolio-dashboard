import { Routes } from '@angular/router';
import { ServiceComponent } from './service/service.component';
import { HomeServiceComponent } from './home-service/home-service.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { EditServiceComponent } from './edit-service/edit-service.component';

export const servicesRoutes: Routes = [
  {
    path: 'services',
    component: ServiceComponent,
    children:[
      {
        path:'',
        component: HomeServiceComponent,
      },
      {
        path:'add-services',
        component: AddServiceComponent,
      },
      {
        path:'edit-services/:serviceId',
        component: EditServiceComponent
      },
    ]
  }
];
