import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { EmailValidation, PasswordValidation, RepeatPasswordEStateMatcher, RepeatPasswordValidator } from '../utils/password-repeat-validator';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hidePassword = false;
  hideRepeatedPassword = false;
  passwordsMatcher = new RepeatPasswordEStateMatcher;

  formGroup = new FormGroup({
    email: new FormControl({value:'',disabled: true}),
    password: new FormControl('', PasswordValidation),
    repeatPassword: new FormControl(''),
    sector: new FormControl({value:'',disabled: true}),
    manager: new FormControl({value:'',disabled: true})
    },{validators:RepeatPasswordValidator});

  constructor(private router: Router,private activatedRoute: ActivatedRoute,private registerService: RegisterService) { }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.queryParams["token"]) {
      this.registerService.checkToken(this.activatedRoute.snapshot.queryParams["token"]).toPromise().then((response:any)=>{
        if(response.status === 200) {
          this.formGroup.get('email').setValue(response.body.email);
          this.formGroup.get('sector').setValue(response.body.sectorName);
          this.formGroup.get('manager').setValue(response.body.managerName);
        }
      }).catch(error => {
        window.alert(error.error);
      });
    }
  }

  registerUser() {
    this.registerService.enableUser(this.formGroup.get('password').value,this.activatedRoute.snapshot.queryParams["token"])
      .toPromise().then((response: any) => {
        if(response.status === 200){
          this.router.navigate(['login']);
        }
      }).catch(error => {
        window.alert(error.error);
      });
  }

}
