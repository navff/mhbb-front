import { Component } from '@angular/core';
import { UserService } from './../../shared/services/user.service';

import { Router } from '@angular/router';

@Component({
  selector: 'mh-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.sass']
})
export class EnterComponent {
  email: string;
  responding: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  back() {
    history.back();
  }

  registerUser() {
    this.responding = true;
    this.userService.register(this.email)
      .subscribe(() => this.router.navigate(['/enter/success']));
  }
}
