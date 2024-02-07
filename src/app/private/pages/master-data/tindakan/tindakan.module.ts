import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TindakanRoutingModule } from './tindakan-routing.module';
import { DataTablesModule } from "angular-datatables";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TindakanRoutingModule,
    DataTablesModule
  ]
})
export class TindakanModule { }
