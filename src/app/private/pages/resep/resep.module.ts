import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataResepRoutingModule } from './resep-routing.module';
import { AntrianComponent } from './antrian/antrian.component';
import { ViewComponent } from './view/view.component';
import { AddComponent } from './add/add.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DetailComponent } from './detail/detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { ResepReducers } from 'src/app/private/states/resep/resep.reducer';
import { ResepEffects } from 'src/app/private/states/resep/resep.effects';
import { NgxCurrencyModule } from "ngx-currency";
import { MatButtonModule } from "@angular/material/button";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
	declarations: [
		ViewComponent,
		DetailComponent,
		AntrianComponent,
		AddComponent
	],
	imports: [
		CommonModule,
		DataResepRoutingModule,
		NgSelectModule,
		NgxSpinnerModule,
		NgxCurrencyModule,
		ComponentsModule,
		BsDatepickerModule,
		DataTablesModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		MatButtonModule,
		StoreModule.forFeature('resep', ResepReducers),
		EffectsModule.forFeature([ResepEffects]),
	]
})
export class ResepModule { }
