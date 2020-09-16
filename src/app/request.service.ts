import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private httpClient: HttpClient) { }

  get(url: string): Observable<Object> {
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.get(`http://192.168.0.12:8080${url}`, {headers:httpHeaders, observe:'response'});
  }

  post(url: string, body: any): Observable<Object>{
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.post(`http://192.168.0.12:8080${url}`, body, {headers:httpHeaders, observe:'response'});
  }

  put(url: string, body: any): Observable<Object>{
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.append("Authorization",`Bearer ${localStorage.getItem('token')}`);
    return this.httpClient.put(`http://192.168.0.12:8080${url}`, body, {headers:httpHeaders, observe:'response'});
  }

}
