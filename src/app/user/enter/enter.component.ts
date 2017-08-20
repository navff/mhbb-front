import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

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
    private auth: AuthService,
    private router: Router,
  ) { }

  back() {
    history.back();
  }

  registerUser() {
    this.responding = true;
    this.auth.postUser(this.email)
      .subscribe(() => this.router.navigate(['/enter/success']));
  }
}
