import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRightRoutingModule } from './menu-right-routing.module';
import { ViewComponent } from './view/view.component';
import { MatButtonModule } from "@angular/material/button";
import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MenuRightEffects } from 'src/app/private/states/manajemen-menu/menu-right/menu-right.effects';
import { menuRightReducers } from 'src/app/private/states/manajemen-menu/menu-right/menu-right.reducers';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
	declarations: [
		ViewComponent,
		AddComponent,
		EditComponent
	],
	imports: [
		MatButtonModule,
		CommonModule,
		MenuRightRoutingModule,
		ComponentsModule,
		ReactiveFormsModule,
		DataTablesModule,
		NgxSpinnerModule,
		NgSelectModule,
		FormsModule,
		StoreModule.forFeature('manajemenMenu_menuRight', menuRightReducers),
		EffectsModule.forFeature([MenuRightEffects])
	]
})
export class MenuRightModule { }
