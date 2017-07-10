import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (this.auth.token) {
      return this.auth.getUserByToken()
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
