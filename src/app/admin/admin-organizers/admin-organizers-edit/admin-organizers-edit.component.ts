import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../../shared/organizer.service';
import { CityService } from '../../../shared/city.service';

export class OrganizerPutBody {
    Name: string;
    CityId: any;
    Sobriety: any;
}

@Component({
  selector: 'my-admin-organizers-edit',
  templateUrl: './admin-organizers-edit.component.html',
  styleUrls: ['./admin-organizers-edit.component.sass'],
  providers: [OrganizerService, CityService],

})
export class AdminOrganizersEditComponent implements OnInit {
  cities = [];
  organizerName: string;
  organizerCityName: string;
  organizerSobriety: any;
  organizer: any = {};

  organizerPutBody: OrganizerPutBody = {
    Name: this.organizerName,
    CityId: 1,
    Sobriety: this.organizerSobriety
  };
  organizerId = localStorage.getItem('organizerId');
constructor(private organizerService: OrganizerService, private cityService: CityService) {}

  putOrganizer() {
    this.organizerService.putOrganizer(this.organizerId, this.organizerPutBody)
    .subscribe((response) => console.log(response));
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
