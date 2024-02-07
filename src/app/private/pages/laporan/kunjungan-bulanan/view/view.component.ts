import { Component, OnInit,ViewChild } from '@angular/core';
import {ModulLaporanService} from 'src/app/private/modul-api/modul-laporan/laporan-kunjungan'
import {ModulLaporanExportService} from 'src/app/private/modul-api/modul-laporan/laporan-kunjungan-export'
import { DataTableDirective } from 'angular-datatables'
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';
import { FormBuilder, Validators } from "@angular/forms";
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	
	
  constructor(
	private fb: FormBuilder,
    private laporan:ModulLaporanService,
	private laporanExport:ModulLaporanExportService,
	private router : Router,
	private spinner:NgxSpinnerService,
	private DaftarPoliklinikService:DaftarPoliklinikService
  ) { 

  }
  
  formInput=null
  listPoliklinik=[]
  search=false
  listKunjungan=[]
  tableShow=false
  params:any
  maxDate=new Date()
	currentUser:any=localStorage.getItem('currentUser')
	ngOnInit(): void {
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.maxDate= new Date(y, m+1, d);
		this.spinner.show('spinner1')
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
		date_month: [new Date(), [Validators.required]],
		jenis_pasien: ['', [Validators.required]],
		id_poliklinik: ["all", []],
		})
	this.DaftarPoliklinikService.getByAkunKlinik().subscribe((resp: any) => {
		if(resp.metaData.response_code=="0000"){
		  this.listPoliklinik=resp.response
		  this.spinner.hide('spinner1')
		}
	})
	this.dtOptions=this.showDataTables()
  }
  convertTime(tgl){
	let date=new Date(tgl)
	tgl=new Date(date.getFullYear(),date.getMonth(),1)
	let time= moment(tgl).format("YYYY-MM-DD")+' 00:00:00'
	return new Date(time).getTime()
   }
  reLoadData() {
	this.DaftarPoliklinikService.getByAkunKlinik().subscribe((resp: any) => {
		if(resp.metaData.response_code=="0000"){
		  this.listPoliklinik=resp.response
		}
	})
	this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
		dtInstance.ajax.reload();
		this.search=false
	});
	
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
		link.setAttribute('download', `Laporan Kunjungan Bulanan.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	export(){
		this.spinner.show('spinner1')
		this.search=true
		this.params.date_month=new Date(this.formInput.value.date_month).getTime()
		this.params.jenis_pasien=this.formInput.value.jenis_pasien!=''?this.formInput.value.jenis_pasien:'all'
		this.params.id_poliklinik=this.formInput.value.id_poliklinik
		this.laporanExport.exportBulanan(this.params).subscribe((resp: any) => {
			this.download(resp)
			this.search=false
			this.spinner.hide('spinner1')
		})
	}
  showDataTables() {
	this.spinner.show('spinner1')
	this.tableShow=true
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.date_month=this.convertTime(this.formInput.value.date_month)
				this.laporan.getBulanan(dataTablesParameters)
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
				}, {
					data: 'nama_poliklinik'
				},
        {
					data: 'pasien_bpjs'
				}, {
					data: 'pasien_reguler'
				}, {
					data: 'total_pasien'
				},{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
					  return `<button class="btn btn-link circle-primary text-ui-primary detail"><i class="far fa-eye"></i></button>`
					}
				  }
				],
				rowCallback: (row: Node, data: any[] | Object, index: number) => {
				  const self = this;
				 
				  $('td .detail', row).on('click', () => {
					self.detail(data);
				  });
				  return row;
				}
		
		}
	}
	detail(data){
		this.router.navigate(['laporan/kunjungan-bulanan/detail/'+data.id_poliklinik+'/'+data.nama_poliklinik+'/'+this.convertTime(this.formInput.value.date_month)])
	  }
  onOpenCalendar(container : any){
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

}
