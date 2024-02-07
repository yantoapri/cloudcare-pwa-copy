import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterMetodeBayarRoutingModule } from './master-metode-bayar-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { MatButtonModule } from "@angular/material/button";
// masterData_metodeBayar

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { metodeBayarReducers } from 'src/app/private/states/master-data/metode-bayar/metode-bayar.reducers';
import { MetodeBayarEffects } from 'src/app/private/states/master-data/metode-bayar/metode-bayar.effects';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    MasterMetodeBayarRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModuleCustom,
    MatButtonModule,
    StoreModule.forFeature('masterData_metodeBayar', metodeBayarReducers),
    EffectsModule.forFeature([ MetodeBayarEffects ]),
  ]
})
export class MasterMetodeBayarModule { }
