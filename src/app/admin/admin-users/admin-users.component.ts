import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { CityService } from '../../shared/services/city.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'mh-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass'],
  providers: [CityService, UserService]
})
export class AdminUsersComponent implements OnInit {
  cities = [];
  users = [];

  word: string;
  searchWord: Subject<string> = new Subject();
  city: any = { id: undefined };
  roles: any[] = [];
  page = 1;
  checkLength: number;

  loaded = false;
  responding = false;

  constructor(
    private userService: UserService,
    private cityService: CityService) { }

  concatPage() {
    this.responding = true;
    this.page += 1;
    this.userService.getUsers(this.page.toString(10), this.roles[0], this.roles[1], this.city.Id, this.word)
      .subscribe(data => {
        this.users = this.users.concat(data);
        this.checkLength = data.length;
        this.responding = false;
      });

  }
  reset() {
    this.page = 1;
    this.users = [];
    this.loaded = false;
    this.checkLength = 0;
  }
  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  search(...adminBools) {
    this.reset();
    if (adminBools[0] !== undefined) { this.roles[0] = adminBools[0]; }
    if (adminBools[1] !== undefined) { this.roles[1] = adminBools[1]; }
    this.userService.getUsers(this.page.toString(10), this.roles[0], this.roles[1], this.city.Id, this.word)
      .subscribe(data => {
        this.users = data;
        this.checkLength = data.length;
        this.loaded = true;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.userService.getUsers()
      .subscribe(data => {
        this.users = data;
        this.checkLength = data.length;
        this.loaded = true;
      });
  }
}
