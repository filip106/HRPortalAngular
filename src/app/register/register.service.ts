import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  checkToken(token: string) {
    return this.httpClient.get(`http://192.168.0.12:8080/verify-registration-token/${token}`,{observe: 'response'});
  }

  enableUser(password: string, token: string) {
    let body = {
      password: password
    }
    return this.httpClient.post(`http://192.168.0.12:8080/enable-user/${token}`,body,{observe: 'response'});
  }

}
