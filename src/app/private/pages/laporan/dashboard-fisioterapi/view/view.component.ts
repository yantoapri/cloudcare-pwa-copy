import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import {ModulDasboardService} from 'src/app/private/modul-api/modul-laporan/dashboard'
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";


@Component({
	selector: 'app-main',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
	data:any
	search=false
	formInput: any
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	constructor(private fb:FormBuilder,
		private ModulDasboardService:ModulDasboardService,
		private spinner : NgxSpinnerService,
	) { }
	ngOnInit() {
		this.formInput = this.fb.group({
			date_from: [[new Date(), new Date()], [Validators.required]]
		})
		this.loadData()
	}
	loadData(){
		this.spinner.show('spinner1')
		let start=this.formInput.value.date_from[0]!=undefined?new Date(this.formInput.value.date_from[0]).getTime():0
		let end=this.formInput.value.date_from[1]!=undefined?new Date(this.formInput.value.date_from[1]).getTime():0
		let param={
			"unixtime_start":start,
			"unixtime_end": end,
			"poli": "all"
		}
		this.ModulDasboardService.getAdminKlinik(param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
			  this.data=resp.response
			  this.spinner.hide('spinner1')
			}
		})
	}
	setDate(val){
		return moment(val).format("DD-MM-YYYY")
	}

}
