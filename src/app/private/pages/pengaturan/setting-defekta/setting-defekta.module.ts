import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingDefektaRoutingModule } from './setting-defekta-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";


@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    SettingDefektaRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingDefektaModule { }
