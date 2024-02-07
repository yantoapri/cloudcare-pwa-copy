import { Component, ViewChildren, OnInit,QueryList} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { ModulMarginService } from 'src/app/private/modul-api/modul-laporan/laporan-margin'
import { ModulMarginExportService } from 'src/app/private/modul-api/modul-laporan/laporan-margin-export'
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder,Validators} from "@angular/forms";
import { MoneyService } from 'src/app/private/services/money/index'
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
	@ViewChildren(DataTableDirective) datatableElement: QueryList<DataTableDirective>
	dtElements: QueryList<DataTableDirective>;
	dtOptionsProfit1: DataTables.Settings = {};
	dtOptionsProfit2: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
  	dtTrigger2: Subject<any> = new Subject();
	constructor(
		private margin:ModulMarginService,
		private marginExport:ModulMarginExportService,
		private fb: FormBuilder,
		private spinner:NgxSpinnerService,
		private money:MoneyService
	) { }
	formInput:any
	search=false
	total="Rp.0.00"
	jml=0
	avg="Rp.0.00"
	maxDate=new Date()
	dataTablesParameters={
		"draw": 1,
		"columns": [
			{
				"data": 0,
				"name": "",
				"searchable": true,
				"orderable": false,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": "nama_barang",
				"name": "nama_barang",
				"searchable": true,
				"orderable": true,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": "2",
				"name": "",
				"searchable": false,
				"orderable": false,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": "kemasan_terkecil_singkatan",
				"name": "kemasan_terkecil_singkatan",
				"searchable": true,
				"orderable": true,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": "4",
				"name": "",
				"searchable": false,
				"orderable": false,
				"search": {
					"value": "",
					"regex": false
				}
			}
		],
		"order": [],
		"length": 50,
		"search": {
			"value": "",
			"regex": false
		},
		"start": 1678758018221,
		"end": 1680490727984,
		"sort_by": "desc",
		"compare": "<"
	}
	params:any
	currentUser:any=localStorage.getItem('currentUser')
	ngOnInit(): void {
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.maxDate= new Date(y, m, d);
		this.currentUser=this.currentUser!=null?JSON.parse(this.currentUser):null
		this.params={
			"Authorization": this.currentUser.token,
			"x_api_key": this.currentUser.key,
			"search": {
			"value": "",
			"regex": false
			},
			"transaksi_jenis": "masuk",
			"start":"",
			"end":"",
			"expired_in":0
		}
		this.formInput = this.fb.group({
			date_from: [[new Date(y, m, 1), new Date()], [Validators.required]],
		})
		this.spinner.show('spinner1')
		this.dtOptionsProfit1 = this.showDataTablesProfit1()
		this.dtOptionsProfit2 = this.showDataTablesProfit2()
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 1200);
	}
	
	
	reLoadData() {
		this.search=true
		if(this.formInput.invalid){
			return false
		  }
		this.spinner.show('spinner1')
		this.datatableElement.forEach((dtElement: DataTableDirective, index: number) => {
			dtElement.dtInstance.then((dtInstance: any) => {
			  	dtInstance.ajax.reload()
				
			});
		  });
		  setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 1600);
	}
	ngAfterViewInit(){
		//Define datatable 
		this.dtTrigger1.next(0);
		this.dtTrigger2.next(0);
		
	  }
	download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Laba Margin Obat.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	exportProfit1(){
		this.spinner.show('spinner1')
		this.search=true
		if(this.formInput.invalid){
		  return false
		}
		this.params.date_from=new Date(this.formInput.value.date_from[0]).getTime()
		this.params.date_to=new Date(this.formInput.value.date_from[1]).getTime()
		this.params.sort_by="desc"
		this.marginExport.exportObatProfit(this.params)
		.subscribe((resp: any) => {
			this.download(resp)
			this.spinner.hide('spinner1')
		})
	
	  }
	exportProfit2(){
		this.spinner.show('spinner1')
		this.search=true
		if(this.formInput.invalid){
		  return false
		}
		this.params.date_from=new Date(this.formInput.value.date_from[0]).getTime()
		this.params.date_to=new Date(this.formInput.value.date_from[1]).getTime()
		this.params.sort_by="asc"
		this.marginExport.exportObatProfit(this.params)
		.subscribe((resp: any) => {
			this.download(resp)
			this.search=false	
			this.spinner.hide('spinner1')	
		})
	
	}
	// 50 orang dengen profit tertinggi
	showDataTablesProfit1() {
		this.spinner.show('spinner1')
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			lengthMenu:[10,20,30,50],
			pagingType:"simple",
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.date_from=new Date(this.formInput.value.date_from[0]).getTime()
				dataTablesParameters.date_to=new Date(this.formInput.value.date_from[1]).getTime()
				dataTablesParameters.sort_by="desc"
				this.margin.getObatProfit(dataTablesParameters)
					.subscribe((resp: any) => {
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
						})
						
					})
					dataTablesParameters.compare=">"
					this.margin.getObatRekap(dataTablesParameters)
						.subscribe((resp: any) => {
						self.total=self.money.formatRupiah(resp.response.laba_kotor)
						self.jml=resp.response.persentase_laba
						self.avg=resp.response.avg==null?self.money.formatRupiah(0):self.money.formatRupiah(resp.response.avg)
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
					data: 'nama_barang',

				},
				{
					data: 'profit',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
				},
				{
					data: 'kemasan_terkecil'
				},
				{
					data: 'stok_keluar',
					
				}
			],

		}
	}
	// 50 orang dengen profit terendah
	showDataTablesProfit2() {
		this.spinner.show('spinner1')
		let self=this
		return {
			lengthMenu:[10,20,30,50],
			pagingType:"simple",
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.date_from=new Date(this.formInput.value.date_from[0]).getTime()
				dataTablesParameters.date_to=new Date(this.formInput.value.date_from[1]).getTime()
				dataTablesParameters.sort_by="asc"
				this.margin.getObatProfit(dataTablesParameters)
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
					data: 'nama_barang',

				},
				{
					data: 'profit',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
				},
				{
					data: 'kemasan_terkecil'
				},
				{
					data: 'stok_keluar',
					
				}
			],

		}
	}

	setMoney(val){
		return this.money.formatRupiah(val)
	}
	onOpenCalendar(container : any){
		container.monthSelectHandler = (event: any): void => {
		  container._store.dispatch(container._actions.select(event.date));
		};
		container.setViewMode('year');
	  }


}
