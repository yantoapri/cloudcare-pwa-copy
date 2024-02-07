import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { KunjunganKlinikRoutingModule } from './kunjungan-klinik-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { RekamMedisComponent } from './rekam-medis/rekam-medis.component';
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent,
    RekamMedisComponent
  ],
  imports: [
    CommonModule,
    KunjunganKlinikRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    NgxSpinnerModule,
    NgSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ]
})
export class KunjunganKlinikModule { }
