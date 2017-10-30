import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activity.service';
import { InterestService } from '../../shared/services/interest.service';
import { CityService } from '../../shared/services/city.service';
import { Subject } from 'rxjs/Subject';
import { Activity } from '../../models/activity.model';

@Component({
  selector: 'mh-main',
  templateUrl: './main.component.html',
  providers: [ActivityService, InterestService, CityService],
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {
  cities = [];
  interests = [];
  activities: Activity[];

  word: string;
  age: string;
  sobriety: string;
  free: string;
  searchWord: Subject<string> = new Subject();
  searchAge: Subject<string> = new Subject();

  city: any = {};
  interest: any = {};

  checkLength: number;
  page = 1;
  loaded: boolean;
  responding: boolean;

  constructor(
    private activityService: ActivityService,
    private interestService: InterestService,
    private cityService: CityService) { }

  search(...values): void {
    this.page = 1;
    this.loaded = false;
    if (values[0] !== undefined) { this.sobriety = values[0]; }
    if (values[1] !== undefined) { this.free = values[1]; }
    this.activityService
      .list(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
      .subscribe(data => {
        this.activities = data;
        this.checkLength = data.length;
        this.loaded = true;
      });
  }
  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  updateAge(age: string): void {
    this.searchWord.next(age);
  }
  concatPage(): void {
    this.responding = true;
    this.page += 1;
    this.activityService.list(this.page.toString(10))
      .subscribe(data => {
        this.activities = this.activities.concat(data);
        this.checkLength = data.length;
        this.responding = false;
      });
  }
  ngOnInit() {
    this.searchWord.debounceTime(250).distinctUntilChanged().subscribe(() => this.search());
    this.searchAge.debounceTime(250).distinctUntilChanged().subscribe(() => this.search());
    this.activityService.list().subscribe((data: Activity[]) => {
      this.activities = data;
      this.checkLength = data.length;
      this.loaded = true;
    });
    this.interestService.getInterests().subscribe(data => {
      this.interests = data;
      this.interests.unshift({ Id: null, Name: 'Показать все' });
    });
    this.cityService.getCities().subscribe(data => this.cities = data);
  }
}
