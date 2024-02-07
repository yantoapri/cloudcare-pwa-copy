import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { InformasiKlinikRoutingModule } from './informasi-klinik-routing.module';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InformasiKlinikReducers } from 'src/app/private/states/manajemen-klinik/informasi-klinik/informasi-klinik.reducers';
import { InformasiKlinikEffects } from 'src/app/private/states/manajemen-klinik/informasi-klinik/informasi-klinik.effects';
import { ImageCropperModule } from 'ngx-image-cropper';
import {  NgxSpinnerModule } from "ngx-spinner";
@NgModule({
	declarations: [
		ViewComponent,
		EditComponent
	],
	imports: [
		CommonModule,
		InformasiKlinikRoutingModule,
		ComponentsModule,
		FormsModule,
		ReactiveFormsModule,
		NgSelectModule,
		NgxSpinnerModule,
		MatButtonModule,
		ImageCropperModule,
		StoreModule.forFeature('manajemenKlinik_informasiKlinik', InformasiKlinikReducers),
		EffectsModule.forFeature([InformasiKlinikEffects])
	]
})
export class InformasiKlinikModule { }
