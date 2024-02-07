import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RujukanRoutingModule } from './rujukan-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    RujukanRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule,
  ]
})
export class RujukanModule { }
