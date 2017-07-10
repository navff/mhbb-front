import { Component, OnInit } from '@angular/core';
import { OrganizerService } from '../../shared/services/organizer.service';
import { CityService } from '../../shared/services/city.service';
import { SharedService } from './../../shared/services/shared.service';

@Component({
  selector: 'my-admin-organizers',
  templateUrl: './admin-organizers.component.html',
  styleUrls: ['./admin-organizers.component.sass'],
  providers: [OrganizerService, CityService]
})
export class AdminOrganizersComponent implements OnInit {
  cities = [];
  organizers = [];

  page = 1;
  args: any[] = [];
  checkLength: number;

  loaded = false;
  responding = false;
  constructor(
    private organizerService: OrganizerService,
    private cityService: CityService,
    private shared: SharedService) {
    this.shared.destroyFooter();
  }

  concatPage() {
    this.responding = true;
    this.page += 1;
    this.organizerService.getOrganizers(this.page.toString(10), this.args[0], this.args[1])
      .then(result => {
        this.organizers = this.organizers.concat(result);
        this.checkLength = result.length;
        this.responding = false;
      });
  }
  reset() {
    this.page = 1;
    this.organizers = [];
    this.loaded = false;
    this.checkLength = 0;
  }
  setArgument(index, value) {
    this.reset();
    this.args[index] = value;
    this.organizerService.getOrganizers(this.page.toString(10), this.args[0], this.args[1])
      .then(result => {
        this.organizers = result;
        this.checkLength = result.length;
        this.loaded = true;
      });
  }

  ngOnInit() {
    this.cityService.getCities().then(result => this.cities = result);
    this.organizerService.getOrganizers(this.page.toString(10))
      .then(result => {
        this.organizers = result;
        this.checkLength = result.length;
        this.loaded = true;
        this.shared.loadFooter();
      });
  }
}
