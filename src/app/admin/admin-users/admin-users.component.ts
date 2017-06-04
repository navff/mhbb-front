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
  setArgument(index, value, index2?, value2?) {
    this.args[index] = value;
    this.args[index2] = value2;
    this.userService.getUsers(this.args[0], this.args[1], this.args[2])
    .then(result => this.users = result);
  }
  saveUserEmail(email) {
    localStorage.setItem('userEmail', email);
  }
    ngOnInit() {
        this.userService.getUsers()
        .then(result => this.users = result);
    };
}
