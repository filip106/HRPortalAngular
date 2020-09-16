import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { LoginActivityService } from './login-activity.service';

@Component({
  selector: 'app-login-activity',
  templateUrl: './login-activity.component.html',
  styleUrls: ['./login-activity.component.scss']
})
export class LoginActivityComponent implements OnInit {

  firstAndLastName: string;
  profilePictureURI: string;
  loginDetails: [];

  constructor(private userService: UserService, private loginaActivityService: LoginActivityService) { }

  ngOnInit(): void {
    this.userService.getUserByToken().toPromise().then((response: any) => {
      if(response.status === 200) {
        this.firstAndLastName = response.body.firstName + ' ' + response.body.lastName;
        this.profilePictureURI = 'http://192.168.0.12:8080/images' + response.body.pictureURI;
        this.loginaActivityService.getLoginDetails(response.body.id).toPromise().then((responseDetails: any) => {
          if(responseDetails.status === 200) {
            this.loginDetails = responseDetails.body;
          }
        }).catch();
      }
    }).catch();
  }

}
