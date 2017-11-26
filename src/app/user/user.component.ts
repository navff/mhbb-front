import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/services/user.service';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  userEmail: string;

  constructor(private userService: UserService) { }

  exit() {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.userService.takeCurrent()
        .subscribe(user => this.userEmail = user.Email);
    }
  }
}
