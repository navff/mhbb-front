import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

import { Router } from '@angular/router';

import '../style/app.sass';

@Component({
  selector: 'mh-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router) {}
  ngOnInit() {
    this.auth.setToken();
    if (window.location.pathname === '/') {
      if (!this.auth.token) {
        this.router.navigate(['']);
      } else {
        this.auth.getUserByToken()
          .subscribe(user => {
            if (user.RoleName === 'PortalAdmin' || user.RoleName === 'PortalManager') {
              this.router.navigate(['admin']);
            } else {
              this.router.navigate(['']);
            }
          });
      }
    }
  }
}
