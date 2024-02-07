import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReturPenjualanRoutingModule } from './retur-penjualan-routing.module';
import { ViewComponent } from './view/view.component';
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { AddComponent } from './add/add.component';
import { ListPenjualanComponent } from './list-penjualan/list-penjualan.component';
import { DetailComponent } from './detail/detail.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxCurrencyModule } from "ngx-currency";
import { returReducers } from 'src/app/private/states/retur-penjualan/retur.reducer';
import { ReturEffects } from 'src/app/private/states/retur-penjualan/retur.effects';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    ViewComponent,
    AddComponent,
    ListPenjualanComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ComponentsModule,
    NgxSpinnerModule,
    ReturPenjualanRoutingModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxCurrencyModule,
    NgSelectModule,
    StoreModule.forFeature('retur', returReducers),
    EffectsModule.forFeature([ReturEffects]),
  ]
})
export class ReturPenjualanModule { }
