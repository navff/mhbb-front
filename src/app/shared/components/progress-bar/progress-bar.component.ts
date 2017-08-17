import { Component, Input } from '@angular/core';
@Component({
  selector: 'mh-progress',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.sass'],
})
export class ProgressBarComponent {
  @Input() loading: boolean;
  @Input() color = 'primary';
  constructor() { }
}
