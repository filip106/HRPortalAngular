import { Injectable } from '@angular/core';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private requestService: RequestService) { }

  getUserByToken() {
    return this.requestService.get('/user');
  }

  updateUser(body: any) {
    return this.requestService.put('/user', body);
  }
}
