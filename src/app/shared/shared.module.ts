import { NgModule }            from '@angular/core';
import { FormsModule }         from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { RouterModule } from '@angular/router';

import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule } from '@angular/material';

import { HeaderComponent }     from './header/header.component';
import { FilterPipe } from './my-filter.pipe';

@NgModule({
  imports:      [ HttpModule, FormsModule,
      MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule,
      RouterModule
    ],
  declarations: [ HeaderComponent,
  FilterPipe
    ],
  exports:      [ HttpModule, FormsModule,
      MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule,
      HeaderComponent,
      FilterPipe
    ]
})
export class SharedModule { }
