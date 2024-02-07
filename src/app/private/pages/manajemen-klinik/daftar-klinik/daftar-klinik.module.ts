import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { DaftarKlinikRoutingModule } from './daftar-klinik-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DaftarKlinikEffects } from 'src/app/private/states/manajemen-klinik/daftar-klinik/daftar-klinik.effects';
import { DaftarKlinikReducers } from 'src/app/private/states/manajemen-klinik/daftar-klinik/daftar-klinik.reducers';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { NgSelectModule } from '@ng-select/ng-select';
import {   NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    DaftarKlinikRoutingModule,
    NgSelectModule,
    StoreModule.forFeature('manajemenKlinik_daftarKlinik', DaftarKlinikReducers),
    EffectsModule.forFeature([DaftarKlinikEffects]),
    ComponentsModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModuleCustom,
    MatButtonModule
  ]
})
export class DaftarKlinikModule { }
