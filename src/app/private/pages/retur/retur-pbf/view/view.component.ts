import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModulReturPbfService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-pbf';
import * as returAction from 'src/app/private/states/retur-gudang/retur.action'
import * as fromApp from 'src/app/private/states/private-app.states'
import { ReturGudang } from 'src/app/private/models/class-payload-api/gudang-transaksi/retur-gudang-payload';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";

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
	dataBarang: ReturGudang = new ReturGudang
	constructor(
		private modalService: ModalService,
		private ModulReturPbfService: ModulReturPbfService,
		private router: Router,
		private spinner : NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('retur_gudang')
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
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='ATRTPS2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='ATRTPS1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		this.dtOptions = this.showDataTables(this.btnEdit)
		this.getState.subscribe((state) => {
			this.reloadTable = state.reloadTable
			if (this.reloadTable === true) {
				this.reLoadData()
			}
		})
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 1000);
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(edit) {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.ModulReturPbfService.listDatatables(dataTablesParameters)
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
					data: 'created_at_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(data).format('DD-MM-YYYY')
					}
				},
				{
					data: 'kode_invoice_full'
				},
				{
					data: 'pembayaran',
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return edit?`<button class="btn btn-link circle-primary text-ui-primary detail"><i class="far fa-eye"></i></button>
                    <button class="btn btn-link circle-primary text-ui-primary nonaktif-data"><i class="far fa-trash-alt"></i></button>`:'';
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				
				$('td .detail', row).on('click', () => {
					self.detail(data);
				});
				$('td .nonaktif-data', row).on('click', () => {
					self.nonAktif(data);
				});
				return row;
			}
		}
	}
	detail(data: any) {
		this.router.navigate(['retur/retur-pbf/detail/' + data.id_gudang_retur])
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
					returAction.deleteInitial({ payload: { id: data.id_gudang_retur } })
				)
				setTimeout(() => {
					this.spinner.hide('spinner1')
				}, 400);
			}
		})
	}


	ngOnDestroy(): void {
		document.body.classList.remove('jw-modal-open');
	}

	btnOpenModal() {
		this.modalService.open("modalFormContent");
	}

}
