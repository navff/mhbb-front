import { Component, OnInit } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'my-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  userEmail: string;

  constructor(private auth: AuthService) {}

ngOnInit() {
    this.auth.getUserByToken()
    .then(result => this.userEmail = result.Email);
}}
