import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { DataPenjualanRoutingModule } from './data-penjualan-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DetailComponent } from './detail/detail.component';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    ViewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    DataPenjualanRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    ModalModuleCustom
  ]
})
export class DataPenjualanModule { }
