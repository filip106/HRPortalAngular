import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  firstAndLastName: string;
  role: string;
  profilePictureURI: string;
  backgroundPictureURI: string;
  birthDate: Date;
  dateJoinedCompany: Date;
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserByToken().toPromise().then((response: any) => {
      if(response.status === 200) {
        this.firstAndLastName = response.body.firstName + ' ' + response.body.lastName;
        this.role = response.body.roles[0].name;
        this.profilePictureURI = 'http://192.168.0.12:8080/images' + response.body.pictureURI;
        this.backgroundPictureURI = 'http://192.168.0.12:8080/images' + response.body.backgroundPictureURI;
        this.birthDate = response.body.birthDate;
        this.dateJoinedCompany = response.body.dateJoinedCompany;
      }
    }).catch();
   
  }

  navigateToEdit(): void {
    this.router.navigate(['edit-profile'])
  }
}
