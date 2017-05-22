import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../../shared/organizer.service';
import { SharedIdService } from '../../../shared/shared-id.service';
import { CityService } from '../../../shared/city.service';
import { Response } from '@angular/http';
@Component({
  selector: 'my-admin-organizers-edit',
  templateUrl: './admin-organizers-edit.component.html',
  styleUrls: ['./admin-organizers-edit.component.sass'],
  providers: [OrganizerService],

})
export class AdminOrganizersEditComponent implements OnInit {
  cities = [];
  organizer: any = {};
  selectedCity: string;
constructor(private organizerService: OrganizerService,
            private sharedIdService: SharedIdService,
            private cityService: CityService) {}

ngOnInit() {
  let that = this;
  this.cityService.getAllCities().subscribe((data: Response) => this.cities = data.json());
  this.organizerService.getOrganizerById(this.sharedIdService.id)
  .then(result => this.organizer = result)
  .then(() => that.selectedCity = that.organizer.City.Name);
}
}
