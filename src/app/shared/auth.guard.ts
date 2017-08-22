import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (localStorage.getItem('token')) {
      return this.auth.getUserByToken()
        .toPromise()
        .then((result) => {
          if (result.RoleName === 'PortalAdmin' || result.RoleName === 'PortalManager') {
            return true;
          }
          this.router.navigate(['']);
          return false;
        });
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
