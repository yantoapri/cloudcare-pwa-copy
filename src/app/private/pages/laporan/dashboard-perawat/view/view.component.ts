import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import {ModulDasboardService} from 'src/app/private/modul-api/modul-laporan/dashboard'
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { FormBuilder,Validators} from "@angular/forms";


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
		minDate=new Date()
		maxDate=new Date()
		periode=[new Date(),new Date()]
		
	ngOnInit() {
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.maxDate= new Date(y, m, d);
		this.formInput = this.fb.group({
			date_from: [[new Date(y, m, 1), new Date()], [Validators.required]]
		})
		this.loadData()
	}
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
	loadData(){
		this.spinner.show('spinner1')
		let start=this.formInput.value.date_from[0]!=undefined?new Date(this.convertTime(this.formInput.value.date_from[0])).getTime():0
		let end=this.formInput.value.date_from[1]!=undefined?new Date(this.convertTime(this.formInput.value.date_from[1])).getTime():0
		let param={
			"unixtime_start":start,
			"unixtime_end": end,
			"poli": "all"
		}
		this.periode=this.formInput.value.date_from
		this.ModulDasboardService.getPerawat(param).subscribe((resp: any) => {
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
