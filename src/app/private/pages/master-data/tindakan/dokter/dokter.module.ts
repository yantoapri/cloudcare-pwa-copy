import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DokterRoutingModule } from './dokter-routing.module';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatInputModule } from "@angular/material/input";
import { DataTablesModule } from "angular-datatables";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    DokterRoutingModule,
    ComponentsModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    ModalModuleCustom
  ]
})
export class DokterModule { }
