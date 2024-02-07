import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { DaftarPoliklinikRoutingModule } from './daftar-poliklinik-routing.module';
import { ViewComponent } from './view/view.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DaftarPoliklinikReducers } from 'src/app/private/states/manajemen-klinik/daftar-poliklinik/daftar-poliklinik.reducers';
import { DaftarPoliklinikEffects } from 'src/app/private/states/manajemen-klinik/daftar-poliklinik/daftar-poliklinik.effects';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import {  NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    DaftarPoliklinikRoutingModule,
    ComponentsModule,
    NgxSpinnerModule,
    StoreModule.forFeature('manajemenKlinik_daftatPoliklinik', DaftarPoliklinikReducers),
    EffectsModule.forFeature([ DaftarPoliklinikEffects ]),
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModuleCustom,
    MatButtonModule
  ]
})
export class DaftarPoliklinikModule { }
