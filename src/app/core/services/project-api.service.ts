import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProjects } from '../interfaces/iprojects';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllProjects(): Observable<IProjects[]>{
    return this.httpClient.get<IProjects[]>(`${environment.baseUrl}/Projects`);
  }

  addProject(newProject: IProjects):Observable<void>{
    return this.httpClient.post<void>(`${environment.baseUrl}/Projects`,
      newProject
    )};

    deleteProject(prjId: number):Observable<void>{
      return this.httpClient.delete<void>(`${environment.baseUrl}/Projects/${prjId}`)
    }

    getProjectById(prjId: number):Observable<IProjects>{
      return this.httpClient.get<IProjects>(`${environment.baseUrl}/Projects/${prjId}`)
    }

    updatePrjById(prjId: number, newPrj: IProjects): Observable<IProjects>{
      return this.httpClient.put<IProjects>(
        `${environment.baseUrl}/Projects/${prjId}`,
        newPrj
      )
    }
}
