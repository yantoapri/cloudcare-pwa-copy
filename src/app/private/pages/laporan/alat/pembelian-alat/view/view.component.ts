import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import {MoneyService} from 'src/app/private/services/money/index'
import { ModulMutasiExportService } from 'src/app/private/modul-api/modul-laporan/laporan-mutasi-export'
import { ModulMutasiService } from 'src/app/private/modul-api/modul-laporan/laporan-mutasi';
import * as moment from 'moment';
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
  formInput: FormGroup;
 
	search=false
	constructor(
		private modulExport: ModulMutasiExportService,
		private ModulPembelian: ModulMutasiService,
		private money:MoneyService,
    	private fb : FormBuilder,
		private spinner:NgxSpinnerService
	) { }
	minDate=new Date()
	maxDate=new Date()
	ngOnInit(): void {
	var date = new Date(), y = date.getFullYear(), m = date.getMonth();
	this.minDate = new Date(y, m, 1);
	this.maxDate= new Date(y, m + 1, 0);
    this.formInput = this.fb.group({
      date_from: [ [new Date(y, m, 1), new Date()], [Validators.required]],
      pengguna:["all",[Validators.required]]
    });
		this.dtOptions = this.showDataTables()
	}
	reLoadData() {
		this.search=true
		if (this.formInput.invalid) {
		return
		}
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
			this.search=false
		});
	}
	download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Pembelian Alat.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
	export(){
		this.search=true
		if (this.formInput.invalid) {
		return
		}
		this.spinner.show('spinner1')
		let currentUser:any=localStorage.getItem('currentUser')
		currentUser=currentUser!=null?JSON.parse(currentUser):null
		let param={
			"Authorization": currentUser.token,
			"x_api_key": currentUser.key,
			"search": {
				"value": "",
				"regex": false
			},
			"date_from":0,
			"date_to":0,
			"pengguna":""
		}
		param.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
		param.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
		param.pengguna=this.formInput.value.pengguna
		this.modulExport.exportAlat(param)
			.subscribe((resp: any) => {
			this.download(resp)
			this.search=false
			this.spinner.hide('spinner1')
		})
	}
	showDataTables() {
		let self=this
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
				dataTablesParameters.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
				dataTablesParameters.pengguna=this.formInput.value.pengguna
				this.ModulPembelian.getAlat(dataTablesParameters)
					.subscribe((resp: any) => {
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
						})
						this.spinner.hide('spinner1')
					})
			},
			columns: [
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return full.row + 1 + full.settings._iDisplayStart;
					}
				},
				{
					data: 'tgl_faktur_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(data).format("DD-MM-YYYY")
					}
				},
				{
					data: 'nomor_faktur'
				},
				{
					data: 'nama_supplier'
				},
				{
					data: 'nama_creator'
				},
				{
					data: 'pembayaran'
				},
				{
					data: 'total',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data.replace(".",",")))
					}
				},
			],

		}
	}


}
