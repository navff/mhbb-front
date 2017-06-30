import { AuthService } from './shared/auth.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import '../style/app.sass';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  userEmail: string;

  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.auth.setToken();
    if (window.location.pathname === '/') {
      if (!this.auth.token) {
        this.router.navigate(['']);
      } else {
        this.auth.getUserByToken()
        .then(result => {
          if (result.RoleName === 'PortalAdmin' || result.RoleName === 'PortalManager') {
            this.router.navigate(['admin']);
          } else {
            this.router.navigate(['']);
          }
        });
      }
    }
}}
