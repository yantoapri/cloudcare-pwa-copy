import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { DataPasienRoutingModule } from './data-pasien-routing.module';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PasienEffects } from 'src/app/private/states/pasien/data-pasien/pasien.effects';
import { pasienReducers } from 'src/app/private/states/pasien/data-pasien/pasien.reducers'
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    ViewComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    DataPasienRoutingModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgxSpinnerModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    StoreModule.forFeature('pasien_dataPasien', pasienReducers),
    EffectsModule.forFeature([PasienEffects])
  ]
})
export class DataPasienModule { }
