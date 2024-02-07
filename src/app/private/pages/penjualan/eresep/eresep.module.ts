import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EResepRoutingModule } from './eresep-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { DetailComponent } from './detail/detail.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTabsModule } from '@angular/material/tabs';
import { ResepReducers } from 'src/app/private/states/resep/resep.reducer';
import { ResepEffects } from 'src/app/private/states/resep/resep.effects';
@NgModule({
	declarations: [
		ViewComponent,
		DetailComponent,
	],
	imports: [
		CommonModule,
		EResepRoutingModule,
		NgSelectModule,
		ComponentsModule,
		DataTablesModule,
		FormsModule,
		MatTabsModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		StoreModule.forFeature('resep', ResepReducers),
		EffectsModule.forFeature([ResepEffects]),
	]
})
export class EResepModule { }
