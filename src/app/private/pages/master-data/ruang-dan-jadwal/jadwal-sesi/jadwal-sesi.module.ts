import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";

import { JadwalSesiRoutingModule } from './jadwal-sesi-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JadwalSesiEffects } from 'src/app/private/states/master-data/ruang-dan-jadwal/jadwal-sesi/jadwal-sesi.effects';
import { jadwalSesiReducers } from 'src/app/private/states/master-data/ruang-dan-jadwal/jadwal-sesi/jadwal-sesi.reducers';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    JadwalSesiRoutingModule,
    ModalModuleCustom,
    ComponentsModule,
    NgxSpinnerModule,
    StoreModule.forFeature('masterData_ruangDanJadwal_jadwalSesi', jadwalSesiReducers),
    EffectsModule.forFeature([JadwalSesiEffects]),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    TimepickerModule.forRoot()
  ]
})
export class JadwalSesiModule { }
