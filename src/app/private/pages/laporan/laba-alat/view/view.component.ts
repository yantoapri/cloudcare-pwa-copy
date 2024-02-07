import { Component,ViewChildren, OnInit,QueryList} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables'
import { ModulMarginService } from 'src/app/private/modul-api/modul-laporan/laporan-margin'
import { ModulMarginExportService } from 'src/app/private/modul-api/modul-laporan/laporan-margin-export'
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder,Validators} from "@angular/forms";
import * as moment from 'moment';
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
		}, 1600);
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
		link.setAttribute('download', `Laporan Laba Margin Alat Kesehatan.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	setMoney(val){
		return this.money.formatRupiah(val)
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
		this.marginExport.exportAlatProfit(this.params)
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
		this.marginExport.exportAlatProfit(this.params)
		.subscribe((resp: any) => {
			this.download(resp)
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
				dataTablesParameters.date_from=moment(this.formInput.value.date_from[0]).format('YYYY-MM-DD')
				dataTablesParameters.date_to=moment(this.formInput.value.date_from[1]).format('YYYY-MM-DD')
				dataTablesParameters.sort_by="desc"
				this.margin.getAlatProfit(dataTablesParameters)
					.subscribe((resp: any) => {
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
						})
						
					})
				dataTablesParameters.compare=">"
				this.margin.getAlatRekap(dataTablesParameters)
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
					data: 'nama_alat_kesehatan',

				},
				{
					data: 'jml_terjual'
				},
				{
					data: 'satuan'
				},
				{
					data: 'total',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data.replace(".",",")))
					}
				}
			],

		}
	}
	// 50 orang dengen profit terendah
	showDataTablesProfit2() {
		this.spinner.show('spinner1')
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			pagingType:"simple",
			lengthMenu:[10,20,30,50],
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.date_from=moment(this.formInput.value.date_from[0]).format('YYYY-MM-DD')
				dataTablesParameters.date_to=moment(this.formInput.value.date_from[1]).format('YYYY-MM-DD')
				dataTablesParameters.sort_by="asc"
				this.margin.getAlatProfit(dataTablesParameters)
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
					data: 'nama_alat_kesehatan',

				},
				{
					data: 'jml_terjual'
				},
				{
					data: 'satuan'
				},
				{
					data: 'total',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data.replace(".",",")))
					}
				}
			],

		}
	}

	onOpenCalendar(container : any){
		container.monthSelectHandler = (event: any): void => {
		  container._store.dispatch(container._actions.select(event.date));
		};
		container.setViewMode('year');
	  }


}
