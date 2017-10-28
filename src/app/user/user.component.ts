import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mh-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  userEmail: string;
  isAuthorized: boolean;

  constructor(private auth: AuthService, private router: Router) {
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
      this.auth.getUserByToken()
        .subscribe(user => this.userEmail = user.Email);
    }
  }
}
