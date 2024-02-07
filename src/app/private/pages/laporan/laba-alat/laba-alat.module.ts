import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LabaAlatRoutingModule } from './laba-alat-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxSpinnerModule } from "ngx-spinner";
import { DataTablesModule } from "angular-datatables";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
	declarations: [
		ViewComponent
	],
	imports: [
		CommonModule,
		LabaAlatRoutingModule,
		ComponentsModule,
		DataTablesModule,
		StoreModule,
		FormsModule,
		NgxSpinnerModule,
		ReactiveFormsModule ,
		MatButtonModule,
		EffectsModule,
		BsDatepickerModule.forRoot()
	]
})
export class LabaAlatModule { }
