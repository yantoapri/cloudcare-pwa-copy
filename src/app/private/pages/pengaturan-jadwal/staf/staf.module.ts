import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StafRoutingModule } from './staf-routing.module';
import { ViewComponent } from './view/view.component';
import { ComponentsModule } from "src/app/shared/components/components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from "angular-datatables";
import { ModalModule as ModalModuleCustom } from 'src/app/shared/_modal';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JadwalStafEffects } from 'src/app/private/states/pengaturan-jadwal/jadwal-staf/jadwal-staf.effects';
import { jadwalStafReducers } from 'src/app/private/states/pengaturan-jadwal/jadwal-staf/jadwal-staf.reducers';
import { FullCalendarModule } from "@fullcalendar/angular";
import { NgxSpinnerModule } from "ngx-spinner";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import { MatButtonModule } from "@angular/material/button";
FullCalendarModule.registerPlugins([
	dayGridPlugin,
	timeGridPlugin,
	listPlugin,
	interactionPlugin,
]);


@NgModule({
	declarations: [
		ViewComponent,
		AddComponent,
		EditComponent
	],
	imports: [
		CommonModule,
		NgxSpinnerModule,
		StafRoutingModule,
		ComponentsModule,
		FormsModule,
		ReactiveFormsModule,
		FullCalendarModule,
		DataTablesModule,
		ModalModuleCustom,
		NgSelectModule,
		MatButtonModule,
		BsDatepickerModule.forRoot(),
		TimepickerModule.forRoot(),
		StoreModule.forFeature('pengaturanJadwal_jadwalStaf', jadwalStafReducers),
		EffectsModule.forFeature([JadwalStafEffects])
	]
})
export class StafModule { }
