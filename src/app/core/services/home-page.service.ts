import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHomePage } from '../interfaces/ihome-page';
import { environment } from '../../../environments/environment';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class HomePageService{
  homePageResponse : IHomePage[] = [] as IHomePage[];
  token : string;

  constructor(
    private httpClient : HttpClient,
    private AuthService : AuthServiceService
  ) {
    this.token = AuthService.getToken() as string;
  }

  getHomeData():Observable<IHomePage[]>{
    let homeResponse = this.httpClient.get<IHomePage[]>(`${environment.baseUrl}/Home`)

    homeResponse.subscribe({
      next:(res)=>{
        this.homePageResponse = res;
      }
    })

    return homeResponse
  }
}
