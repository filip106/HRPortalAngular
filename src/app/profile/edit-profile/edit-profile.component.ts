import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  firstAndLastName: string;
  profilePictureURI: string;

  formGroup = new FormGroup({
    username: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    birthDate: new FormControl('')
  });

  constructor(private userService: UserService, private router: Router, private profileService: ProfileService) { }

  ngOnInit(): void {
    this.userService.getUserByToken().toPromise().then((response: any) => {
      if(response.status === 200) {
        this.firstAndLastName = response.body.firstName + ' ' + response.body.lastName;
        this.profilePictureURI = 'http://192.168.0.12:8080/images' + response.body.pictureURI;
        this.formGroup.get('firstName').setValue(response.body.firstName);
        this.formGroup.get('lastName').setValue(response.body.lastName);
        this.formGroup.get('username').setValue(response.body.username);
        this.formGroup.get('email').setValue(response.body.email);
        this.formGroup.get('phoneNumber').setValue(response.body.phoneNumber);
        this.formGroup.get('birthDate').setValue(response.body.birthDate);
      }
    }).catch();
  }

  updateUser(): void {
    let body = {};
    body['username']=this.formGroup.get('username').value;
    body['firstName']=this.formGroup.get('firstName').value;
    body['lastName']=this.formGroup.get('lastName').value;
    body['phoneNumber']=this.formGroup.get('phoneNumber').value;
    body['birthDate']=this.formGroup.get('birthDate').value;
    this.userService.updateUser(body).toPromise().then((response: any) =>{
      if(response.status === 200) {
        this.router.navigate(['profile']);
      }
    }).catch(error => {
      if(error.status === 409) {
        window.alert(error.message);
      } else {
        window.alert(error.error);
      }
    });
  }

  navigateFromMenu(url: string): void {
    this.router.navigate([url]);
  }

  getImage(ev) {
    console.log(ev.target.files[0]);
    this.profileService.uploadPicture(ev.target.files[0]).toPromise().then((response: any) => {
      if(response.status === 200) {
        window.location.reload();
      }
    }).catch(error => {
      window.alert(error.error);
    });
 }

}
