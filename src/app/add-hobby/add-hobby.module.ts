import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/_shared.module';
import { Routes, RouterModule } from '@angular/router';

import { AddHobbyComponent } from './add-hobby.component';
import { StaticComponent } from './../shared/components/static/static.component';

const routes: Routes = [
  { path: '', component: AddHobbyComponent, data: { title: 'Добавление хобби' } },
  { path: 'success', component: StaticComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
  ],
  declarations: [
    AddHobbyComponent
  ]
})
export class AddHobbyModule { }
