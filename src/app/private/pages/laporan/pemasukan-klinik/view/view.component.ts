import { Component, OnInit,ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { FormBuilder,Validators} from "@angular/forms";
import {MoneyService} from 'src/app/private/services/money/index'
import { ModulPemasukanKlinikService } from 'src/app/private/modul-api/modul-laporan/pemasukan-klinik'
import { ModulPemasukanKlinikExportService } from 'src/app/private/modul-api/modul-laporan/pemasukan-klinik-export'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  constructor(
    private spinner : NgxSpinnerService,
    private router : Router,
    private pemasukan:ModulPemasukanKlinikService,
    private pemasukanExport:ModulPemasukanKlinikExportService,
    private money:MoneyService,
    private fb : FormBuilder,
  ) { }
  formInput:any
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  dtOptions: DataTables.Settings = {};
  reloadTable : boolean
  maxDate=new Date()
  search=false
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
      date_from: [[new Date(y, m, 1),new Date()], [Validators.required]],
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
    });
    this.search=false
  }
  detail(data){
    let from=new Date(this.formInput.value.date_from[0]).getTime()
    let to=new Date(this.formInput.value.date_from[1]).getTime()
    this.router.navigate(['laporan/pemasukan-klinik/detail/'+data.id_poliklinik+'/'+data.nama_poliklinik+'/'+from+'/'+to])
  }
  download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Pemasukan Klinik.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
  export(){
    this.search=true
    if (this.formInput.invalid) {
      return
    }
    this.spinner.show('spinner1')
    this.params.month=new Date(this.formInput.value.date_from).getTime()
        this.pemasukanExport.getDataExport(this.params)
        .subscribe((resp : any) => {
          this.download(resp)
          this.search=false
          this.spinner.hide('spinner1')
        })
  }
  showDataTables() {
    let self=this
    this.spinner.show('spinner1')
    return {
      searching: false,
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        dataTablesParameters.date_from=new Date(this.formInput.value.date_from[0]).getTime()
        dataTablesParameters.date_to=new Date(this.formInput.value.date_from[1]).getTime()

        this.pemasukan.getData(dataTablesParameters)
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
          data: 'nama_poliklinik'
        },
        {
          data: 'kunjungan_bpjs'
        },
        {
          data: 'pemasukan_bpjs',
          render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
        },
        {
          data: 'kunjungan_reguler'
        },
        {
          data: 'pemasukan_reguler',
          render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
        },
        {
          data: 'pemasukan_total',
          render(data: any, type: any, row: any, full: any) {
						return data==null?self.money.formatRupiah(0):self.money.formatRupiah(parseInt(data))
					}
        },
        {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return `<button class="btn btn-link circle-primary text-ui-primary detail"><i class="far fa-eye"</i></button>`
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
  onOpenCalendar(container : any){
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

}
