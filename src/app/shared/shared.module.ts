import { NgModule }            from '@angular/core';
import { FormsModule }         from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule } from '@angular/material';

import { HeaderComponent }     from './header/header.component';
@NgModule({
  imports:      [ HttpModule, FormsModule,
      MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule,
      RouterModule
 ],
  declarations: [ HeaderComponent ],
  exports:      [ HttpModule, FormsModule,
      MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule,
      HeaderComponent]
})
export class SharedModule { }
