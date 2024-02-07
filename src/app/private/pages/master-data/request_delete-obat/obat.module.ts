import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ObatRoutingModule } from './obat-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { TambahStokObatComponent } from './tambah-stok-obat/tambah-stok-obat.component';
import { TambahObatComponent } from './tambah-obat/tambah-obat.component';
import { DataTablesModule } from "angular-datatables";
@NgModule({
  declarations: [
    ViewComponent,
    TambahStokObatComponent,
    TambahObatComponent
  ],
  imports: [
    CommonModule,
    ObatRoutingModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ObatModule { }
