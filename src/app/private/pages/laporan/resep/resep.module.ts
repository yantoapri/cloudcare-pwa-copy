import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { ResepRoutingModule } from './resep-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
@NgModule({
	declarations: [
		ViewComponent
	],
	imports: [
		CommonModule,
		ResepRoutingModule,
		ComponentsModule,
		NgxSpinnerModule,
		DataTablesModule,
		FormsModule,ReactiveFormsModule,
		ModalModuleCustom,
		StoreModule,
		MatButtonModule,
		EffectsModule,
		BsDatepickerModule.forRoot()
	]
})
export class ResepModule { }
