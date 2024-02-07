import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gajiStaffComponent } from './gaji-staff.component';
import { detailGajiStaffComponent } from './detailGaji/detail-gaji.component';

import {gajiStaffRouteModule} from './gaji-staff.route.module'
import {  NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';

@NgModule({
  declarations: [
    gajiStaffComponent,
    detailGajiStaffComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ModalModuleCustom,
    FormsModule,
    ReactiveFormsModule,
    gajiStaffRouteModule,
    NgxSpinnerModule,
    MatButtonModule,
    DataTablesModule,
    BsDatepickerModule,
    ComponentsModule
  ]
})
export class gajiStaffModule { }
