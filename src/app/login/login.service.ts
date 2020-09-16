import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loginAction(username: string, password: string) {
    let body = {};
    body['username'] = username;
    body['password'] = password;
    return this.httpClient.post('http://192.168.0.12:8080/login', body, {observe:'response'});
  }
}
