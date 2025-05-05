import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginResponse } from '../interfaces/ilogin-response';
import { environment } from '../../../environments/environment';
import { ILoginData } from '../interfaces/ilogin-data';
import { Router } from '@angular/router';
import { IAdmin } from '../interfaces/iadmin';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isUserLoggedIn: BehaviorSubject<boolean>;

  constructor(
      private httpClient: HttpClient,
      private router: Router
    ) {
    this.isUserLoggedIn = new BehaviorSubject<boolean>(false);
  }

  login(userDetails: ILoginData):Observable<ILoginResponse>{
    let loginResponse = this.httpClient.post<ILoginResponse>(`${environment.baseUrl}/Auth/login`,{
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
        this.getAuthStatus().next(true);
        this.router.navigateByUrl("/")
      }
    });
    return loginResponse;
  }

  getAuthStatus(): BehaviorSubject<boolean>{
    return this.isUserLoggedIn;
  }

  userLoggedOut(){
    window.localStorage.removeItem('token');
    this.getAuthStatus().next(false);
    this.router.navigateByUrl("/login")
  }

  getToken() : string{
    if(this.getAuthStatus().getValue()){
      return window.localStorage.getItem("token") as string
    }
    else{
      return ""
    }
  }

  getAllAdmins(): Observable<IAdmin[]>{
    return this.httpClient.get<IAdmin[]>(`${environment.baseUrl}/Auth/Admins`);
  }

  addAdmin(newAdmin : IAdmin): Observable<void>{
    return this.httpClient.post<void>(`${environment.baseUrl}/Auth/Admins`,
      newAdmin
    );
  }

  deleteAdmin(adminId: number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.baseUrl}/Auth/Admins/${adminId}`);
  }
}
