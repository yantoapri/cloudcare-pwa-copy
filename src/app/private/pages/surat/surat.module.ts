import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { SuratRoutingModule } from './surat-routing.module'
import { NgxCurrencyModule } from "ngx-currency";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ViewComponent } from './surat-sakit/view.component'
import { ViewComponent as ViewDiagnosa } from './surat-diagnosa/view.component'
import { ViewComponent as ViewKesehatan } from './surat-sehat/view.component'
import { ViewComponent as ViewRujukan } from './surat-rujukan/view.component'
import { NgxSpinnerModule } from "ngx-spinner";
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from "@angular/material/button";
@NgModule({
	declarations: [
		ViewComponent,
		ViewDiagnosa,
		ViewKesehatan,
		ViewRujukan
	],
	imports: [
		CommonModule,
		NgxSpinnerModule,
		NgbModule,
		NgSelectModule,
		ModalModuleCustom,
		SuratRoutingModule,
		ComponentsModule,
		DataTablesModule,
        BsDatepickerModule,
		FormsModule,
		ReactiveFormsModule,
		ModalModuleCustom,
		NgxCurrencyModule,
		MatButtonModule
	],
})
export class SuratModule { }
