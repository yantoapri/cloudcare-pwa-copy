import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { UmumRoutingModule } from './umum-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { RiwayatPeriksaComponent } from './riwayat-periksa/riwayat-periksa.component';
import { StoreModule } from '@ngrx/store';
import { NgxCurrencyModule } from "ngx-currency";
import { EffectsModule } from '@ngrx/effects';
import { antreanUmumReducers } from 'src/app/private/states/dokter/antrean/umum/antrean-umum.reducers'
import { AntreanUmumEffects } from 'src/app/private/states/dokter/antrean/umum/antrean-umum.effects'
import { CdTimerModule } from 'angular-cd-timer';
import { RekamMedisComponent } from './rekam-medis/rekam-medis.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';

@NgModule({
  declarations: [
    ViewComponent,
    RiwayatPeriksaComponent,
    RekamMedisComponent
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    ModalModuleCustom,
    UmumRoutingModule,
    BsDatepickerModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    NgxCurrencyModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgSelectModule,
    StoreModule.forFeature('dokter_antrean_umum', antreanUmumReducers),
    EffectsModule.forFeature([ AntreanUmumEffects ]),
    CdTimerModule
  ]
})
export class UmumModule { }
