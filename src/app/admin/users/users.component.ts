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
  searchWord: Subject<any> = new Subject();
  city: any = {};
  roles = [];
  page = 1;
  checkLength: number;

  responding: boolean;

  constructor(
    private userService: UserService,
    private listService: ListService) { }

  onChange() {
    this.searchWord.next();
  }
  concatPage() {
    this.responding = true;
    this.page++;
    this.userService.list(this.page.toString(10), this.roles[0], this.roles[1], this.city.Id, this.word)
      .subscribe((data: User[]) => {
        this.users = this.users.concat(data);
        this.checkLength = data.length;
        this.responding = false;
      });

  }
  search(...adminBools) {
    this.page = 1;
    if (adminBools[0] !== undefined) { this.roles[0] = adminBools[0]; }
    if (adminBools[1] !== undefined) { this.roles[1] = adminBools[1]; }
    this.userService.list(this.page.toString(10), this.roles[0], this.roles[1], this.city.Id, this.word)
      .subscribe((data: User[]) => {
        this.users = data;
        this.checkLength = data.length;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(250).subscribe(() => this.search());
    this.listService.cities$.subscribe(data => this.cities = data);
    this.userService.list()
      .subscribe((data: User[]) => {
        this.users = data;
        this.checkLength = data.length;
      });
  }
}