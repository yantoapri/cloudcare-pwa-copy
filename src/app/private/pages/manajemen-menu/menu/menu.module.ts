import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MenuRoutingModule } from './menu-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MenuEffects } from 'src/app/private/states/manajemen-menu/menu/menu.effects';
import { menuReducers } from 'src/app/private/states/manajemen-menu/menu/menu.reducers';
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {ManageHttpInterceptor} from "../../../../core/interceptor/manage-http.interceptor"
@NgModule({
	declarations: [
		ViewComponent
	],
	imports: [
		MatButtonModule,
		CommonModule,
		MenuRoutingModule,
		ComponentsModule,
		DataTablesModule,
		FormsModule,
		MatIconModule,
		NgSelectModule,
		NgxSpinnerModule,
		MatTabsModule,
		ReactiveFormsModule,
		StoreModule.forFeature('manajemenMenu_menu', menuReducers),
		EffectsModule.forFeature([MenuEffects]),
		ModalModuleCustom
	],
	providers: [
		// HttpCancelService,
		{ provide: HTTP_INTERCEPTORS, useClass: ManageHttpInterceptor, multi: true }
	  ],
	bootstrap: [ViewComponent]
})
export class MenuModule { }
