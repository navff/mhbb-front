import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/user.service';
import { CityService } from '../../../shared/city.service';
import { Response } from '@angular/http';

@Component({
  selector: 'my-admin-users-edit',
  templateUrl: './admin-users-edit.component.html',
  styleUrls: ['./admin-users-edit.component.sass'],
  providers: [ UserService, CityService ]
})
export class AdminUsersEditComponent implements OnInit {
  cities = [];
  selectedCity: string;
  user: any = {};
  userEmail = localStorage.getItem('userEmail');
  constructor(private organizerService: UserService, private cityService: CityService) {}
ngOnInit() {
  let that = this;
  this.cityService.getCities().subscribe((data: Response) => this.cities = data.json());
  this.organizerService.getUserByEmail(this.userEmail)
  .then(result => this.user = result)
  .then(() => that.selectedCity = that.user.CityName);

}
}
