import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { NgxSpinnerService } from "ngx-spinner";
import {ModulResepService} from 'src/app/private/modul-api/modul-laporan/laporan-resep'
import { ModalService } from 'src/app/shared/_modal';
import * as moment from 'moment';
import { FormBuilder,Validators} from "@angular/forms";
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};

	periode: any = null
	tgl_periode: any = null
	hargaTotal="0"
	totalTerjual=0
	formInput:any
	search=false
	constructor(
		private modalService: ModalService,
		private resep:ModulResepService,
		private money:MoneyService,
		private fb : FormBuilder,
		private spinner:NgxSpinnerService,
		) { }
	minDate=new Date()
	maxDate=new Date()
	ngOnInit(): void {
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.maxDate= new Date(y, m, d);
		this.formInput = this.fb.group({
			date_from: [ [new Date(y, m, 1), new Date()], [Validators.required]],
		  });
		this.getTotal()
		this.dtOptions = this.showDataTables()

	}
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
	getTotal(){
		this.spinner.show('spinner1')
		let param={
			"date_from": new Date(this.convertTime(this.formInput.value.date_from[0])).getTime(),
			"date_to": new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
		}

		this.resep.getTotal(param)
		.subscribe((resp: any) => {
			this.hargaTotal=this.money.formatRupiah(resp.response.hargaTotal)
			this.totalTerjual=resp.response.totalTerjual
			this.spinner.hide('spinner1')
		})
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
		this.getTotal()
	}
	download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Resep.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	export(){
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
			"date_from": 0,
			"date_to": 0
		}
		param.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
        param.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
		this.resep.getDatatables(param)
					.subscribe((resp: any) => {
			this.download(resp)
			this.spinner.hide('spinner1')
		})
	}
	setMoney(val){
		return this.money.formatRupiah(val)
	}
	showDataTables() {
		this.spinner.show('spinner1')
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
        dataTablesParameters.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
				this.resep.getDatatables(dataTablesParameters)
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
				data: 'tanggal',
				render(data: any, type: any, row: any, full: any) {
					return moment(data).format("DD-MM-YYYY")
				}

			},
			{
				data: 'pasien'
			},
			{
				data: 'pic'
			},
			{
				data: 'dokter'
			},
			{
				data: 'harga_resep',
				render(data: any, type: any, row: any, full: any) {
					return self.money.formatRupiah(parseInt(data))
				}
			},
			],

		}
	}


	filterPeriode() {
		this.modalClose('periode')
	}
	filterKasir() {
		this.modalClose('kasir')
	}
	filterDokter() {
		this.modalClose('dokter')
	}
	filterPasien() {
		this.modalClose('pasien')
	}
	modalOpen(val) {
		this.modalService.open(val)

	}
	modalClose(val) {
		this.modalService.close(val)

	}
}
