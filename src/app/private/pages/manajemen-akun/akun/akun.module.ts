import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { AkunRoutingModule } from './akun-routing.module';
import { ViewComponent } from './view/view.component';
import { TambahComponent } from './tambah/tambah.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgSelectModule } from '@ng-select/ng-select';
import { manajemenAkunReducer } from '../../../states/manajemen-akun/akun/akun.reducers'
import { AkunEffects } from '../../../states/manajemen-akun/akun/akun.effects'
import { EditComponent } from './edit/edit.component';
import {  NgxSpinnerModule } from "ngx-spinner";
@NgModule({
	declarations: [
		ViewComponent,
		TambahComponent,
		EditComponent
	],
	imports: [
		CommonModule,
		AkunRoutingModule,
		ComponentsModule,
		FormsModule,
		MatButtonModule,
		NgxSpinnerModule,
		NgSelectModule,
		ReactiveFormsModule,
		DataTablesModule,
		StoreModule.forFeature('managemenAkun_akun', manajemenAkunReducer),
		EffectsModule.forFeature([AkunEffects])
	]
})
export class AkunModule { }
