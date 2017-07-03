import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { SharedService } from './shared/shared.service';

import { Router, NavigationEnd } from '@angular/router';

import '../style/app.sass';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router,
              private shared: SharedService) {
                this.router.events
                .filter(e => e instanceof NavigationEnd)
                .pairwise().subscribe((e: any) => {
                  this.shared.updateUrl(e[0].url);
                });
              }
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
