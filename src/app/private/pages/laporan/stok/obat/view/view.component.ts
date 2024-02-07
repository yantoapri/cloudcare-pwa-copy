import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import {ModulInventoryService} from 'src/app/private/modul-api/modul-laporan/laporan-inventory'
import { FormBuilder,Validators} from "@angular/forms";
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
  constructor(
    private inventory:ModulInventoryService,
	private money:MoneyService,
    private fb: FormBuilder,
	private spinner:NgxSpinnerService
  ) { }
  formInput=null
  search=false
  minDate=new Date()
  maxDate=new Date()
  ngOnInit(): void {
	var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
	this.maxDate= new Date(y, m, d);
    this.formInput = this.fb.group({
			date_from: [ [new Date(y, m, 1), new Date()], [Validators.required]],
      status: ["all", [Validators.required]]
		})
  	this.dtOptions = this.showDataTables()
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
  searchAction(){
		this.reLoadData()
	}
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
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
					dataTablesParameters.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
					dataTablesParameters.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
					dataTablesParameters.transaksi_jenis=this.formInput.value.status;
					// dataTablesParameters.draw=1
					this.inventory.getStokObat(dataTablesParameters)
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
						data: 'created_at_unix',
						render(data: any, type: any, row: any, full: any) {
							return moment(new Date(data)).format("DD-MM-YYYY")
						}
					},
					{
						data: 'nama_barang'
					},
					{
						data: 'stok_masuk'
					},
					{
						data: 'stok_keluar'
					},
					{
						data:"harga_beli",
						render(data: any, type: any, row: any, full: any) {
							let val=row.transaksi_jenis=='keluar'?row.harga_jual:data
							return self.money.formatRupiah(val)
						}
					},
					{
						data: 'stok_akhir',
					},
					{
						data: 'no_batch',
					},
					{
						data: 'kegiatan',
					},
				],
				
			}
	
	}
}
