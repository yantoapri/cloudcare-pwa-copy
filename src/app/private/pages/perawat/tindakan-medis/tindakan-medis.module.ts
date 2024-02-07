import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TindakanMedisRoutingModule } from './tindakan-medis-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CdTimerModule } from 'angular-cd-timer';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
import { RekamMedisComponent } from './rekam-medis/rekam-medis.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    ViewComponent,
    RekamMedisComponent
  ],
  imports: [
    CommonModule,
    TindakanMedisRoutingModule,
    NgSelectModule,
    ComponentsModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    CdTimerModule,
    NgxSpinnerModule,
    MatButtonModule
  ]
})
export class TindakanMedisModule { }
