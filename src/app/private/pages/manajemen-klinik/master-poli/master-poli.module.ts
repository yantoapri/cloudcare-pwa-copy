import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { MasterPoliRoutingModule } from './master-poli-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { MatButtonModule } from "@angular/material/button";
import { MasterPoliEffects } from 'src/app/private/states/manajemen-klinik/master-poli/master-poli.effects';
import { MasterPoliReducers } from 'src/app/private/states/manajemen-klinik/master-poli/master-poli.reducers';
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    MasterPoliRoutingModule,
    StoreModule.forFeature('manajemenKlinik_masterPoli', MasterPoliReducers),
    EffectsModule.forFeature([MasterPoliEffects]),
    ComponentsModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModuleCustom,
    MatButtonModule
  ]
})
export class MasterPoliModule { }
