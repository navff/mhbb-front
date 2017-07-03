import { Component } from '@angular/core';
import { FooterService } from '../footer.service';

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
  constructor(private footer: FooterService) {
                this.sub = footer.footerLoaded.subscribe(result => this.footerLoaded = result);
                this.footer.load();
  }
}
