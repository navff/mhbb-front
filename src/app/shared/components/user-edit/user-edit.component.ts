import { Component, OnInit } from '@angular/core';
import { ActivityService } from './../../services/activity.service';
import { TempFile } from '../../../models/tempfile.model';
import { ListService } from '../../services/list.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';

@Component({
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass'],
  providers: [UserService, ActivityService]
})
export class UserEditComponent implements OnInit {
  adminPage: boolean;
  cities = [];
  roleValue: boolean;
  user = new User();
  email: string;
  responding: boolean;

  pic = {
    url: '',
    beingRemoved: false,
    id: null
  };

  formId: string;

  constructor(
    private userService: UserService,
    private listService: ListService,
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute) {
  }

  back() {
    history.back();
  }

  removePicture() {
    this.pic.beingRemoved = true;
    this.pic.url = '';
  }

  createTempfile(file: any) {
    this.formId = Date.now().toString(10);
    this.activityService.createTempFile(new TempFile(this.formId, file.name, file.data, true))
      .subscribe(res => {
        this.pic.url = res.Url;
        this.pic.id = res.Id;
      });
  }
  save() {
    this.responding = true;

    let body = new User(
      this.user,
      this.roleValue,
      this.formId,
    );
    if (this.pic.beingRemoved) {
      this.formId ?
      this.activityService.removeTempFile(this.pic.id).subscribe() :
      this.activityService.removePicture(this.pic.id).subscribe();
    }
    this.userService.update(this.email || this.user.Email, body)
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }

  isAdmin(user): boolean {
    return user.RoleName === 'PortalAdmin' || user.RoleName === 'PortalManager';
  }

  ngOnInit() {
    this.listService.cities$.subscribe(data => this.cities = data);
    this.route.queryParams
      .switchMap((data) => {
        if (data.email) {
          this.adminPage = true;
          this.email = data.email;
        }
        return this.adminPage ?
          this.userService.take(this.email) :
          this.userService.takeCurrent();
      })
      .subscribe((user) => {
        this.user = user;
        if (this.isAdmin(user)) {
          this.roleValue = true;
        }
        if (!this.adminPage && user.Picture) {
          this.pic.id = user.Picture.Id;
          this.pic.url = user.Picture.Url;
        }
      });
  }
}
