import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import {StaffRoutingModule} from './staff.route.module'
import {  NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { detailStaffComponent } from './detail/detailStaff.component';

@NgModule({
  declarations: [
    StaffComponent,
    detailStaffComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    ModalModuleCustom,
    FormsModule,
    ReactiveFormsModule,
    StaffRoutingModule,
    NgxSpinnerModule,
    MatButtonModule,
    DataTablesModule,
    BsDatepickerModule,
    ComponentsModule
  ]
})
export class StaffModule { }
