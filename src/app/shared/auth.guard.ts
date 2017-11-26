import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate() {
    if (localStorage.getItem('token')) {
      return this.userService.takeCurrent()
        .toPromise()
        .then(result => {
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
