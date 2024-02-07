import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { jadwalStaffComponent } from './jadwal-staff.component';
import {jadwalStaffRoutingModule} from './jadwal-staff.route.module'
import {  NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FullCalendarModule } from "@fullcalendar/angular";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { addJadwal } from './addJadwal/addJadwal.component';
import { editJadwal } from './editJadwal/editJadwal.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
FullCalendarModule.registerPlugins([
	dayGridPlugin,
	timeGridPlugin,
	listPlugin,
	interactionPlugin,
]);
@NgModule({
  declarations: [
    jadwalStaffComponent,
    addJadwal,
    editJadwal
  ],
  imports: [
    TimepickerModule,
    CommonModule,
    NgSelectModule,
    FullCalendarModule,
    ModalModuleCustom,
    FormsModule,
    ReactiveFormsModule,
    jadwalStaffRoutingModule,
    NgxSpinnerModule,
    MatButtonModule,
    DataTablesModule,
    BsDatepickerModule,
    ComponentsModule
  ]
})
export class jadwalStaffModule { }
