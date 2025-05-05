import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISkills } from '../interfaces/iskills';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SkillsApiService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllSkills():Observable<ISkills[]>{
    return this.httpClient.get<ISkills[]>(`${environment.baseUrl}/Skills`);
  }

  addSkill(newSkill: ISkills):Observable<void>{
    return this.httpClient.post<void>(`${environment.baseUrl}/Skills`,
      newSkill
  )}

  deleteSkill(skillId: number):Observable<void>{
    return this.httpClient.delete<void>(`${environment.baseUrl}/Skills/${skillId}`)
  }

  getSkillById(prjId: number):Observable<ISkills>{
    return this.httpClient.get<ISkills>(`${environment.baseUrl}/Skills/${prjId}`)
  }

  updateSkillById(skillId: number, newSkill: ISkills):Observable<ISkills>{
    return this.httpClient.put<ISkills>(
      `${environment.baseUrl}/Skills/${skillId}`,
      newSkill
    )
  }
}
