import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { SupplierRoutingModule } from './supplier-routing.module';
import { ViewComponent } from './view/view.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
// masterData_supplier
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SupplierEffects } from 'src/app/private/states/master-data/supplier/supplier.effects';
import { supplierReducers } from 'src/app/private/states/master-data/supplier/supplier.reducers';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    NgSelectModule,
    CommonModule,
    MatButtonModule,
    SupplierRoutingModule,
    ComponentsModule,
    ModalModuleCustom,
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,

    StoreModule.forFeature('masterData_supplier', supplierReducers),
    EffectsModule.forFeature([ SupplierEffects ]),
  ]
})
export class SupplierModule { }
