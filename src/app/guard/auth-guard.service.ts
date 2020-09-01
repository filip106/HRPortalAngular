import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private httpClient: HttpClient, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let validated;
    let token: string = localStorage.getItem('token');
    if(token) {
      await this.httpClient.post('http://localhost:8080/validate',{token: token},{observe:'response'}).toPromise().then((response:any) => {
        if(response.status === 200 && response.body) {
          validated = true;
        } else {
          window.alert("You are not authenticated");
          this.router.navigate(['login']);
          localStorage.removeItem('token');
          validated = false;
        }
      }).catch(error => {
          window.alert(error.error);
          this.router.navigate(['login']);
          localStorage.removeItem('token');
          validated = false;
      });
    } else {
      this.router.navigate(['login']);
      validated = false;
    }
    return validated;
  }
}
