import { Component, OnInit } from '@angular/core';

import { ListService } from '../../shared/services/list.service';
import { OrganizerService } from '../../shared/services/organizer.service';
import { ActivityService } from '../../shared/services/activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from '../../models/activity.model';
import { TempFile } from '../../models/tempfile.model';
import { Organizer } from './../../models/organizer.model';
import { Picture } from './../../models/picture.model';

@Component({
  templateUrl: './act-edit.component.html',
  providers: [ActivityService, OrganizerService],
  styleUrls: ['./act-edit.component.sass']
})
export class ActEditComponent implements OnInit {
  interests = [];
  cities = [];
  organizers = [];

  pics: Picture[] = [];
  act = new Activity();
  actId: string;
  organizer = new Organizer();

  responding: string;
  isOrganizerChosen: boolean;

  tempfileId = [];
  picsToDelete: boolean[] = [];
  picId: string[] = [];

  constructor(
    private listService: ListService,
    private organizerService: OrganizerService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router
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
  setOrganizer(id) {
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
      .subscribe(res => {
        this.pics[id] = new Picture(res);
        this.tempfileId[id] = res.Id;
      });
  }
  removeImage(index) {
    if (this.tempfileId[index]) {
      this.activityService.removeTempFile(this.pics[index].Id)
        .subscribe(() => this.pics[index].Url = '');
    } else {
      this.picsToDelete[index] = true;
      this.pics[index].Url = null;
    }
  }

  submitForm() {
    this.responding = 'saving';
    this.act.OrganizerId = this.isOrganizerChosen ? this.act.OrganizerId : null;
    this.act.Organizer = this.isOrganizerChosen ? null : this.organizer;

    let loop = (i) => {
      if (i < 4) {
        this.picsToDelete[i] ? this.activityService.removePicture(this.picId[i])
          .subscribe(() => loop(++i)) : loop(++i);
      } else {
        this.activityService.update(this.act, this.actId)
          .subscribe(() => this.router.navigate(['/admin/act', this.actId]));
      }
    };
    loop(0);
  }
  remove() {
    this.responding = 'deleting';
    this.activityService.remove(this.actId)
      .subscribe(() => this.router.navigate(['/admin']));
  }
  ngOnInit() {
    this.listService.interests$.subscribe(data => this.interests = data);
    this.listService.cities$.subscribe(data => this.cities = data);
    this.route.params.switchMap(params => this.activityService.take(params.id))
      .subscribe(data => {
        this.act = new Activity(data);
        this.isOrganizerChosen = true;
        this.organizer = new Organizer(data.Organizer);
        this.actId = data.Id;
        data.Pictures.forEach((pic, i) => {
          if (i < 4) {
            this.picId[i] = pic.Id;
            this.pics[i] = new Picture(pic);
          }
        });
        this.organizer = new Organizer(data.Organizer);
        this.organizerService.list({ page: '1', word: this.organizer.Name })
          .subscribe(res => this.organizers = res);
      });
  }
}
