import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from './shared/services/user.service';

import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'mh-app',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private titleService: Title) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let title = this.getTitle(router.routerState, router.routerState.root).join('-');
        titleService.setTitle(title ? title + ' - Моё Хобби' : 'Моё Хобби');
      }
    });
  }
  ngOnInit() {
    if (window.location.pathname === '/') {
      !localStorage.getItem('token') ?
        this.router.navigate(['']) :
        this.userService.takeCurrent()
          .subscribe(user => {
            (user.RoleName === 'PortalAdmin' || user.RoleName === 'PortalManager') ?
              this.router.navigate(['admin']) :
              this.router.navigate(['']);
          }
          );
    }
  }

  getTitle(state, parent) {
    let data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data.title) {
      data.push(parent.snapshot.data.title);
    }
    if (state && parent) {
      data.push(... this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
