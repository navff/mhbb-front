import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { RouterModule }        from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdProgressSpinnerModule } from '@angular/material';
import { HeaderComponent }     from './header/header.component';
import { OnlyNumberDirective } from './_only-number.directive';
import { DatePipe } from './_date.pipe';

@NgModule({
  imports:      [ HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule,
    RouterModule,
    CommonModule
  ],
  declarations: [ HeaderComponent, OnlyNumberDirective, DatePipe ],
  exports:      [
    HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule,
    HeaderComponent, OnlyNumberDirective, DatePipe
  ]
})
export class SharedModule { }
