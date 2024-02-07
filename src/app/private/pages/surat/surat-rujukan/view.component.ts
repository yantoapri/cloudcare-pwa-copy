import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import * as moment from 'moment'
import { NgxSpinnerService } from "ngx-spinner";
import {ModulSuratService} from "src/app/private/modul-api/modul-laporan/lapran-surat"
import {ModulSuratExportService} from "src/app/private/modul-api/modul-laporan/laporan-surat-export"
import { AESService } from 'src/app/private/services/AES/aes'
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
  constructor(
		private spinner:NgxSpinnerService,
		private surat:ModulSuratService,
		private suratExport:ModulSuratExportService,
		private aes:AESService,
    ) {
    }
    tgl=[new Date(),new Date()]
	minDate=new Date()
	maxDate=new Date()
	keyGen:any
	ngOnInit(): void {
		let auth=localStorage.getItem('currentUser')?JSON.parse(localStorage.getItem('currentUser')):null
    	this.keyGen=auth?this.aes.getKeyLogin(auth):''
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		this.minDate = new Date(y, m, 1);
		this.maxDate= new Date(y, m + 1, 0);
		this.dtOptions = this.showDataTables()
		this.tgl=[new Date(y, m, 1),new Date()]
  	}
  download(resp,file){
	const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', file);
	document.body.appendChild(link);
	link.click();
}
convertTime(tgl){
	let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
	return new Date(time).getTime()
}
dekryp(val){
	try{
		return this.aes.decrypt(val,this.keyGen.key,this.keyGen.iv,256)
	}
	catch(err){
		return val
	}
}
exportAll(){
	this.spinner.show('spinner1')
	let currentUser:any=localStorage.getItem('currentUser')
	currentUser=currentUser!=null?JSON.parse(currentUser):null
	let param={
		"Authorization": currentUser.token,
		"x_api_key": currentUser.key,
		date_from:0,
		date_to:0
	}
	if(this.tgl!=null){
		param.date_from=this.convertTime(this.tgl[0])
		param.date_to=this.convertTime(this.tgl[1])
		this.suratExport.exportSuratRujukan(param,"")
			.subscribe((resp: any) => {
				this.spinner.hide('spinner1')
			this.download(resp,`Surat Rujukan.xlsx`)
		})
	}
}
export(data){
	this.spinner.show('spinner1')
	let currentUser:any=localStorage.getItem('currentUser')
	currentUser=currentUser!=null?JSON.parse(currentUser):null
	let param={
		"Authorization": currentUser.token,
		"x_api_key": currentUser.key,
		date_from:0,
		date_to:0
	}
	if(this.tgl!=null){
		param.date_from=this.convertTime(this.tgl[0])
		param.date_to=this.convertTime(this.tgl[1])
		this.suratExport.exportSuratRujukan(param,data.id_diagnosa_surat_rujukan)
			.subscribe((resp: any) => {
				this.spinner.hide('spinner1')
				let tgl=moment(new Date(data.tgl_antrian_unix)).format('DD/MM/YYYY')
			this.download(resp,`Surat Rujukan-${data.nama}-${tgl}-${data.full_rm}.pdf`)
		})
	}
}
  convertDate(val){
	return moment(new Date(val)).format('DD/MM/YYYY')
  }
  getAge(dateString) {
    var today = new Date();
	let dateDekrip=this.dekryp(dateString)
    var birthDate = new Date(dateDekrip!=''?dateDekrip:dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
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
				dataTablesParameters.date_from=this.convertTime(this.tgl[0])
				dataTablesParameters.date_to=this.convertTime(this.tgl[1])
				this.surat.getSuratRujukan(dataTablesParameters).subscribe((resp: any) => {
						this.spinner.hide('spinner1')
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
						})
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
					data: 'full_rm',
				},
				{
					data: 'nama',
				},
				{
					data: 'tipe_pasien'
				},
				{
					data: 'jenis_kelamin'
				},
				{
					data: 'tgl_lahir',
					render(data: any, type: any, row: any, full: any) {
						return self.getAge(data)
					}
				},
				{
					data: 'tgl_antrian_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format('DD-MM-YYYY')
					}

				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return `<button class="btn btn-link circle-primary text-ui-primary cetak" title="cetak"><i class='fa fa-print'></i></button>`

					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
		
				$('td .cetak', row).on('click', () => {
					self.cetak(data);
				});

				return row;
			}
		}
	}
  reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
  cetak(data){
	this.export(data)
  }

}
