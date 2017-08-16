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
  loading = true;

  word: string;
  age: string;
  sobriety: string;
  free: string;
  searchWord: Subject<string> = new Subject();
  searchAge: Subject<string> = new Subject();

  city: any = { id: undefined };
  interest: any = { id: undefined };

  checkLength: number;
  page = 1;
  responding = false;

  constructor(
    private activityService: ActivityService,
    private interestService: InterestService,
    private cityService: CityService) { }

  reset() {
    this.page = 1;
    this.activities = [];
    this.loading = true;
    this.checkLength = 0;
  }
  search(...values) {
    this.reset();
    if (values[0] !== undefined) { this.sobriety = values[0]; }
    if (values[1] !== undefined) { this.free = values[1]; }
    this.activityService
      .getActivities(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
      .then(result => {
        this.activities = result;
        this.checkLength = result.length;
        this.loading = false;
      });
  }
  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  updateAge(age: string): void {
    this.searchWord.next(age);
  }
  concatPage() {
    this.responding = true;
    this.page += 1;
    this.activityService.getActivities(this.page.toString(10))
      .then(result => {
        this.activities = this.activities.concat(result);
        this.checkLength = result.length;
        this.responding = false;
      });
  }
  ngOnInit() {
    this.searchWord.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.searchAge.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.activityService.getActivities().then((result: Activity[]) => {
      this.activities = result;
      this.checkLength = result.length;
      this.loading = false;
    });
    this.interestService.getInterests().then(result => this.interests = result);
    this.cityService.getCities().then(result => this.cities = result);
  }
}
