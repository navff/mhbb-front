import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { RouterModule }        from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule } from '@angular/material';
import { HeaderComponent }     from './header/header.component';
import { OnlyNumberDirective } from './_only-number.directive';

@NgModule({
  imports:      [ HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule,
    RouterModule,
    CommonModule
  ],
  declarations: [ HeaderComponent, OnlyNumberDirective ],
  exports:      [
    HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule,
    HeaderComponent, OnlyNumberDirective
  ]
})
export class SharedModule { }
