import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulPenjualanService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-penjualan.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as PenjualanAction from 'src/app/private/states/penjualan/penjualan.action'
import { PenjualanPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/penjualan-payload';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
import * as moment from 'moment';

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
	dataPenjualan: PenjualanPayload = new PenjualanPayload
	constructor(
		private ModalService: ModalService,
		private ModulPenjualanService: ModulPenjualanService,
		private router: Router,
		private money:MoneyService,
		private spinner : NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,) {
		this.getState = this.store.select('penjualan')
	}
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	ngOnInit() {
		this.spinner.show('spinner1')
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		// this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='ATPJPJ2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='ATPJDJ1')!=-1?true:false

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
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
	}
	detail(data: any) {
		this.router.navigate(['penjualan/data-penjualan/detail/' + data.id_penjualan])
	}


	buat_transaksi() {
		this.spinner.show('spinner1')
		this.store.dispatch(PenjualanAction.addInitial())
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables() {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.ModulPenjualanService.listRiwayat(dataTablesParameters)
					.subscribe((resp: any) => {
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
					data:'created_at_unix',
					render(data: any, type: any, row: any, full: any) {
			
						return moment(new Date(data)).format("DD-MM-YYYY")
					}
				},
				{
					data: 'total_bayar',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data.replace(".",",")))
					}
				},
				{
					data: 'nama_lengkap'
				},
				
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return `<button class="btn btn-link circle-primary text-ui-primary detail" title="title"><i class="far fa-eye"></i></button>`;
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

	ngOnDestroy(): void {
		document.body.classList.remove('jw-modal-open');
	}

	btnOpenModal() {
		this.ModalService.open("modalFormContent");
	}

	modalClose() {
		this.ModalService.close("modalFormContent")

	}

}
