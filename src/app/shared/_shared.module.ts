import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule,
  MdIconModule, MdProgressSpinnerModule, MdAutocompleteModule, MdProgressBarModule
} from '@angular/material';
import { OnlyNumberDirective } from './_only-number.directive';
import { DatePipe } from './_date.pipe';
import { DetailsComponent } from './components/details/details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { ButtonComponent } from './components/button/button.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';

@NgModule({
  imports: [
    HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule, MdAutocompleteModule,
    MdProgressBarModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    OnlyNumberDirective, DatePipe, DetailsComponent, UserEditComponent, FooterComponent, ActivitiesComponent, ButtonComponent,
    ProgressBarComponent
  ],
  exports: [
    HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule, MdAutocompleteModule,
    MdProgressBarModule,
    OnlyNumberDirective, DatePipe, DetailsComponent, UserEditComponent, FooterComponent, ActivitiesComponent, ButtonComponent,
    ProgressBarComponent
  ]
})
export class SharedModule { }
