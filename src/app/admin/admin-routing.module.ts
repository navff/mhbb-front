import { StaticComponent } from './../shared/components/static/static.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { ActEditComponent } from './admin-main/act-edit/act-edit.component';
import { OrganizersComponent } from './organizers/organizers.component';
import { OrganizerEditComponent } from './organizers/organizer-edit/organizer-edit.component';
import { UsersComponent } from './users/users.component';
import { ReviewsComponent } from './reviews/reviews.component';

import { DetailsComponent } from './../shared/components/details/details.component';
import { UserEditComponent } from './../shared/components/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: AdminMainComponent },
      { path: 'edit', component: UserEditComponent },
      { path: 'act/:id', component: DetailsComponent },
      { path: 'act/:id/edit', component: ActEditComponent },
      { path: 'organizers', component: OrganizersComponent },
      { path: 'organizers/edit/:id', component: OrganizerEditComponent },
      { path: 'organizers/add', component: OrganizerEditComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/edit', component: UserEditComponent },
      { path: 'reviews', component: ReviewsComponent },

      { path: 'addhobby', loadChildren: '../add-hobby/add-hobby.module#AddHobbyModule' },
      { path: '**', component: StaticComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
