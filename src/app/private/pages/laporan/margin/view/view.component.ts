import { Component, ViewChild, OnInit,QueryList} from '@angular/core';
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
	@ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
	dtElements: QueryList<DataTableDirective>;
	dtOptions: DataTables.Settings = {};
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
			compare: ["", [Validators.required]],
			margin: [0, [Validators.required]],
		})
		this.spinner.show('spinner1')
		this.dtOptions = this.showDataTables()
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 1200);
	}
	
	
	reLoadData() {
		this.search=true
		if(this.formInput.invalid){
			return false
		  }
		this.datatableElement.dtInstance.then((dtInstance: any) => {
			dtInstance.ajax.reload()
		  
	  	});
	}

	download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Laba Margin Obat.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	
	exportMargin(){
		this.spinner.show('spinner1')
		this.search=true
		if(this.formInput.invalid){
		  return false
		}
		this.params.margin=this.formInput.value.margin
		// this.params.sort_by="desc"
		this.params.compare=this.formInput.value.compare
		this.marginExport.exportObatMargin(this.params)
		.subscribe((resp: any) => {
			this.download(resp)
			this.search=false
			this.spinner.hide('spinner1')
		})
	
	}


	showDataTables() {
		this.spinner.show('spinner1')
		let self=this
		return {
			pageLength: 10,
			pagingType:"simple",
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.margin=this.formInput.value.margin
				// dataTablesParameters.sort_by="desc"
				dataTablesParameters.operator=this.formInput.value.compare
				this.margin.getObatMargin(dataTablesParameters)
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
					data: 'nama_obat',

				},
				{
					data: 'stok',
					
				},
				{
					data: 'margin',
					render(data: any, type: any, row: any, full: any) {
						return data?Number(data)+'%':"0%"
					}
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
