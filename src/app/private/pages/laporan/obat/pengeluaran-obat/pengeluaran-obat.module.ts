import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { PengeluaranObatRoutingModule } from './pengeluaran-obat-routing.module';
import { ViewComponent } from './view/view.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from "angular-datatables";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    NgxSpinnerModule,
    MatButtonModule,
    PengeluaranObatRoutingModule,
    FormsModule, ReactiveFormsModule ,
    ComponentsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class PengeluaranObatModule { }
