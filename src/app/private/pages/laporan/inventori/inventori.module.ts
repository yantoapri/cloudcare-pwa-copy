import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from "ngx-spinner";
import { InventoriRoutingModule } from './inventori-routing.module';
import { ViewComponent } from './view/view.component';
import { ViewAlatComponent} from './view-alat/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataTablesModule } from "angular-datatables";
import { MatButtonModule } from "@angular/material/button";
@NgModule({
	declarations: [
		ViewComponent,
		ViewAlatComponent
	],
	imports: [
		CommonModule,
		InventoriRoutingModule,
		ComponentsModule,
		NgxSpinnerModule,
		DataTablesModule,
		StoreModule,
		MatButtonModule,
		EffectsModule,
		BsDatepickerModule.forRoot()
	]
})
export class InventoriModule { }
