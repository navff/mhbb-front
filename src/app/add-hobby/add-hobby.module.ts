import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { SharedModule } from '../shared/_shared.module';
import {  } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AddHobbyComponent } from './add-hobby.component';
import { AddHobbySuccessComponent } from './add-hobby-success/add-hobby-success.component';

const routes: Routes = [
  { path: '', component: AddHobbyComponent },
  { path: 'success', component: AddHobbySuccessComponent }
];

@NgModule({
  imports:      [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule
   ],
  declarations: [
    AddHobbyComponent, AddHobbySuccessComponent
   ]
})
export class AddHobbyModule {}
