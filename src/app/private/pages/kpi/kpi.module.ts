import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { kpiComponent } from './kpi.component';
import {kpiRoutingModule} from './kpi.route.module'
import {  NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { detailKPIComponent } from './detail/detailKPI.component';

@NgModule({
  declarations: [
    kpiComponent,
    detailKPIComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ModalModuleCustom,
    FormsModule,
    ReactiveFormsModule,
    kpiRoutingModule,
    NgxSpinnerModule,
    MatButtonModule,
    DataTablesModule,
    BsDatepickerModule,
    ComponentsModule
  ]
})
export class kpiModule { }
