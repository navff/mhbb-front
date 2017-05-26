import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'my-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass'],
  providers: [UserService],
})
export class AdminUsersComponent implements OnInit {
  users = [];
  args: any[] = [];
    constructor(private userService: UserService) {}
  saveUserEmail(email) {
    localStorage.setItem('userEmail', email);
  }
    ngOnInit() {
        this.userService.getUsers()
        .then(result => this.users = result);
    };
}
