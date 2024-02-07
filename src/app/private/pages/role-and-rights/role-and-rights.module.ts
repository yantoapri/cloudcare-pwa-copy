import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleAndRightsRoutingModule } from './role-and-rights-routing.module';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RoleAndRightsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class RoleAndRightsModule { }
