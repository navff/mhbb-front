import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent {
  userEmail: string;
  footerLoaded: boolean;
  sub: Subscription;
  constructor(private shared: SharedService) {
    this.sub = shared.footerLoaded.subscribe(result => this.footerLoaded = result);
    this.shared.loadFooter();
  }
}
