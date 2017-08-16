import { Component, OnInit, Input } from '@angular/core';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'mh-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass'],
})
export class ActivitiesComponent implements OnInit {
  @Input() activities: Activity[];
  @Input() loading: boolean;

  constructor() { }

  ngOnInit() {
  }
}
