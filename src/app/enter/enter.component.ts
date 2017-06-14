import { AuthService } from './../shared/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'my-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.sass'],
  providers: [AuthService],
})
export class EnterComponent {
  email: string;
  constructor(private auth: AuthService) {}
  registerUser() {
    this.auth.postUser(this.email)
    .then(result => console.log(result));
  }
}
