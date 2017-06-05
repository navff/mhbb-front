import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/organizer.service';
import { CityService } from '../../shared/city.service';

@Component({
  selector: 'my-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService, CityService],
})
export class AdminOrganizersComponent implements OnInit {
  cities = [];
  organizers = [];
  page = 1;
  args: any[] = [];
constructor(private organizerService: OrganizerService, private cityService: CityService) {}
  setArgument(index, value) {
      this.args[index] = value;
      this.organizerService.getOrganizers(this.page, this.args[0], this.args[1])
      .then(result => this.organizers = result);
    }
  saveOrganizerId(id) {
    localStorage.setItem('organizerId', id);
  }
ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.organizerService.getOrganizers(this.page)
    .then(result => this.organizers = result);
    };
}
