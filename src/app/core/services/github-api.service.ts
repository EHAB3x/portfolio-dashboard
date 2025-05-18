import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGithubUser } from '../interfaces/igithub-user';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubApiService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllUserData(): Observable<IGithubUser>{
    return this.httpClient.get<IGithubUser>(`${environment.githubUsersBaseUrl}/EHAB3x`,{
      headers: new HttpHeaders({
        'Authorization': `Bearer ${environment.githubToken}`,
      })
    });
  }
}
