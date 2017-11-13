import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './shared/services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'mh-app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router) { }
  ngOnInit() {
    if (window.location.pathname === '/') {
      !localStorage.getItem('token') ?
        this.router.navigate(['']) :
        this.userService.getByToken()
          .subscribe(user => {
            (user.RoleName === 'PortalAdmin' || user.RoleName === 'PortalManager') ?
              this.router.navigate(['admin']) :
              this.router.navigate(['']);
          }
          );
    }
  }
}
