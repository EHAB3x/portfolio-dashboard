import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEducation } from '../interfaces/ieducation';
import { environment } from '../../../environments/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class EducationApiService {

  private authService = inject(AuthServiceService)

  constructor(
    private httpClient: HttpClient,
  ) { }

  getAllEducation(): Observable<IEducation[]> {
    return this.httpClient.get<IEducation[]>(`${environment.baseUrl}/Education`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getToken()}`,
      })
    });
  }

}
