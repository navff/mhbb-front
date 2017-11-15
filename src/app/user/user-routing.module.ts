import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ReservationSuccessComponent } from './reservation/reservation-success/reservation-success.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EnterSuccessComponent } from './enter/enter-success/enter-success.component';
import { EnterComponent } from './enter/enter.component';
import { MainComponent } from './main/main.component';

import { StaticComponent } from './../shared/components/static/static.component';
import { DetailsComponent } from './../shared/components/details/details.component';
import { UserEditComponent } from './../shared/components/user-edit/user-edit.component';
import { AuthGuard } from './../shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'enter', component: EnterComponent },
      { path: 'enter/success', component: EnterSuccessComponent },
      { path: 'act/:id', component: DetailsComponent },
      { path: 'act/:id/reservation', component: ReservationComponent },
      { path: 'act/:id/reservation/success', component: ReservationSuccessComponent },
      { path: 'user', component: UserEditComponent , canActivate: [AuthGuard]},
      { path: 'about', component: StaticComponent },
      { path: 'sponsor', component: StaticComponent },
      { path: 'member', component: StaticComponent },

      { path: 'addhobby', loadChildren: '../add-hobby/add-hobby.module#AddHobbyModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
