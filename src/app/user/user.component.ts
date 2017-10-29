import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/services/user.service';

@Component({
  selector: 'mh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  userEmail: string;
  isAuthorized: boolean;

  constructor(private userService: UserService) {
    this.isAuthorized = !!localStorage.getItem('token');
  }

  exit(): void {
    localStorage.setItem('token', '');
    window.location.reload();
  }

  ngOnInit() {
    if (this.isAuthorized) {
      this.userService.getByToken()
        .subscribe(user => this.userEmail = user.Email);
    }
  }
}
