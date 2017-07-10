import { CommonModule }        from '@angular/common';
import { NgModule }            from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule }          from '@angular/http';
import { RouterModule }        from '@angular/router';
import { MdButtonModule, MdCheckboxModule, MdInputModule, MdSelectModule,
         MdIconModule, MdProgressSpinnerModule, MdAutocompleteModule } from '@angular/material';
import { OnlyNumberDirective } from './_only-number.directive';
import { DatePipe } from './_date.pipe';
import { DetailsComponent } from './components/details/details.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports:      [ HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule, MdAutocompleteModule,
    RouterModule,
    CommonModule
  ],
  declarations: [ OnlyNumberDirective, DatePipe, DetailsComponent, UserEditComponent, FooterComponent ],
  exports:      [
    HttpModule, FormsModule, ReactiveFormsModule,
    MdCheckboxModule, MdInputModule, MdSelectModule, MdIconModule, MdButtonModule, MdProgressSpinnerModule, MdAutocompleteModule,
    OnlyNumberDirective, DatePipe, DetailsComponent, UserEditComponent, FooterComponent
  ]
})
export class SharedModule { }
