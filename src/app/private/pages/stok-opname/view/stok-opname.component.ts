import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulStokOpnameObatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok-opname-obat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as StokOpnameAction from 'src/app/private/states/stok-opname/stok-opname.action'
import { StokOpnameObatPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
@Component({
	selector: 'app-stok-opname',
	templateUrl: './stok-opname.component.html',
	styleUrls: ['./stok-opname.component.sass']
})
export class StokOpnameComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataObat: StokOpnameObatPayload = new StokOpnameObatPayload

	constructor(
		private modalService: ModalService,
		private spinner : NgxSpinnerService,
		private modulStokOpname: ModulStokOpnameObatService,
		private router: Router,
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
		this.spinner.show('spinner1')
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='IVSOAS2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='IVSOAS1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		this.dtOptions = this.showDataTables()

		this.getState.subscribe((state) => {
			this.reloadTable = state.reloadTable
			if (this.reloadTable === true) {
				this.reLoadData()
			}
		})
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables() {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpname.listRiwayat(dataTablesParameters)
					.subscribe((resp: any) => {
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
			],
			
		}
	}


	mulai() {
		Swal.fire({
			title: 'Apa anda yakin?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, lanjutkan!',
			cancelButtonText: 'Batal',
		}).then(res=>{
			if(res.isConfirmed){
				this.store.dispatch(
					StokOpnameAction.startInitial()
				)
			}
		})
	}
	go(path) {
		this.router.navigate([path])
	}
	open(content) {
		this.modalService.open(content)
	}
	modalClose(content) {
		this.modalService.close(content)
	}
}
