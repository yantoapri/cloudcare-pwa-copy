import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { DaftarRuangRoutingModule } from './daftar-ruang-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { DaftarRuangEffects } from 'src/app/private/states/master-data/ruang-dan-jadwal/daftar-ruang/daftar-ruang.effects';
import { daftarRuangReducers } from 'src/app/private/states/master-data/ruang-dan-jadwal/daftar-ruang/daftar-ruang.reducers';
@NgModule({
  declarations: [
    ViewComponent,
    EditComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    DaftarRuangRoutingModule,
    ReactiveFormsModule,
    ComponentsModule,
    DataTablesModule,
    NgxSpinnerModule,
    FormsModule,
    MatButtonModule,
    StoreModule.forFeature('masterData_ruangDanJadwal_daftarRuang', daftarRuangReducers),
    EffectsModule.forFeature([DaftarRuangEffects]),
    ModalModuleCustom

  ]
})
export class DaftarRuangModule { }
