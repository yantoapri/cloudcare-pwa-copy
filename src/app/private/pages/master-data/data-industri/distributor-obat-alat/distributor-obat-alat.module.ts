import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributorObatAlatRoutingModule } from './distributor-obat-alat-routing.module';
import { ViewComponent } from './view/view.component';

import { ComponentsModule } from "src/app/shared/components/components.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    DistributorObatAlatRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class DistributorObatAlatModule { }
