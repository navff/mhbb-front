import { AuthService } from './../shared/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'my-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.sass']
})
export class EnterComponent {
  email: string;
  constructor(
    private auth: AuthService,
    private router: Router
    ) {}
  registerUser() {
    this.auth.postUser(this.email)
    .then(result => console.log(result));
    this.router.navigate(['/enter/entersuccess']);
  }
}
