import { Component, OnInit,ViewChild } from '@angular/core';
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
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='ATPJPJ2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='ATPJPJ1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		this.dtOptions = this.showDataTables(this.btnDetail)
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
	addData(data: any) {
		this.router.navigate(['penjualan/penjualan-kasir/add/' + data.id_penjualan])
	}

	nonAktif(data: any) {
		Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, hapus saja!',
			cancelButtonText: 'Tidak, Batalkan'
		}).then((result) => {
			if (result.value) {
				this.spinner.show('spinner1')
				this.store.dispatch(
					PenjualanAction.deleteInitial({ payload: { id: data.id_penjualan } })
				)
				setTimeout(() => {
					this.spinner.hide('spinner1')
				}, 400);
			}
		})
	}
	buat_transaksi() {
		Swal.fire(
			{
				title: 'Apa anda yakin?',
				icon: 'warning',
				showCancelButton: true,
				allowOutsideClick: false,
				confirmButtonText: 'Ya, lanjutkan!',
				cancelButtonText: 'Batal',
			}
		).then((result) => {
			if (result.isConfirmed) {
				this.store.dispatch(PenjualanAction.addInitial())
				setTimeout(()=>{
					this.reLoadData()
				},400)
			}
		})
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(add) {
		this.spinner.show('spinner1')
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.ModulPenjualanService.listDatatables(dataTablesParameters)
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
					data: 'total_harga',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data.replace(".",",")))
					}
				},
				{
					data: 'diskon_rupiah',
					render(data: any, type: any, row: any, full: any) {
						return data == null ? 0 : data
					}
				},
				{
					data: 'total_harga',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(data-row.diskon_rupiah)
					}
				},
				{
					data: 'nama_lengkap'
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return add?`<button class="btn btn-link circle-primary text-ui-primary update-data"><i class="far fa-edit"></i></button>
                    <button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>`:'';
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .update-data', row).on('click', () => {
					self.addData(data);
				});
				$('td .nonaktif-data', row).on('click', () => {
					self.nonAktif(data);
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
