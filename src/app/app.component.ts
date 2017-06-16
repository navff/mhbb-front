import { AuthService } from './shared/auth.service';
import { Component, OnInit } from '@angular/core';

import '../style/app.sass';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.setToken();
  }
}
