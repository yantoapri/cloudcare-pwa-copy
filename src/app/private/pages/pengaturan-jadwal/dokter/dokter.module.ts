import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DokterRoutingModule } from './dokter-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JadwalDokterEffects } from 'src/app/private/states/pengaturan-jadwal/jadwal-dokter/jadwal-dokter.effects';
import { jadwalDokterReducers } from 'src/app/private/states/pengaturan-jadwal/jadwal-dokter/jadwal-dokter.reducers';
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgxSpinnerModule } from "ngx-spinner";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { MatButtonModule } from "@angular/material/button";
FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
]);


@NgModule({
  declarations: [
    ViewComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    DokterRoutingModule,
    ComponentsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    DataTablesModule,
    ModalModuleCustom,
    MatButtonModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    StoreModule.forFeature('pengaturanJadwal_jadwalDokter', jadwalDokterReducers),
    EffectsModule.forFeature([JadwalDokterEffects])
  ]
})
export class DokterModule { }
