import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ViewComponent } from './view/view.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { AddComponent } from './add/add.component';
import { ListPembelianComponent } from './list-pembelian/list-pembelian.component';
import { DetailComponent } from './detail/detail.component';
import { FinishComponent } from './finish/finish.component';
import { ListPenggantianComponent } from './list-penggantian/list-pengganti.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxCurrencyModule } from "ngx-currency";
import { returReducers } from 'src/app/private/states/retur-gudang/retur.reducer';
import { ReturEffects } from 'src/app/private/states/retur-gudang/retur.effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReturPbfRoutingModule } from './retur-pbf-routing.module';
import { MatButtonModule } from "@angular/material/button";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
@NgModule({
  declarations: [
    ViewComponent,
    AddComponent,
    ListPembelianComponent,
    DetailComponent,
    ListPenggantianComponent,
    FinishComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    ComponentsModule,
    NgxSpinnerModule,
    ReturPbfRoutingModule,
    DataTablesModule,
    FormsModule,
    ModalModuleCustom,
    NgbAccordionModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgxCurrencyModule,
    NgSelectModule,
    StoreModule.forFeature('retur_gudang', returReducers),
    EffectsModule.forFeature([ReturEffects]),
  ]
})
export class ReturPbfModule { }
