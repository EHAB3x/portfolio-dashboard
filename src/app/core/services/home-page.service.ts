import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHomePage } from '../interfaces/ihome-page';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomePageService{

  constructor(
    private httpClient : HttpClient,
  ) {
  }

  getHomeData():Observable<IHomePage[]>{
    return this.httpClient.get<IHomePage[]>(`${environment.baseUrl}/Home`)
  }
}
