import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from "src/app/shared/components/components.module";
import { DataTablesModule } from "angular-datatables";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { ChatRoutingModule } from './chat-routing.module';

import { ViewComponent } from './view/view.component';
import { RekamMedisComponent } from './rekam_medis/rm.component';

@NgModule({
	declarations: [
		ViewComponent,
		RekamMedisComponent
	],
	imports: [
		CommonModule,
		ComponentsModule,
		DataTablesModule,
		FormsModule,
		ReactiveFormsModule,
		ChatRoutingModule,
		ModalModuleCustom
	]
})
export class ChatModule { }
