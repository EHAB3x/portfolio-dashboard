import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';

export const adminRoutes: Routes = [
  {
    path: 'admins',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: HomeAdminComponent,
      },
      {
        path: 'add-admins',
        component: AddAdminComponent,
      },
      {
        path: 'edit-admins/:adminId',
        component: EditAdminComponent,
      },
    ],
  },
];
