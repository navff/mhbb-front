import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/organizer.service';
import { CityService } from '../../shared/city.service';

@Component({
  selector: 'my-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService, CityService]
})
export class AdminOrganizersComponent implements OnInit {
  cities = [];
  organizers = [];
  reserveContent = [1];
  page = 1;
  args: any[] = [];

  loaded = false;
  responding = false;

  constructor(private organizerService: OrganizerService, private cityService: CityService) {}

  concatPage() {
    this.responding = true;
    this.page += 1;
    let reservePage = this.page + 1;
    this.organizerService.getOrganizers(this.page.toString(10), this.args[0], this.args[1])
    .then(result => this.organizers = this.organizers.concat(result))
    .then(() => {
      this.organizerService.getOrganizers(reservePage.toString(10), this.args[0], this.args[1])
      .then(result => {this.reserveContent = result;
        this.responding = false; });
    });
  }
  reset() {
    this.page = 1;
    this.reserveContent[0] = 1;
    this.organizers = [];
    this.loaded = false;
  }
  setArgument(index, value) {

      this.reset();
      this.args[index] = value;
      this.organizerService.getOrganizers(this.page.toString(10), this.args[0], this.args[1])
      .then(result => {this.organizers = result;
        this.loaded = true; });
    }
  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.organizerService.getOrganizers(this.page.toString(10))
    .then(result => {this.organizers = result;
      this.loaded = true; });
}}
