import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { SharedService } from './../../shared/services/shared.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.sass']
})
export class EnterComponent {
  email: string;
  responding = false;
  sub: Subscription;

  previousUrl: string;

  constructor(
    private auth: AuthService,
    private router: Router,
    private shared: SharedService
  ) {
    this.sub = this.shared.previousUrl.subscribe(result => this.previousUrl = result);
  }

  back() {
    this.router.navigate([this.previousUrl]);
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
