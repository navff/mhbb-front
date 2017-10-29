import { Component, OnInit } from '@angular/core';
import { UserService } from './../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  userEmail: string;
  isAuthorized: boolean;

  constructor(private userService: UserService, private router: Router) {
    this.isAuthorized = !!localStorage.getItem('token');
  }

  setAdmin(): void {
    localStorage.setItem('token', 'ABRAKADABRA');
    this.router.navigate(['']);
    window.location.reload();
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
