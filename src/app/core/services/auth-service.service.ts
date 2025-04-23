import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/ilogin-response';
import { environment } from '../../../environments/environment';
import { ILoginData } from '../interfaces/ilogin-data';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  isUserLoggedIn: BehaviorSubject<boolean>;


  constructor(private httpClient: HttpClient) {
    this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
  }

  login(userDetails: ILoginData):Observable<ILoginResponse>{
    this.getAuthStatus().next(true);


    let loginResponse = this.httpClient.post<ILoginResponse>(`${environment.baseUrl}/login`,{
      username: userDetails.username,
      password: userDetails.password
    },{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    })

    loginResponse.subscribe({
      next:(res)=> {
        localStorage.setItem("token", res.token!)
      }
    });

    return loginResponse;
  }

  getAuthStatus(): BehaviorSubject<boolean>{
    return this.isUserLoggedIn;;
  }

  userLoggedOut(){
    this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
    window.localStorage.removeItem('token');
  }
}
