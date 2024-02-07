import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { PendaftaranAntreanRoutingModule } from './pendaftaran-antrean-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { MatButtonModule } from "@angular/material/button";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    PendaftaranAntreanRoutingModule,
    ComponentsModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    DataTablesModule,
    MatButtonModule,
    ModalModuleCustom
  ]
})
export class PendaftaranAntreanModule { }
