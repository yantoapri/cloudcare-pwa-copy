import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxCurrencyModule } from "ngx-currency";
import { KonsolidasiDataRoutingModule } from './konsolidasi-data-routing.module';
import { ViewComponent } from './view/view.component';
import { RiwayatComponent } from './riwayat/riwayat.component';
import { DetailComponent } from './detail/detail.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatButtonModule } from "@angular/material/button";
import { KonsolidasiReducers } from 'src/app/private/states/konsolidasi-data/konsolidasi-data.reducer';
import { KonsolidasiDataEffects } from 'src/app/private/states/konsolidasi-data/konsolidasi-data.effects';
@NgModule({
	declarations: [
		ViewComponent,
		DetailComponent,
		RiwayatComponent
	],
	imports: [
		MatButtonModule,
		CommonModule,
		KonsolidasiDataRoutingModule,
		MatStepperModule,
		NgxSpinnerModule,
		MatFormFieldModule,
		ComponentsModule,
		NgSelectModule,
		ModalModuleCustom,
		DataTablesModule,
		FormsModule,
		ReactiveFormsModule,
		BsDatepickerModule.forRoot(),
		NgxCurrencyModule,
		StoreModule.forFeature('konsolidasi', KonsolidasiReducers),
		EffectsModule.forFeature([KonsolidasiDataEffects]),
	]
})
export class KonsolidasiDataModule { }
