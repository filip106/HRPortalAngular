import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private requestService: RequestService) { }

  getUserInfo(): Observable<Object>{
    return this.requestService.get('/employee/user-info');
  }
}
