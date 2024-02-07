import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { MedisUmumRoutingModule } from './medis-umum-routing.module';
import { ViewComponent } from './view/view.component';
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { TindakanMedisUmumEffects } from 'src/app/private/states/master-data/tindakan/tindakan-medis-umum/tindakan-medis-umum.effects';
import { tindakanMedisUmumReducers } from 'src/app/private/states/master-data/tindakan/tindakan-medis-umum/tindakan-medis-umum.reducers';
import { NgxCurrencyModule } from "ngx-currency";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    MedisUmumRoutingModule,
    NgxCurrencyModule,
    ComponentsModule,
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    StoreModule.forFeature('masterData_tindakan_tindakanMedisUmum', tindakanMedisUmumReducers),
    EffectsModule.forFeature([ TindakanMedisUmumEffects ]),
    ModalModuleCustom,
  ]
})
export class MedisUmumModule { }
