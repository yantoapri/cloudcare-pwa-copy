import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxCurrencyModule } from "ngx-currency";
import { NgxSpinnerModule } from "ngx-spinner";
import { StokAlatRoutingModule } from './stok-alat-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DetailComponent } from './detail/detail.component';
import { MatButtonModule } from "@angular/material/button";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StokReducers } from 'src/app/private/states/stok/stok-obat/stok-obat.reducer';
import { StokEffects } from 'src/app/private/states/stok/stok-obat/stok-obat.effects';


@NgModule({
	declarations: [
		ViewComponent,
		DetailComponent
	],
	imports: [
		CommonModule,
		StokAlatRoutingModule,
		ComponentsModule,
		NgxSpinnerModule,
		DataTablesModule,
		FormsModule,
		MatButtonModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		NgxCurrencyModule,
		StoreModule.forFeature('stok_alat', StokReducers),
		EffectsModule.forFeature([StokEffects]),
	]
})
export class StokAlatModule { }
