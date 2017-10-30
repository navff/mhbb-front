import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { CityService } from '../../shared/services/city.service';
import { Subject } from 'rxjs/Subject';
import { User } from '../../models/user.model';

@Component({
  selector: 'mh-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.sass'],
  providers: [CityService, UserService]
})
export class AdminUsersComponent implements OnInit {
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
    private cityService: CityService) { }

  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  concatPage(): void {
    this.responding = true;
    this.page += 1;
    this.userService.getUsers(this.page.toString(10), this.roles[0], this.roles[1], this.city.Id, this.word)
      .subscribe((data: User[]) => {
        this.users = this.users.concat(data);
        this.checkLength = data.length;
        this.responding = false;
      });

  }
  search(...adminBools): void {
    this.page = 1;
    if (adminBools[0] !== undefined) { this.roles[0] = adminBools[0]; }
    if (adminBools[1] !== undefined) { this.roles[1] = adminBools[1]; }
    this.userService.getUsers(this.page.toString(10), this.roles[0], this.roles[1], this.city.Id, this.word)
      .subscribe((data: User[]) => {
        this.users = data;
        this.checkLength = data.length;
      });
  }

  ngOnInit() {
    this.searchWord.debounceTime(250).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.userService.getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
        this.checkLength = data.length;
      });
  }
}
