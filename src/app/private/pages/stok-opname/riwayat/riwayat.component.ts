import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulStokOpnameObatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok-opname-obat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import * as fromApp from 'src/app/private/states/private-app.states'
@Component({
	selector: 'app-riwayat',
	templateUrl: './riwayat.component.html',
	styleUrls: ['./riwayat.component.sass']
})
export class RiwayatComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	constructor(
		private modulStokOpname: ModulStokOpnameObatService,
		private spinner : NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('stok_opname')
	}
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	ngOnInit(): void {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		// this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='IVSOAS2')!=-1?true:false
		this.btnDetail=item.findIndex((val)=>val.kode=='IVSORS2')!=-1?true:false
		this.view=item.findIndex((val)=>val.kode=='IVSORS1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		this.dtOptions = this.showDataTables()
	}
	showDataTables() {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpname.listRiwayat(dataTablesParameters)
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
					data: 'waktu_mulai_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format('DD-MM-YYYY')
					}
				},
				{
					data: 'waktu_selesai_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format('DD-MM-YYYY')
					}
				},
				{
					data: 'status_proses',
					render(data: any, type: any, row: any, full: any) {
						return data == 1 ? 'Sudah Selesai' : 'Belum Selesai'
					}
				}
			]
		}
	}

}
