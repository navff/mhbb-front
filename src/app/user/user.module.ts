import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { MainComponent } from './main/main.component';
import { EnterComponent } from './enter/enter.component';
import { EnterSuccessComponent } from './enter/enter-success/enter-success.component';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationSuccessComponent } from './reservation/reservation-success/reservation-success.component';

import { SharedModule } from '../shared/_shared.module';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserRoutingModule
  ],
  declarations: [
    UserComponent,
    MainComponent,
    EnterComponent, EnterSuccessComponent,
    ReservationComponent, ReservationSuccessComponent
  ]
})
export class UserModule { }
