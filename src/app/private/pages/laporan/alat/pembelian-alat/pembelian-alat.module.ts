import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { PembelianAlatRoutingModule } from './pembelian-alat-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    PembelianAlatRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    MatButtonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class PembelianAlatModule { }
