import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { ListService } from '../../shared/services/list.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../../models/user.model';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass'],
  providers: [UserService]
})
export class UsersComponent implements OnInit {
  cities = [];
  users: User[];

  word: string;
  isAdmin: boolean;
  cityId: string;
  page = 1;
  changes$ = new Subject();

  checkLength: number;

  constructor(
    private userService: UserService,
    private listService: ListService) { }

  onChange() {
    this.changes$.next();
  }
  search() {
    let roles = [];
    if (this.isAdmin !== undefined) {
      roles = [
        this.isAdmin ? '0' : null,
        this.isAdmin ? '1' : null
      ];
    }
    this.userService.list({page: this.page.toString(10), roles , cityId: this.cityId, word: this.word})
      .subscribe(data => {
        this.users = data;
        this.checkLength = data.length;
      });
  }

  ngOnInit() {
    this.changes$.debounceTime(250).subscribe(() => this.search());
    this.listService.cities$.subscribe(data => this.cities = data);
    this.search();
  }
}
