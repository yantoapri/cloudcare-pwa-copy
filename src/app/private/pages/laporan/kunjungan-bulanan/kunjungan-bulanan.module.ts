import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { KunjunganBulananRoutingModule } from './kunjungan-bulanan-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    KunjunganBulananRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    MatButtonModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot()
  ]
})
export class KunjunganBulananModule { }
