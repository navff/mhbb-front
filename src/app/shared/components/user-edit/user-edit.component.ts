import { Component, OnInit } from '@angular/core';
import { ActivityService } from './../../services/activity.service';
import { TempFile } from '../../../models/tempfile.model';
import { ListService } from '../../services/list.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../../models/user.model';
import { Picture } from './../../../models/picture.model';

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
  responding: string;

  pic = new Picture();
  picsToRemove: Array<{ id: string; type: string }> = [];

  constructor(
    private userService: UserService,
    private listService: ListService,
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  back() {
    history.back();
  }

  removePicture() {
    this.picsToRemove.push({
      id: this.pic.Id,
      type: this.user.FormId ? 'tempfile' : 'picture'
    });
    this.pic.Url = '';
  }

  createTempfile(file: any) {
    this.user.FormId = Date.now().toString(10);
    this.activityService
      .createTempFile(new TempFile(this.user.FormId, file.name, file.data, true))
      .subscribe(res => (this.pic = res));
  }
  save() {
    this.responding = 'saving';
    this.user.Role = this.roleValue ? 1 : 2;
    if (this.picsToRemove.length > 0) {
      this.picsToRemove.forEach(
        p =>
          p.type === 'picture'
            ? this.activityService.removePicture(p.id).subscribe()
            : this.activityService.removeTempFile(p.id).subscribe()
      );
    }
    this.userService.update(this.email, this.user).subscribe(() => {
      this.router.navigate(['../'], { relativeTo: this.route });
      if (!this.adminPage && this.email !== this.user.Email) {
        location.reload();
      }
    });
  }

  remove() {
    this.responding = 'removing';
    this.userService.remove(this.email)
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
  }

  isAdmin(user): boolean {
    return user.RoleName === 'PortalAdmin' || user.RoleName === 'PortalManager';
  }

  ngOnInit() {
    this.listService.cities$.subscribe(data => (this.cities = data));
    this.route.queryParams
      .switchMap(data => {
        if (data.email) {
          this.adminPage = true;
        }
        return this.adminPage
          ? this.userService.take(data.email)
          : this.userService.takeCurrent();
      })
      .subscribe(user => {
        this.user = new User(user);
        this.email = user.Email;
        if (this.isAdmin(user)) {
          this.roleValue = true;
        }
        if (!this.adminPage && user.Picture) {
          this.pic = user.Picture;
        }
      });
  }
}
