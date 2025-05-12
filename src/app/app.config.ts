import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { adminRoutes } from './modules/adminModule/admin.routes';
import { educationRoutes } from './modules/educationModule/education.routes';
import { projectsRoutes } from './modules/projectsModule/projects.routes';
import { servicesRoutes } from './modules/servicesModule/services.routes';
import { skillsRoutes } from './modules/skillsModule/skills.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      ([] as Routes)
      .concat(adminRoutes)
      .concat(educationRoutes)
      .concat(projectsRoutes)
      .concat(servicesRoutes)
      .concat(skillsRoutes)
      .concat(routes)
      ),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor]))
  ]
};
