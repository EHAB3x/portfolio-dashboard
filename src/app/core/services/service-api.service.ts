import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IServices } from '../interfaces/iservices';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceApiService {

  constructor(
    private httpClient : HttpClient
  ) { }

  getAllServices(): Observable<IServices[]>{
    return this.httpClient.get<IServices[]>(`${environment.baseUrl}/Services`);
  }

  addService(newService: IServices): Observable<void>{
    return this.httpClient.post<void>(`${environment.baseUrl}/Services`,
      newService
    );
  }

  getServiceById(serviceId: number): Observable<IServices>{
    return this.httpClient.get<IServices>(`${environment.baseUrl}/Services/${serviceId}`);
  }

  updateServiceById(serviceId: number, newService: IServices): Observable<void>{
    return this.httpClient.put<void>(`${environment.baseUrl}/Services/${serviceId}`, newService);
  }

  deleteService(serviceId: number): Observable<void>{
    return this.httpClient.delete<void>(`${environment.baseUrl}/Services/${serviceId}`);
  }
}
