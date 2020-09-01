import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });
  hidePassword = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  loginAction() {
    if(this.formGroup.valid) {
      this.loginService.loginAction(this.formGroup.get('username').value,this.formGroup.get('password').value)
        .toPromise().then((response:any) => {
          if(response.status === 200) {
            localStorage.setItem("token",response.body.token);
            this.router.navigate(['/home']);
          } else {
            window.alert('Unexpected behaviour');
          }
        }).catch(error => {
          window.alert(error.error);
        });
    }
  }

}
