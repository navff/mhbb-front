import { AuthService } from './../shared/auth.service';
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
  userEmail: string;
  constructor(private activityService: ActivityService,
              private auth: AuthService,
  @Inject(DOCUMENT) private document: Document) {}

  scrollToTop() {
    window.scrollTo(0, 0);
  }
  exitAdmin() {
    localStorage.setItem('token' , '');
    window.location.reload();
  }
  ngOnInit() {
    this.activityService.getUncheckedActivities()
    .then(result => {
      this.activities = result;
      this.activitiesCount = this.activities.length;
    });
    if (this.auth.token) {
    this.auth.getUserByToken()
    .then(result => this.userEmail = result.Email);
    }
  }
  @HostListener('window:scroll', [])
    onWindowScroll() {
      let number = this.document.body.scrollTop;
      this.scrolled = number > 700 ? true : false;
  }
}
