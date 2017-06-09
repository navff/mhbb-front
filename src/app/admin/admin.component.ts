import { Component, OnInit, HostListener, Inject }      from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CityService } from '../shared/city.service';
import { ActivityService } from '../shared/activity.service';

@Component({
  selector: 'my-admin-main',
  templateUrl: './admin.component.html',
  styleUrls: [ './admin.component.sass' ],
  providers: [CityService, ActivityService],
})
export class AdminComponent implements OnInit {
  activities = [];
  activitiesCount: number;
  scrolled: boolean;

  constructor(private activityService: ActivityService,
  @Inject(DOCUMENT) private document: Document) {}

  scrollToTop() {
    window.scrollTo(0, 0);
  }
  ngOnInit() {
    this.activityService.getUncheckedActivities()
    .then(result => {
      this.activities = result;
      this.activitiesCount = this.activities.length;
    });
  }
  @HostListener('window:scroll', [])
    onWindowScroll() {
      let number = this.document.body.scrollTop;
      this.scrolled = number > 700 ? true : false;
  }
}
