import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import {ModulStatistikPasienService} from 'src/app/private/modul-api/modul-laporan/statistik-pasien'
import {ModulStatistikPasienExportService} from 'src/app/private/modul-api/modul-laporan/statistik-pasien-export'
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { FormBuilder,Validators} from "@angular/forms";
import * as moment from 'moment';
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { AESService } from 'src/app/private/services/AES/aes'
@Component({
	selector: 'app-main',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
	
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	
	listObatKeluar={penjualan:0,resep_dokter:0}
	constructor(
		private fb: FormBuilder,
		private auth:AuthService,
		private aes:AESService,
		private spinner: NgxSpinnerService,
		private ModulStatistikPasienService:ModulStatistikPasienService,
		private statistikExport:ModulStatistikPasienExportService

	) { }
	
	dataPendaftaran={pasien_baru_bpjs:0,pasien_baru_reguler:0,total_pasien_baru:0}
	dataKunjungan={kunjungan_bpjs:0,kunjungan_reguler:0,total_kunjungan:0}
	listObat=[]
	param={}
	formInput=null
	search=false
	tableShow=false
	params:any
	minDate=new Date()
	maxDate=new Date()
	currentUser:any=localStorage.getItem('currentUser')
	keyGen:any
	ngOnInit(): void {
    	this.keyGen=this.aes.getKeyLogin(this.auth.currentUserValue)
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
			date_from: [ [new Date(y, m, 1), new Date()], [Validators.required]]
		})
		this.loadData()
		// this.dtOptions = this.showDataTables()
	}
	dekryp(val){
		try{
			return this.aes.decrypt(val,this.keyGen.key,this.keyGen.iv,256)
		}
		catch(err){
			return val
		}
	}
	reLoadData() {
		this.loadData()
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
	async loadData(){
		this.spinner.show('spinner1')
		this.param={
			"date_from": new Date(this.convertTime(this.formInput.value.date_from[0])).getTime(),
    		"date_to": new Date(this.convertTime(this.formInput.value.date_from[1])).getTime(),
		}
		await this.ModulStatistikPasienService.getKunjunganPasien(this.param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataKunjungan=resp.response
			}
		})
		await this.ModulStatistikPasienService.getPendaftaranPasien(this.param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataPendaftaran=resp.response
			}
		})
		
		await this.ModulStatistikPasienService.getObatKeluar(this.param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.listObatKeluar=resp.response
				this.spinner.hide('spinner1')
			}
		})
	}
	async searchAction(){
		
		if (this.formInput.invalid) {
			return false
		}
		this.search=true
		this.spinner.show('spinner1')
		this.param={
			"date_from": moment(this.convertTime(this.formInput.value.date_from[0])).format("YYYY-MM-DD"),
    		"date_to": moment(this.convertTime(this.formInput.value.date_from[1])).format("YYYY-MM-DD"),
		}
		await this.ModulStatistikPasienService.getKunjunganPasien(this.param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataKunjungan=resp.response
			}
		})
		await this.ModulStatistikPasienService.getPendaftaranPasien(this.param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.dataPendaftaran=resp.response
			}
		})
		
		await this.ModulStatistikPasienService.getObatKeluar(this.param).subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.listObatKeluar=resp.response
			}
			this.spinner.hide('spinner1')
		})
	}
	download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Statistik Pasien.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	exportPasien(){
		this.spinner.show('spinner1')
		this.search=true
		if(this.formInput.invalid){
			return false
		}
		this.params.date_from=moment(this.convertTime(this.formInput.value.date_from[0])).format("YYYY-MM-DD")
		this.params.date_to=moment(this.convertTime(this.formInput.value.date_from[1])).format("YYYY-MM-DD")
		this.statistikExport.exportPasien(this.params)
		.subscribe((resp: any) => {
			this.download(resp)
			this.spinner.hide('spinner1')			
		})
	}
	showDataTables() {
		let self=this
		this.spinner.show('spinner1')
		this.tableShow=true
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
				dataTablesParameters.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
				this.ModulStatistikPasienService.getlistPasien(dataTablesParameters)
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
					data: 'nama',
				},
				{
					data: 'jenis_kelamin'
				},
				{
					data: 'alamat',
					render(data: any, type: any, row: any, full: any) {
						let alamat=self.dekryp(data)
						return alamat!=''?alamat:data
					  }
				},
				{
					data: 'status_input_pasien',
				},
				
			],
			
		}
	}
	detail(data: any) {
		// this.router.navigate(['retur/retur-penjualan/detail/' + data.id_retur])
	}

	

}
