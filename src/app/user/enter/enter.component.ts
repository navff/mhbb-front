import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'mh-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.sass']
})
export class EnterComponent {
  email: string;
  responding = false;
  sub: Subscription;

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
      .then(result => {
        console.log(result);
        this.router.navigate(['/enter/entersuccess']);
        this.responding = false;
      });
  }
}
