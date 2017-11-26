import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule,
  MdIconModule, MdProgressSpinnerModule, MdAutocompleteModule, MdProgressBarModule,
  MdTooltipModule
} from '@angular/material';
import { NumberDirective } from './_number.directive';
import { DatePipe } from './_date.pipe';
import { DetailsComponent } from './components/details/details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FooterComponent } from './components/footer/footer.component';
import { ActivitiesComponent } from './components/activities/activities.component';
import { MainComponent } from './components/main/main.component';
import { ButtonComponent } from './components/button/button.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { PicturesComponent } from './components/pictures/pictures.component';
import { UploadComponent } from './components/upload/upload.component';
import { StaticComponent } from './components/static/static.component';

const Modules = [HttpModule, FormsModule, ReactiveFormsModule,
  MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule,
  MdAutocompleteModule, MdProgressBarModule, MdTooltipModule,
  RouterModule,
  CommonModule];

const Components = [NumberDirective, DatePipe, DetailsComponent, UserEditComponent, FooterComponent,
  MainComponent, ActivitiesComponent, ButtonComponent, ProgressBarComponent,
  PicturesComponent, UploadComponent, StaticComponent];

@NgModule({
  imports: [Modules],
  declarations: [Components],
  exports: [Modules, Components]
})
export class SharedModule { }
