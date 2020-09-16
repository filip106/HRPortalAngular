import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService, private router: Router) { }
  firstAndLastName: string;
  role: string;

  ngOnInit(): void {
    this.initiateUserInfo();
  }

  initiateUserInfo(): void {
    this.homeService.getUserInfo().toPromise().then((response:any) => {
      if(response.status === 200) {
        this.firstAndLastName = response.body.firstName + ' ' + response.body.lastName;
        this.role = response.body.roles[0].name;
      }
    }).catch(error => {

    });
  }

  navigateFromMenu(url: string): void {
    this.router.navigate([url]);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  navigateToHome(): void {
    this.router.navigate(['']);
  }
}
