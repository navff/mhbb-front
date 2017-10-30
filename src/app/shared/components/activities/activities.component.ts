import { Component, Input } from '@angular/core';
import { Activity } from '../../../models/activity.model';

@Component({
  selector: 'mh-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.sass'],
})
export class ActivitiesComponent {
  @Input() activities: Activity[];

  constructor() { }
}
