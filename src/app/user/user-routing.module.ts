import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { MainComponent } from './../shared/components/main/main.component';
import { ReservationSuccessComponent } from './reservation/reservation-success/reservation-success.component';
import { ReservationComponent } from './reservation/reservation.component';
import { EnterComponent } from './enter/enter.component';

import { StaticComponent } from './../shared/components/static/static.component';
import { DetailsComponent } from './../shared/components/details/details.component';
import { UserEditComponent } from './../shared/components/user-edit/user-edit.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: MainComponent },
      { path: 'enter', component: EnterComponent, data: { title: 'Вход и Регистрация' } },
      { path: 'enter/success', component: StaticComponent, data: { title: 'Успех!' } },
      { path: 'act/:id', component: DetailsComponent },
      { path: 'act/:id/reservation', component: ReservationComponent, data: { title: 'Запись' } },
      { path: 'act/:id/reservation/success', component: ReservationSuccessComponent, data: { title: 'Успех!' } },
      { path: 'user', component: UserEditComponent, data: { title: 'Мой профиль' } },
      { path: 'about', component: StaticComponent, data: { title: 'О проекте' } },
      { path: 'sponsor', component: StaticComponent, data: { title: 'Стать спонсором' } },
      { path: 'member', component: StaticComponent, data: { title: 'Стать представителем' } },

      { path: 'addhobby', loadChildren: '../add-hobby/add-hobby.module#AddHobbyModule' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
