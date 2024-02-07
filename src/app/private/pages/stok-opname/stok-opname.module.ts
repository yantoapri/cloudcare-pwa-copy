import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { StokOpnameComponent } from './view/stok-opname.component'
import { StokOpnameRoutingModule } from './stokopname-routing.module'
import { NgxCurrencyModule } from "ngx-currency";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StokOpnameReducers } from 'src/app/private/states/stok-opname/stok-opname.reducer';
import { StokOpnameEffects } from 'src/app/private/states/stok-opname/stok-opname.effects';
import { RiwayatComponent } from './riwayat/riwayat.component'
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { StokopnameMulaiComponent } from './mulai/stokopname-mulai.component';
import { StokOpnameLaporanComponent } from './laporan/stokopname-laporan.component';
import { MatButtonModule } from "@angular/material/button";
@NgModule({
	declarations: [
		StokOpnameComponent,
		StokopnameMulaiComponent,
		StokOpnameLaporanComponent,
		RiwayatComponent

	],
	imports: [
		MatButtonModule,
		CommonModule,
		NgxSpinnerModule,
		NgbModule,
		NgSelectModule,
		ModalModuleCustom,
		StokOpnameRoutingModule,
		ComponentsModule,
		DataTablesModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		NgxCurrencyModule,
		StoreModule.forFeature('stok_opname', StokOpnameReducers),
		EffectsModule.forFeature([StokOpnameEffects]),
	],
})
export class StokOpnameModule { }
