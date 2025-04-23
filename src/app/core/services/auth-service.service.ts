import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/ilogin-response';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isUserLoggedIn: boolean = false;
  savedToken: string | null = window.localStorage.getItem('token');

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string):Observable<ILoginResponse>{
    return this.httpClient.post<ILoginResponse>(`${environment.baseUrl}/login`,{
      username,
      password
    })
  }

  userLoggedIn(token: string){
    this.isUserLoggedIn = true;
    window.localStorage.setItem('token', token);
  }

  userLoggedOut(){
    this.isUserLoggedIn = false;
    window.localStorage.removeItem('token');
  }
}
