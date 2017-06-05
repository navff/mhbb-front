import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { VoicesService } from '../shared/voices.service';

@Component({
  selector: 'my-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass'],
  providers: [ActivityService, VoicesService],
})
export class DetailsComponent implements OnInit {
  activity: any = {};
  activityId = localStorage.getItem('activityId');
  organizer: string;
  voteAmount: number;

  constructor(private activityService: ActivityService, private voicesService: VoicesService) {}

  votePositive() {
    this.voicesService.votePositive(this.activityId)
    .then(result => this.voteAmount = result);
  }
  voteNegative() {
    this.voicesService.voteNegative(this.activityId)
    .then(result => this.voteAmount = result);
  }
  ngOnInit() {
    let that = this;
    this.activityService.getActivity(this.activityId)
    .then(result => this.activity = result)
    .then(() => that.organizer = that.activity.Organizer.Name)
    .then(() => that.voteAmount = that.activity.Voices);

  }
}
