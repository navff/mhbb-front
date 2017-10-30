import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../../shared/services/activity.service';
import { Activity } from '../../models/activity.model';
import { CityService } from '../../shared/services/city.service';
import { InterestService } from '../../shared/services/interest.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'mh-admin-main',
  templateUrl: './admin-main.component.html',
  providers: [ActivityService, CityService, InterestService],
  styleUrls: ['./admin-main.component.sass']
})
export class AdminMainComponent implements OnInit {
  interests = [];
  cities = [];

  activities: Activity[];
  word: string;
  age: string;
  sobriety: any;
  free: any;
  searchWord: Subject<any> = new Subject();
  searchAge: Subject<any> = new Subject();
  city: any = {};
  interest: any = {};
  uncheckedActivities: Activity[];

  constructor(
    private activityService: ActivityService,
    private cityService: CityService,
    private interestService: InterestService) { }

  search(...values): void {
    if (values[0] !== undefined) { this.sobriety = values[0]; }
    if (values[1] !== undefined) { this.free = values[1]; }

    this.activityService
      .listUnchecked(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
      .subscribe(data => {
        this.uncheckedActivities = data;
        this.activityService
          .list(this.word, this.age, this.interest.Id, this.city.Id, this.sobriety, this.free)
          .subscribe(act => this.activities = act);
      });

  }
  updateWord(word: string): void {
    this.searchWord.next(word);
  }
  updateAge(age: string): void {
    this.searchWord.next(age);
  }
  ngOnInit() {
    this.searchWord.debounceTime(250).distinctUntilChanged().subscribe(() => this.search());
    this.searchAge.debounceTime(250).distinctUntilChanged().subscribe(() => this.search());
    this.cityService.getCities().subscribe(data => this.cities = data);
    this.interestService.getInterests()
      .subscribe(data => this.interests = [{ Id: null, Name: 'Показать все' }].concat(data));
    this.activityService.listUnchecked()
      .subscribe((data: Activity[]) => {
        this.uncheckedActivities = data;
        this.activityService.list().subscribe((act: Activity[]) => this.activities = act);
      });
  }
}
