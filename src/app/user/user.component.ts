import { AuthService } from './../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  userEmail: string;

  constructor(private auth: AuthService) {}

  setAdmin() {
    localStorage.setItem('token', 'ABRAKADABRA');
    console.log(localStorage.getItem('token'));
    window.location.reload();
  }
  ngOnInit() {
    if (this.auth.token) {
      this.auth.getUserByToken()
      .then(result => this.userEmail = result.Email);
  }
}}
