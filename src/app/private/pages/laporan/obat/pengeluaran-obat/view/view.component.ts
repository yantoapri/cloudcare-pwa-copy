import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { FormBuilder, Validators} from "@angular/forms";
import {ModulPengeluaranService } from 'src/app/private/modul-api/modul-laporan/laporan-pengeluaran';
import {ModulPengeluaranExportService } from 'src/app/private/modul-api/modul-laporan/laporan-pengeluaran-export';

import * as moment from 'moment';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  constructor(
    private spinner : NgxSpinnerService,
    private router : Router,
    private pengeluaran:ModulPengeluaranService,
    private pengeluaranExport:ModulPengeluaranExportService,
    private fb : FormBuilder,
  ) { }
  formInput:any
  search=false
  params:any
	currentUser:any=localStorage.getItem('currentUser')
  minDate=new Date()
  maxDate=new Date()
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
      date_from: [ [new Date(y, m, 1), new Date()], [Validators.required]],
    });
    this.dtOptions=this.showDataTables()
  }

  reLoadData() {
    this.search=true
		if (this.formInput.invalid) {
		return
		}
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
      this.search=false
    });
  }
  detail(data){
    this.router.navigate(['laporan/obat/pengeluaran-obat/detail/'+data.id_barang+'/'+data.nama_barang+'/'+new Date(this.formInput.value.date_from[0]).getTime()+'/'
    +new Date(this.formInput.value.date_from[1]).getTime()])
  }
  convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
  download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Pengeluaran Obat.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
  export(){
   
    this.spinner.show('spinner1')
    this.params.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
    this.params.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
    this.pengeluaranExport.exportObat(this.params)
    .subscribe((resp : any) => {
      this.download(resp)
      this.search=false
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
        dataTablesParameters.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
        dataTablesParameters.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
        this.pengeluaran.getObat(dataTablesParameters)
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
          data: 'nama_barang'
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
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return ` <button  class="btn btn-link circle-primary text-ui-primary detail"><i class="far fa-eye"></i></button>`
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $('td .detail', row).on('click', () => {
          self.detail(data);
        });
        return row;
      }
    }
  }
}