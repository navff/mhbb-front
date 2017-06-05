import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../../shared/organizer.service';
import { CityService } from '../../../shared/city.service';

export class OrganizerPutBody {
    Name: string;
    CityId: any;
    Sobriety: boolean;
    constructor(name: string, cityid: number, sobriety: boolean) {
      this.Name = name;
      this.CityId = cityid;
      this.Sobriety = sobriety;
}
}

@Component({
  selector: 'my-admin-organizers-edit',
  templateUrl: './admin-organizers-edit.component.html',
  styleUrls: ['./admin-organizers-edit.component.sass'],
  providers: [OrganizerService, CityService],

})
export class AdminOrganizersEditComponent implements OnInit {
  cities = [];
  organizerCityName: string;
  organizerName: string;
  organizerSobriety: boolean;
  cityId: number;
  organizer: any = {};
  organizerId = localStorage.getItem('organizerId');
constructor(private organizerService: OrganizerService, private cityService: CityService) {}

  putOrganizer() {
    let body = new OrganizerPutBody(this.organizerName, this.cityId, this.organizerSobriety);
    this.organizerService.putOrganizer(this.organizerId, body)
    .then(result => this.organizer = result);
  }
  saveId(id) {
    this.cityId = id;
  }
ngOnInit() {
  let that = this;
  this.cityService.getCities().then(result => this.cities = result);
  this.organizerService.getOrganizerById(this.organizerId)
  .then(result => this.organizer = result)
  .then(() => that.organizerCityName = that.organizer.City.Name)
  .then(() => that.organizerName = that.organizer.Name)
  .then(() => that.organizerSobriety = that.organizer.Sobriety);
}
}
