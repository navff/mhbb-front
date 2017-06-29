import { AuthService } from './shared/auth.service';
import { Component, OnInit } from '@angular/core';

import '../style/app.sass';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  userEmail: string;

  constructor(private auth: AuthService) {}
  admin() {
    localStorage.setItem('token', 'ABRAKADABRA');
    console.log(localStorage.getItem('token'));
  }
  ngOnInit() {
    this.auth.setToken();

    if (this.auth.token) {
      this.auth.getUserByToken()
      .then(result => this.userEmail = result.Email);
    }
}}
