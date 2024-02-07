import { Component,ViewChildren, OnInit,QueryList } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable, Subject } from 'rxjs';
import {ModulPenjualanService} from 'src/app/private/modul-api/modul-laporan/laporan-penjualan'
import {ModulPenjualanExportService} from 'src/app/private/modul-api/modul-laporan/laporan-penjualan-export'
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators} from "@angular/forms";
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
import {
	ApexAxisChartSeries,
	ApexChart,
	ApexXAxis,
	ApexDataLabels,
	ApexTooltip,
	ApexYAxis,
	ApexPlotOptions,
	ApexStroke,
	ApexLegend,
	ApexFill,
	ApexResponsive,
	ApexMarkers
} from 'ng-apexcharts';
export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	xaxis: ApexXAxis;
	yaxis: ApexYAxis;
	stroke: ApexStroke;
	tooltip: ApexTooltip;
	dataLabels: ApexDataLabels;
	legend: ApexLegend;
	responsive: ApexResponsive[];
	plotOptions: ApexPlotOptions;
	fill: ApexFill;
	colors: string[];
	markers:ApexMarkers
};
@Component({
	selector: 'app-main',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
	public cardChart1: any;
	public cardChart1Data: any;
	public cardChart1Label: any;

	public cardChart2: any;
	public cardChart2Data: any;
	public cardChart2Label: any;

	public cardChart3: any;
	public cardChart3Data: any;
	public cardChart3Label: any;

	public cardChart4: any;
	public cardChart4Data: any;
	public cardChart4Label: any;

	public areaChartOptions: Partial<ChartOptions>;
	public barChartOptions: Partial<ChartOptions>;
	@ViewChildren(DataTableDirective) datatableElement: QueryList<DataTableDirective>
	dtOptions: DataTables.Settings = {};
	dtElements: QueryList<DataTableDirective>;
	dtOptionsPenjualanOmset: DataTables.Settings = {};
	dtOptionsPenjualanObat: DataTables.Settings = {};
	dtOptionsPenjualanAlat: DataTables.Settings = {};
	dtTrigger1: Subject<any> = new Subject();
  	dtTrigger2: Subject<any> = new Subject();
	search=false
	showTable=false
	reloadTable: boolean
	getState: Observable<any>;
	formInput=null
	dataPenjualan={
		jlm_penjualan: 0,
		rata_rata_penjualan:0,
		total_penjualan: 0
	}
	labelGrafik=[]
	dataGrafik={data:[],category:[]}
	constructor(
		private ModulPenjualanService:ModulPenjualanService,
		private exportPenjualan:ModulPenjualanExportService,
		private fb: FormBuilder,
		private spinner:NgxSpinnerService ,
		private activatedRoute: ActivatedRoute,
		private money:MoneyService
	) { }
	params:any
	currentUser:any=localStorage.getItem('currentUser')
	minDate=new Date()
	maxDate=new Date()
	ngOnInit(): void {
		
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		this.minDate = new Date(y, m, 1);
		this.maxDate= new Date(y, m + 1, 0);
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
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params.tgl1!=undefined) {
				this.formInput = this.fb.group({
					date_month: [[new Date(params.tgl1),new Date(params.tgl2)], [Validators.required]],
				})
			}else{
				this.formInput = this.fb.group({
					date_month: [ [new Date(y, m, 1), new Date()], [Validators.required]],
				})
				console.log(new Date(y, m, 1), new Date())
			}
		})
	
		this.chart1();
		this.spinner.show('spinner1')
		this.dtOptionsPenjualanOmset = this.showDataPenjualanHarian()
		this.dtOptionsPenjualanAlat = this.showDataPenjualanAlat()
		
		this.getPenjualanOmset()
		this.getGrafikData()
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 1600);
	}
	onOpenCalendar(container : any){
		container.monthSelectHandler = (event: any): void => {
		  container._store.dispatch(container._actions.select(event.date));
		};
		container.setViewMode('month');
	  }
	reLoadData() {
		this.spinner.show('spinner1')
		this.getPenjualanOmset()
		this.getGrafikData()
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
	
	
	getGrafikData(){
		let param={
			"unixtime_start":new Date(this.formInput.value.date_month[0]).getTime(),
			"unixtime_end":new Date(this.formInput.value.date_month[1]).getTime()
		}
		this.ModulPenjualanService.getPenjualanGrafikAlat(param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataGrafik.category=resp.response.label
				this.dataGrafik.data=[
					{
						name: "Total transaksi",
						data:resp.response.value,
					}
				]
				
				this.chart1();
			}
		})
	}
	getPenjualanOmset(){
		let params={
		    "unixtime_start": new Date(this.formInput.value.date_month[0]).getTime(),
		    "unixtime_end": new Date(this.formInput.value.date_month[1]).getTime()
		}
		this.ModulPenjualanService.getPenjualanAlatOmset(params).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataPenjualan=resp.response
			}
		})
	}
	setMoney(val){
		return this.money.formatRupiah(val)
	}
	searchAction(){
		this.search=true
		if (this.formInput.invalid) {
				return false
			}
		this.reLoadData()
	}
	download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Penjualan Dan Omset Obat.xlsx`);
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
			"unixtime_start": 0,
			"unixtime_end": 0
		}
		param.unixtime_start=new Date(this.formInput.value.date_month[0]).getTime()
		param.unixtime_end=new Date(this.formInput.value.date_month[1]).getTime()
		this.exportPenjualan.exportAlatHarian(param)
					.subscribe((resp: any) => {
			this.download(resp)
			this.spinner.hide('spinner1')
		})
	}
	exportAlat(){
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
			"unixtime_start": 0,
			"unixtime_end": 0
		}
		param.unixtime_start=new Date(this.formInput.value.date_month[0]).getTime()
		param.unixtime_end=new Date(this.formInput.value.date_month[1]).getTime()
		this.exportPenjualan.exportAlat(param)
					.subscribe((resp: any) => {
			this.download(resp)
			this.spinner.hide('spinner1')
		})
	}
	showDataPenjualanAlat() {
		this.spinner.show('spinner1')
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
			    dataTablesParameters.unixtime_start=new Date(this.formInput.value.date_month[0]).getTime()
			    dataTablesParameters.unixtime_end=new Date(this.formInput.value.date_month[1]).getTime()
				this.ModulPenjualanService.getPenjualanAlat(dataTablesParameters)
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
					data: 'produk',
				},
				{
					data: 'jumlah'
				},
				{
					data: 'satuan'
				},
				{
					data: 'total_penjualan',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
				},
			],

		}
	}
	showDataPenjualanHarian() {
		this.spinner.show('spinner1')
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			searching:false,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				 dataTablesParameters.unixtime_start=new Date(this.formInput.value.date_month[0]).getTime()
			    dataTablesParameters.unixtime_end=new Date(this.formInput.value.date_month[1]).getTime()
				this.ModulPenjualanService.getPenjualanHarianAlat(dataTablesParameters)
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
					data: 'formatted_date',
					render(data: any, type: any, row: any, full: any) {
						return moment(data).format("DD-MM-YYYY")
					}
				},
				{
					data: 'total_bayar',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
				},
			],

		}
	}
	

	private chart1() {
		this.areaChartOptions = {
			series: this.dataGrafik.data!=undefined?this.dataGrafik.data:[],
			chart: {
				height: 350,
				type: 'line',
				toolbar: {
					show: false,
				},
				// foreColor: '#03a9f3',
			},
			legend:{
				show:false
			},
			colors: ['#407fe4'],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'straight',
				width:2
			},
			markers: {
				size: 6,
				hover: {
					size: 10
				}
			},
			yaxis:{
				title:{
					text:"Penjualan"
				}
			},
			xaxis: {
				title:{
					text:"Tanggal transaksi"
				},
				type: 'datetime',
				labels: {
					format: 'dd/MM/yyyy',
				},
				categories: this.dataGrafik.category,
				
			},
			tooltip: {
				theme: 'light',
				marker: {
					show: true,
				},
				x: {
					show: true,
				},
			},
		};
	}

}
