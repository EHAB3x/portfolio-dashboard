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
    return this.httpClient.get<IEducation[]>(`${environment.baseUrl}/Education`);
  }

  addEducation(newEducation: IEducation):Observable<void>{
    return this.httpClient.post<void>(`${environment.baseUrl}/Education`,
    newEducation
  )}

  deleteEducation(eduId:number):Observable<void>{
    return this.httpClient.delete<void>(`${environment.baseUrl}/Education/${eduId}`)
  }

}
