import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import {ModulBussinesIntelegentService} from 'src/app/private/modul-api/modul-laporan/bussines-intelegent'
import { Observable } from 'rxjs';
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';

import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { FormBuilder,Validators} from "@angular/forms";
import {MoneyService} from 'src/app/private/services/money/index'
import {
	ApexAxisChartSeries,
	ApexNonAxisChartSeries,
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
	labels: any;
  };
  export type ChartPieOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	legend:ApexLegend;
	responsive: ApexResponsive[];
	labels: any;
  };
@Component({
	selector: 'app-main',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
	data:any
	search=false
	formInput: any
	submit=false
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	listPoli=[]
	public barChartOptions: Partial<ChartOptions>;
	public barChartOptions2: Partial<ChartOptions>;
	public barChartOptions3: Partial<ChartOptions>;
	public barChartOptions4: Partial<ChartOptions>;
	public pieChart1Options:Partial<ChartPieOptions>;
	public pieChart2Options:Partial<ChartPieOptions>;
	constructor(
		private fb:FormBuilder,
		private ModulBussinesIntelegent:ModulBussinesIntelegentService,
		private MoneyService:MoneyService,
		private spinner : NgxSpinnerService,
		private ModulKlinik:DaftarPoliklinikService
		) { }
		minDate=new Date()
		maxDate=new Date()
	id_poliklinik=""
	pendaftaran={
		pasien_baru_bpjs: 0,
		pasien_baru_reguler: 0,
		total_pasien_baru:0
	}
	kunjungan={
		kunjungan_bpjs: 0,
		kunjungan_reguler: 0,
		resep_dokter: null,
		total_kunjungan: 0
	}
	divisi={
		dokter: [],
		farmasi: [],
		perawat: [],
		resepsionis: []
	}
	jenis_penyakit=[]
	obat_terbanyak=[]
	dataChartUsia={label:[],value:[]}
	dataChartPelayanan={label:[],value:[]}
	dataChartKunjungan={label:[],value:[]}
	dataChartTunggu={label:[],value:[]}
	dataChartGander={
		"total_kunjungan": 0,
		"laki_laki": 0,
		"perempuan": 0,
		"lain_lain": 0
	}
	waktu={
		"tunggu_perawat": "00:00:00",
		"pelayanan_perawat": "00:00:00",
		"tunggu_dokter": "00:00:00",
		"pelayanan_dokter": "00:00:00",
		"tunggu_farmasi": "00:00:00",
		"pelayanan_farmasi": "00:00:00",
		"rata_rata_pelayanan": "00:00:00",
		"rata_rata_tunggu": "Invalid date"
	}
	dataChartLokasi={
		"lain_lain": 0,
		"dalam": 0,
		"luar": 0
	}
	chartBarOption={
		chart: {
			type: 'bar',
			height: 350,
			stacked: true,
			toolbar: {
			  show: false,
			},
		},
			responsive: [
				{
				  breakpoint: 480,
				  options: {
					legend: {
					  position: 'bottom',
					  offsetX: -10,
					  offsetY: 0,
					},
				  },
				},
			  ],
			plotOptions: {
				bar: {
				  horizontal: false,
				  columnWidth: '30%',
				},
			  },
			dataLabels: {
				enabled: false,
			  },
			legend: {
				show: false,
			},
			fill: {
				// colors:["rgb(15, 173, 15)"],
				opacity: 0.8,
				colors: ['#01B8AA'],
			},
			tooltip: {
				theme: 'dark',
				marker: {
				  show: true,
				},
				x: {
				  show: true,
				},
			  },
		
	}
	loading=0
	periode=[new Date(),new Date()]
	ngOnInit() {
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.maxDate= new Date(y, m, d);
		this.formInput = this.fb.group({
			date_from: [[new Date(y, m, 1), new Date()], [Validators.required]],
			id_poliklinik:["", [Validators.required]]
		})
		this.ModulKlinik.getByAkunKlinik().subscribe((resp: any) => {
			this.listPoli=resp.response
		})
		this.pieCart1()
		this.pieCart2()
		this.barChart1()
		this.barChart2()
		this.barChart3()
		this.barChart4()
		if(this.loading==12){
			this.spinner.hide('spinner1')
		}
	}
	getTotal(data){
		let total=0
		data.map(val=>{
			total+=parseInt(val.total_kunjungan)
		})
		return total;
	}
	onFocus(id){
		document.getElementById(id).click()
	}
	async getData(){
		this.submit=false
		if(this.formInput.invalid){
			this.submit=true
			return false
		}
		this.periode=this.formInput.value.date_from
		this.submit=true
		this.spinner.show('spinner1')
		await this.getPendaftaran()
		await this.getDivisi()
		await this.getKunjungan()
		await this.getJenisPenyakit()
		await this.getChartGender()
		await this.getChartLokasi()
		await this.getChartUsia()
		await this.getChartWaktu()
		await this.getObatTerbanyak()
		await this.getWaktu()
		await this.getChartWaktuPelayanan()
		await this.getChartTunggu()
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 1200);
	}
	getParam(){
		return{
			"date_from": new Date(this.formInput.value.date_from[0]).getTime(),
			"date_to": new Date(this.formInput.value.date_from[1]).getTime(),
			"id_poliklinik":this.formInput.value.id_poliklinik
			
		}
	}
	getPendaftaran(){
		this.ModulBussinesIntelegent.getPendaftarPasien(this.getParam()).subscribe((resp: any) => {
			this.pendaftaran=resp.response
			
		})
	}
	getKunjungan(){
		this.ModulBussinesIntelegent.getKunjunganPasien(this.getParam()).subscribe((resp: any) => {
			this.kunjungan=resp.response
			
		})
	}
	getJenisPenyakit(){
		this.ModulBussinesIntelegent.getjenisPenyakit(this.getParam()).subscribe((resp: any) => {
			this.jenis_penyakit=resp.response
			
		})
	}
	getObatTerbanyak(){
		this.ModulBussinesIntelegent.getObatTerbanyak(this.getParam()).subscribe((resp: any) => {
			this.obat_terbanyak=resp.response
			
		})
	}
	getDivisi(){
		this.ModulBussinesIntelegent.getDivisi(this.getParam()).subscribe((resp: any) => {
			this.divisi=resp.response
			
		})
	}
	getWaktu(){
		this.ModulBussinesIntelegent.getWaktu(this.getParam()).subscribe((resp: any) => {
			this.waktu=resp.response
			
		})
	}
	getChartGender(){
		this.ModulBussinesIntelegent.getChartDataGender(this.getParam()).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataChartGander=resp.response[0]
				this.pieCart2()
				
			}
		})
	}
	getChartLokasi(){
		this.ModulBussinesIntelegent.getChartLokasi(this.getParam()).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataChartLokasi=resp.response
				this.pieCart1()
				
			}
		})
	}
	getChartWaktu(){
		this.ModulBussinesIntelegent.getChartWaktuPelayanan(this.getParam()).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				let data={label:resp.response.tanggal,value:resp.response.rata_rata_pelayanan}
				this.dataChartKunjungan=data
				this.barChart3()
			}
		})
	}
	getChartWaktuPelayanan(){
		this.ModulBussinesIntelegent.getChartWaktuKunjungan(this.getParam()).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				let data={label:resp.response.tanggal,value:resp.response.rata_rata_kunjungan}
				this.dataChartPelayanan=data
				this.barChart1()

				
			}
		})
	}
	getChartTunggu(){
		this.ModulBussinesIntelegent.getChartWaktuTunggu(this.getParam()).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				let data={label:resp.response.tanggal,value:resp.response.rata_rata_tunggu}
				this.dataChartTunggu=data
				this.barChart4()
				
			}
		})
	}
	getChartUsia(){
		this.ModulBussinesIntelegent.getChartUsiaPasien(this.getParam()).subscribe((resp: any) => {
		
			if(resp.metaData.response_code=="0000"){
				let data={label:resp.response.usia,value:resp.response.jumlah_kunjungan}
				this.dataChartUsia=data
				this.barChart2()
				
			}
		})
	}
	private pieCart1(){
		this.pieChart1Options={
			series: [this.dataChartLokasi.dalam,this.dataChartLokasi.luar,this.dataChartLokasi.lain_lain?this.dataChartLokasi.lain_lain:0],
			chart: {
				width: 380,
				type: "pie"
			},
			labels: ["Dalam", "Luar", "Lainnya"],
			responsive: [
				{
				breakpoint: 480,
				options: {
					chart: {
					width: 200
					},
					legend: {
					position: "bottom"
					}
				}
				}
			]
		}
	}
	private pieCart2(){
		this.pieChart2Options={
			series: [this.dataChartGander.laki_laki,this.dataChartGander.perempuan,this.dataChartGander.lain_lain],
			chart: {
				width: 380,
				type: "pie"
			},
			labels: ["Laki-laki", "Perempuan", "Lainnya"],
			responsive: [
				{
				breakpoint: 480,
				options: {
					chart: {
					width: 200
					},
					legend: {
						show: true,
						position: "bottom"
					}
				}
				}
			],
			
		}
	}
	private barChart1() {
		this.barChartOptions = {
		  series: [
			{
			  name: 'Satuan waktu dalam menit',
			  data: this.dataChartPelayanan.value,
			},
		  ],
		  xaxis: {
			title:{
				text:'Tanggal Kunjungan'
			},
			type:"datetime",
			labels: {
				format: 'dd/MM/yyyy',
			},
			categories: this.dataChartPelayanan.label,
		  },
		  yaxis: {
			title: {
			  text: 'Satuan Waktu Dalam Menit',
			},
			
		  },
		  
		};
	  }
	private barChart2() {
		this.barChartOptions2 = {
		  series: [
			{
			  name: 'Jumlah Pasien',
			  data: this.dataChartUsia.value,
			},
			
		  ],
		  yaxis: {
			title: {
				text: "Jumlah Pasien",
			},
		  },
		  xaxis: {
			title:{
				text:'Range usia pasien'
			},
			categories: this.dataChartUsia.label,
		  },
		 
		};
	  }
	private barChart3() {
		this.barChartOptions3 = {
		  series: [
			{
			  name: 'Satuan waktu dalam menit',
			  data: this.dataChartKunjungan.value,
			},
		  ],
		  xaxis: {
			title:{
				text:'Tanggal Kunjungan'
			},
			type:"datetime",
			categories: this.dataChartKunjungan.label,
			labels: {
				format: 'dd/MM/yyyy',
			}
		  },
		  yaxis: {
			title: {
			  text: 'Satuan Waktu Dalam Menit',
			},
			
		  },
		};
	  }
	private barChart4() {
		this.barChartOptions4 = {
		  series: [
			{
			  name: 'Satuan waktu dalam menit',
			  data: this.dataChartTunggu.value,
			},
			
		  ],
		  xaxis: {
			title:{
				text:'Tanggal Kunjungan'
			},
			type:"datetime",
			categories: this.dataChartTunggu.label,
			labels: {
				format: 'dd/MM/yyyy',
			}
		  },
		  yaxis: {
			title: {
			  text: 'Satuan Waktu Dalam Menit',
			},
		  },
		};
	  }
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
	
	setMoney(val){
		return this.MoneyService.formatRupiah(val)
	}
	setDate(val){
		return moment(val).format("DD-MM-YYYY")
	}

}
