import { NgModule, } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DashboardFisioterapiRoutingModule } from "./dashboard-fisioterapi-routing.module";
import { ViewComponent } from "./view/view.component";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";
import { NgApexchartsModule } from "ng-apexcharts";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataTablesModule } from "angular-datatables";
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
@NgModule({
	declarations: [ViewComponent,],
	imports: [
		CommonModule,
		BsDatepickerModule,
		DashboardFisioterapiRoutingModule,
		chartjsModule,
		NgxSpinnerModule,
		NgApexchartsModule,
		PerfectScrollbarModule,
		FormsModule, 
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
		MatTooltipModule,
		ComponentsModule,
		DataTablesModule,
		StoreModule,
		EffectsModule,
	],
})
export class DashboardFisioterapiModule {


}
