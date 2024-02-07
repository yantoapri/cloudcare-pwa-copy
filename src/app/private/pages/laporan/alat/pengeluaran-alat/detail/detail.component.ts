import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataTableDirective } from 'angular-datatables'
import { NgxSpinnerService } from "ngx-spinner";
import {ModulPengeluaranService } from 'src/app/private/modul-api/modul-laporan/laporan-pengeluaran';
import {ModulPengeluaranExportService } from 'src/app/private/modul-api/modul-laporan/laporan-pengeluaran-export';
import * as moment from 'moment';
@Component({
  selector: 'app-view',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  constructor(
    private spinner : NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private pengeluaran:ModulPengeluaranService,
    private pengeluaranExport:ModulPengeluaranExportService,
  ) { }
  alat=""
  periode=""
  params:any
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
    "id_barang": "4cd91923-70bf-43ea-a827-38668daeca63",
    "date_from": "2023-03-01",
    "date_to": "2023-03-21"
}
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params) {
        this.alat=params.alat
        this.params.date_from=params.tgl1
        this.params.date_to=params.tgl2
        this.periode=moment(new Date(parseInt(params.tgl1))).format("DD/MM/YYYY")+" - "
        +moment(new Date(parseInt(params.tgl2))).format("DD/MM/YYYY")
        this.params.id_barang=params.id
        this.dtOptions=this.showDataTables()
      }
    })
  }
  download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Detail Laporan Pengeluaran Alat Kesehatan.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
 
  export(){
   
    this.spinner.show('spinner1')
    this.pengeluaranExport.exportAlatDetail(this.params)
    .subscribe((resp : any) => {
      this.download(resp)
      this.spinner.hide('spinner1')
    })
  }
  showDataTables() {
    this.spinner.show('spinner1')
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        dataTablesParameters.date_from=this.params.date_from
        dataTablesParameters.date_to=this.params.date_to
        dataTablesParameters.id_barang=this.params.id_barang
        this.pengeluaran.getAlatDetail(dataTablesParameters)
        .subscribe((resp : any) => {
          callback({
            draw: resp.response.draw,
            recordsTotal: resp.response.recordsTotal,
            recordsFiltered: resp.response.recordsFiltered,
            data: resp.response.data
          })
          this.spinner.hide('spinner1')
        })
      },
      columns : [
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
            let tgl=data.split("-")
            return tgl[2]+"-"+tgl[1]+'-'+tgl[0]
          }
        },
        {
          data: 'jumlah_bpjs'
        },
        {
          data: 'jumlah_reguler'
        },
        {
          data: 'jumlah_langsung'
        },
        {
          data: 'jumlah_total'
        },
        {
          data: 'stok_akhir'
        },
       
      ],
    }
  }
}
