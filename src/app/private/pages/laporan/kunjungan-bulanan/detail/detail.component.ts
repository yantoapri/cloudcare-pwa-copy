import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataTableDirective } from 'angular-datatables'
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import {ModulLaporanService} from 'src/app/private/modul-api/modul-laporan/laporan-kunjungan'
import {ModulLaporanExportService} from 'src/app/private/modul-api/modul-laporan/laporan-kunjungan-export'
@Component({
  selector: 'app-view',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
  constructor(
    private activatedRoute: ActivatedRoute,
	private spinner:NgxSpinnerService,
    private laporan:ModulLaporanService,
    private laporanExport:ModulLaporanExportService,
  ) { }

  params:any
  id_poliklinik=null
  date_month=null
  month=null
  poliklinik=null
	currentUser:any=localStorage.getItem('currentUser')
	ngOnInit(): void {
		this.currentUser=this.currentUser!=null?JSON.parse(this.currentUser):null
		this.params={
			"Authorization": this.currentUser.token,
			"x_api_key": this.currentUser.key,
			"search": {
				"value": "",
				"regex": false
			},
      "date_month":null,
			"transaksi_jenis": "masuk",
			"start":"",
			"end":"",
			"expired_in":0
		}
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.id_poliklinik=params.id
        this.poliklinik=params.poliklinik
        this.date_month=params.date_month
		this.params.date_month=params.date_month
		this.month=moment(new Date(parseInt(params.date_month))).format("MM-YYYY")
        this.dtOptions=this.showDataTables(params.date_month)
      }
    })
  }
  download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Detail Laporan Kunjungan Bulanan.xlsx`);
		document.body.appendChild(link);
		link.click();
	}

	export(){
		this.spinner.show('spinner1')
		this.params.id_poliklinik=this.id_poliklinik
		this.laporanExport.exportBulananDetail(this.params)
		.subscribe((resp: any) => {
			this.download(resp)
			this.spinner.hide('spinner1')
		})
	}
  showDataTables(date_month) {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.id_poliklinik=this.id_poliklinik
        		dataTablesParameters.date_month=date_month
				this.laporan.getBulananDetail(dataTablesParameters)
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
					data: 'tanggal',
          render(data: any, type: any, row: any, full: any) {
						return moment(data).format("DD-MM-YYYY")
					}
				},
        {
					data: 'pasien_bpjs'
				}, {
					data: 'pasien_reguler'
				}, {
					data: 'total_pasien'
				}
				],
				
		
		}
	}
}
