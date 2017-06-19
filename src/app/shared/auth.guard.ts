import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private auth: AuthService,
              private router: Router) { }

  canActivate() {
    if (this.auth.token) {
      return this.userService.getUserByToken()
      .then((result) => {
        if (result.RoleName === 'PortalAdmin') {
          return true;
        }
        this.router.navigate(['']);
        return false;
      });
    } else {
      this.router.navigate(['']);
      return false;
    }
}}
