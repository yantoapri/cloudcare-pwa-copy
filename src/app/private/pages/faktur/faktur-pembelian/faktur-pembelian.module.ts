import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FakturPembelianRoutingModule } from './faktur-pembelian-routing.module';
import { ViewComponent } from './view/view.component';
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddComponent } from './add/add.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxCurrencyModule } from "ngx-currency";
import { fakturPembelianReducers } from 'src/app/private/states/faktur-pembelian/faktur-pembelian.reducer';
import { FakturPembelianEffects } from 'src/app/private/states/faktur-pembelian/faktur-pembelian.effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
  declarations: [
    ViewComponent,
    AddComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    FakturPembelianRoutingModule,
    ComponentsModule,
    ModalModuleCustom,
    NgxSpinnerModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxCurrencyModule,
    NgSelectModule,
    MatButtonModule,
    StoreModule.forFeature('faktur_pembelian', fakturPembelianReducers),
    EffectsModule.forFeature([FakturPembelianEffects]),
  ]
})
export class FakturPembelianModule { }
