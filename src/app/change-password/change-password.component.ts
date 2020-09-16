import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  firstAndLastName: string;
  profilePictureURI: string;

  formGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    repeatPassword: new FormControl('')
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserByToken().toPromise().then((response: any) => {
      if(response.status === 200) {
        this.firstAndLastName = response.body.firstName + ' ' + response.body.lastName;
        this.profilePictureURI = 'http://192.168.0.12:8080/images' + response.body.pictureURI;
      }
    }).catch();
  }

  updatePassword() {
    
  }

}
