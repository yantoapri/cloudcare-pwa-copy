import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { BiayaTambahanRoutingModule } from './biaya-tambahan-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { MatButtonModule } from "@angular/material/button";
// masterData_metodeBayar

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { biayaReducers } from 'src/app/private/states/master-data/biaya/biaya.reducers';
import {biayaEffects } from 'src/app/private/states/master-data/biaya/biaya.effects';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    NgxSpinnerModule,
    CommonModule,
    BiayaTambahanRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModuleCustom,
    MatButtonModule,
    StoreModule.forFeature('biaya', biayaReducers),
    EffectsModule.forFeature([ biayaEffects ]),
  ]
})
export class BiayaTambahanModule { }
