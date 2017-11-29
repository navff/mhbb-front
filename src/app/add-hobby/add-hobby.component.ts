import { Component, OnInit } from '@angular/core';
import { ListService } from './../shared/services/list.service';
import { ActivityService } from '../shared/services/activity.service';
import { OrganizerService } from '../shared/services/organizer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TempFile } from './../models/tempfile.model';
import { Activity } from '../models/activity.model';
import { Organizer } from './../models/organizer.model';
import { Picture } from './../models/picture.model';

@Component({
  templateUrl: './add-hobby.component.html',
  providers: [ActivityService, OrganizerService],
  styleUrls: ['./add-hobby.component.sass']
})
export class AddHobbyComponent implements OnInit {
  interests = [];
  cities = [];
  organizers: Organizer[];

  pics: Picture[] = [];
  act = new Activity();
  organizer = new Organizer();

  responding: boolean;
  isOrganizerChosen: boolean;

  constructor(
    private listService: ListService,
    private organizerService: OrganizerService,
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  filterOrganizers(word) {
    if (this.isOrganizerChosen) {
      this.isOrganizerChosen = false;
      this.organizer.CityId = '';
      this.organizer.Sobriety = false;
    }
    this.organizerService.list({ page: '1', word })
      .subscribe(data => this.organizers = data);
  }
  setOrganizer(id: string) {
    this.isOrganizerChosen = true;
    document.getElementById('organizerInput').blur();
    this.organizerService.take(id).subscribe(data => {
      this.act.OrganizerId = id;
      this.organizer.CityId = data.CityId;
      this.organizer.Sobriety = data.Sobriety;
    });
  }
  addImage(file, id) {
    this.act.FormId = this.act.FormId || Date.now().toString(10);
    let isMain = id === 0 ? true : false;
    this.activityService.createTempFile(new TempFile(this.act.FormId, file.name, file.data, isMain))
      .subscribe(res => this.pics[id] = new Picture(res));
  }
  removeImage(id) {
    this.activityService.removeTempFile(this.pics[id].Id)
      .subscribe(() => this.pics[id].Url = '');
  }
  submit() {
    this.responding = true;
    this.act.OrganizerId = this.isOrganizerChosen ? this.act.OrganizerId : null;
    this.act.Organizer = this.isOrganizerChosen ? null : this.organizer;
    this.activityService.create(this.act)
      .subscribe(() => this.router.navigate(['success'], { relativeTo: this.route }));
  }
  back() {
    history.back();
  }
  ngOnInit() {
    this.listService.interests$.subscribe(data => this.interests = data);
    this.listService.cities$.subscribe(data => this.cities = data);
  }
}
