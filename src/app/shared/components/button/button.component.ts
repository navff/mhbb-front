import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  @Input() loading: boolean;
  @Input() color = 'accent';
  @Input() disabled: boolean;

  constructor() { }
}
