import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IImagBB } from '../interfaces/iimag-bb';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(
    private httpClient: HttpClient
  ) { }

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', environment.ImgbbAPIToken);

    return this.httpClient
      .post<IImagBB>(environment.ImgbbBaseUrl, formData)
      .pipe(map((response) => response.data.url));
  }
}
