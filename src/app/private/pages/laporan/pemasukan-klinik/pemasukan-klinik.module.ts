import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PemasukanKlinikRoutingModule } from './pemasukan-klinik-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from "angular-datatables";
import { DetailComponent } from './detail/detail.component';
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    PemasukanKlinikRoutingModule,
    ComponentsModule,
    MatButtonModule,
    NgxSpinnerModule,
    FormsModule, ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot()
  ]
})
export class PemasukanKlinikModule { }
