import { NgModule }     from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent }       from './admin.component';
import { AdminMainComponent }     from './admin-main/admin-main.component';
import { AdminOrganizersComponent }     from './admin-organizers/admin-organizers.component';
import { AdminOrganizersEditComponent }     from './admin-organizers/admin-organizers-edit/admin-organizers-edit.component';
import { AdminUsersComponent }     from './admin-users/admin-users.component';
import { AdminUsersEditComponent }     from './admin-users/admin-users-edit/admin-users-edit.component';
import { AdminReviewsComponent }     from './admin-reviews/admin-reviews.component';

import { DetailsComponent } from './../details/details.component';
import { UserEditComponent } from './../user-edit/user-edit.component';

const routes: Routes = [
  { path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full'},
      { path: 'main',   component: AdminMainComponent },
      { path: 'edit',   component: UserEditComponent },
      { path: 'main/act/:id',   component: DetailsComponent },
      { path: 'organizers', component: AdminOrganizersComponent },
      { path: 'organizers/edit/:id', component: AdminOrganizersEditComponent },
      { path: 'users', component: AdminUsersComponent },
      { path: 'users/edit', component: AdminUsersEditComponent },
      { path: 'reviews', component: AdminReviewsComponent },

      { path: 'addhobby', loadChildren: '../add-hobby/add-hobby.module#AddHobbyModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
