import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { RouterModule }        from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdProgressSpinnerModule } from '@angular/material';
import { OnlyNumberDirective } from './_only-number.directive';
import { DatePipe } from './_date.pipe';
import { DetailsComponent } from './../details/details.component';
import { UserEditComponent } from './../user-edit/user-edit.component';

@NgModule({
  imports:      [ HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule,
    RouterModule,
    CommonModule
  ],
  declarations: [ OnlyNumberDirective, DatePipe, DetailsComponent, UserEditComponent ],
  exports:      [
    HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule,
    OnlyNumberDirective, DatePipe, DetailsComponent, UserEditComponent
  ]
})
export class SharedModule { }
