import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient) { }

  uploadPicture(picture: File): Observable<Object> {
    let formData: FormData = new FormData();
    formData.append('picture', picture, picture.name);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.post('http://192.168.0.12:8080/upload-profile-picture', formData,{observe:'response',headers: httpHeaders});
  }
}
