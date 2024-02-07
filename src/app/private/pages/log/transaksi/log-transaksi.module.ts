import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogTransaksiRoutingModule } from './log-transaksi-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { NgxCurrencyModule } from "ngx-currency";
import {ViewLogComponent} from './log-obat/view.component'
import {ViewComponent} from './log-alat/view.component'
// masterData_dataObat

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dataObatReducers } from 'src/app/private/states/master-data/data-obat/data-obat.reducers';
import { DataObatEffects } from 'src/app/private/states/master-data/data-obat/data-obat.effects';
@NgModule({
	declarations: [
		ViewComponent,
		ViewLogComponent
	],
	imports: [
		CommonModule,
		LogTransaksiRoutingModule,
		ComponentsModule,
		DataTablesModule,
		NgxSpinnerModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		NgxCurrencyModule,
		StoreModule.forFeature('masterData_dataObat', dataObatReducers),
		EffectsModule.forFeature([DataObatEffects]),
	]
})
export class LogTransaksiModule { }
