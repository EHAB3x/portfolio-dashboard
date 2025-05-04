import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEducation } from '../interfaces/ieducation';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EducationApiService {

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

  getEducationById(eduId : number):Observable<IEducation>{
    return this.httpClient.get<IEducation>(`${environment.baseUrl}/Education/${eduId}`)
  }

  updateEduById(eduId :number, newEdu: IEducation):Observable<IEducation>{
    return this.httpClient.put<IEducation>(
      `${environment.baseUrl}/Education/${eduId}`,
      newEdu
    )
  }
}
