import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MarginAlatRoutingModule } from './margin-alat-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataTablesModule } from "angular-datatables";
import { MatButtonModule } from "@angular/material/button";
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
	declarations: [
		ViewComponent
	],
	imports: [
		CommonModule,
		MarginAlatRoutingModule,
		ComponentsModule,
		NgSelectModule,
		DataTablesModule,
		StoreModule,
		FormsModule,
		NgxSpinnerModule,
		ReactiveFormsModule,
		EffectsModule,
		MatButtonModule,
		BsDatepickerModule.forRoot()
	]
})
export class MarginAlatModule { }
