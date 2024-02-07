import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { PenjualanKasirRoutingModule } from './penjualan-kasir-routing.module';
import { ViewComponent } from './view/view.component';
import { StrukComponent } from './struk/struk.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataTablesModule } from "angular-datatables";
import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { AddComponent } from './add/add.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PenjualanReducers } from 'src/app/private/states/penjualan/penjualan.reducer';
import { PenjualanEffects } from 'src/app/private/states/penjualan/penjualan.effects';
import { MatButtonModule } from "@angular/material/button";
@NgModule({
	declarations: [
		ViewComponent,
		AddComponent,
		StrukComponent
	],
	imports: [
		CommonModule,
		PenjualanKasirRoutingModule,
		ComponentsModule,
		DataTablesModule,
		NgxSpinnerModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		DataTablesModule,
		MatButtonModule,
		FormsModule,
		ReactiveFormsModule,
		NgxCurrencyModule,
		NgSelectModule,
		StoreModule.forFeature('penjualan', PenjualanReducers),
		EffectsModule.forFeature([PenjualanEffects]),
	]
})
export class PenjualanKasirModule { }
