import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PemasukanFisioterapiRoutingModule } from './pemasukan-fisioterapi-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    PemasukanFisioterapiRoutingModule,
    ComponentsModule,
    MatButtonModule,
    BsDatepickerModule.forRoot()
  ]
})
export class PemasukanFisioterapiModule { }
