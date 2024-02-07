import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { KatalogRoutingModule } from './katalog-routing.module';
import { ViewComponent } from './view/view.component';
import { BuatBaruComponent } from './buat-baru/buat-baru.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { BarangBpomComponent } from './barang-bpom/barang-bpom.component';
import { ImportCsvComponent } from './import-csv/import-csv.component';
import { NgxCurrencyModule } from "ngx-currency";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
// masterData_dataObat

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { dataObatReducers } from 'src/app/private/states/master-data/data-obat/data-obat.reducers';
import { DataObatEffects } from 'src/app/private/states/master-data/data-obat/data-obat.effects';
import { EditBuatBaruComponent } from './edit-buat-baru/edit-buat-baru.component';

@NgModule({
	declarations: [
		ViewComponent,
		BuatBaruComponent,
		BarangBpomComponent,
		ImportCsvComponent,
		EditBuatBaruComponent
	],
	imports: [
		CommonModule,
		MatButtonModule,
		KatalogRoutingModule,
		ComponentsModule,
		DataTablesModule,
		NgxSpinnerModule,
		FormsModule,
		BsDatepickerModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		NgxCurrencyModule,
		StoreModule.forFeature('masterData_dataObat', dataObatReducers),
		EffectsModule.forFeature([DataObatEffects]),
	]
})
export class KatalogModule { }
