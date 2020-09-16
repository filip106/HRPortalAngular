import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivityService {

  constructor(private requestService: RequestService) { }

  getLoginDetails(id: number) {
    return this.requestService.get('/login-details/'+id);
  }
}
