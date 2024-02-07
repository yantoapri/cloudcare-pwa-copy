import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataUserRoutingModule } from './master-data-user-routing.module';
import { ViewComponent } from './view/view.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { DataTablesModule } from "angular-datatables";
@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    MasterDataUserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    ComponentsModule,
    MatSelectModule,
    MatInputModule,
    DataTablesModule
  ]
})
export class MasterDataUserModule { }
