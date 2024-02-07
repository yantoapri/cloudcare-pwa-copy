import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JadwalLiburRoutingModule } from './jadwal-libur-routing.module';
import { ViewComponent } from './view/view.component';
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
        FormsModule,
        ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { JadwalLiburEffects } from 'src/app/private/states/master-data/ruang-dan-jadwal/jadwal-libur/jadwal-libur.effects';
import { jadwalLiburReducers } from 'src/app/private/states/master-data/ruang-dan-jadwal/jadwal-libur/jadwal-libur.reducers';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    ViewComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    JadwalLiburRoutingModule,
    ModalModuleCustom,
    ComponentsModule,
    NgxSpinnerModule,
    StoreModule.forFeature('masterData_ruangDanJadwal_jadwalLibur', jadwalLiburReducers),
    EffectsModule.forFeature([JadwalLiburEffects]),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    MatButtonModule
  ]
})
export class JadwalLiburModule { }
