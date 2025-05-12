import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IExperience } from '../interfaces/iexperience';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExperiencesApiService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllExperiences(): Observable<IExperience[]>{
    return this.httpClient.get<IExperience[]>(`${environment.baseUrl}/Experience`)
  }

  addExperience(newExperience: IExperience): Observable<void>{
    return this.httpClient.post<void>(`${environment.baseUrl}/Experience`,
      newExperience
    );
  }

  getExperienceById(experienceId: number): Observable<IExperience>{
    return this.httpClient.get<IExperience>(`${environment.baseUrl}/Experience/${experienceId}`);
  }

  updateServiceById(experienceId: number, newExperience: IExperience): Observable<void>{
    return this.httpClient.put<void>(`${environment.baseUrl}/Experience/${experienceId}`,
      newExperience
    );
  }

  deleteExperience(experienceId: number): Observable <void>{
    return this.httpClient.delete<void>(`${environment.baseUrl}/Experience/${experienceId}`)
  }
}
