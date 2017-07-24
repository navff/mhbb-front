import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activity.service';
import { CityService } from '../../shared/services/city.service';
import { InterestService } from '../../shared/services/interest.service';
import { SharedService } from './../../shared/services/shared.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'my-admin-main',
  templateUrl: './admin-main.component.html',
  providers: [ActivityService, CityService, InterestService],
  styleUrls: ['./admin-main.component.sass']
})
export class AdminMainComponent implements OnInit {
  interests = [];
  cities = [];

  activities = [];
  word: string;
  age: string;
  sobriety: any;
  free: any;
  searchWord: Subject<string> = new Subject();
  searchAge: Subject<string> = new Subject();
  city: any = {id: undefined};
  interest: any = {id: undefined};
  loaded = false;
  uncheckedActivities = [];
  uncheckedLoaded = false;

  constructor(
    private activityService: ActivityService,
    private cityService: CityService,
    private interestService: InterestService,
    private shared: SharedService) {
    this.shared.destroyFooter();
  }
  reset() {
    this.loaded = false;
    this.uncheckedLoaded = false;
    this.activities = [];
    this.uncheckedActivities = [];
  }
  search(...values) {
    this.reset();
    if (values[0] !== undefined) { this.sobriety = values[0]; }
    if (values[1] !== undefined) { this.free = values[1]; }

    this.activityService
      .getUncheckedActivities(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
      .then(result => {
        this.uncheckedActivities = result;
        this.uncheckedLoaded = true;
        this.activityService
          .getActivities(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
          .then(act => {
            this.activities = act;
            this.loaded = true;
          });
      });

  }
  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  updateAge(age: string): void {
    this.searchWord.next(age);
  }
  ngOnInit() {
    this.searchWord.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.searchAge.debounceTime(300).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().then(result => this.cities = result);
    this.interestService.getInterests().then(result => this.interests = result);
    this.activityService.getUncheckedActivities()
      .then(result => {
        this.uncheckedActivities = result;
        this.uncheckedLoaded = true;
        this.activityService.getActivities()
          .then(acts => {
            this.activities = acts;
            this.loaded = true;
            this.shared.loadFooter();
          });
      });
  }
}
