import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulStokService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok-alat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import * as fromApp from 'src/app/private/states/private-app.states'
import { stokPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-payload'
import { MoneyService } from 'src/app/private/services/money'
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
	dataAlat: stokPayload = new stokPayload

	constructor(
		private modalService: ModalService,
		private ModulStokService: ModulStokService,
		private router: Router,
		private spinner : NgxSpinnerService,
		private MoneyService:MoneyService,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('stok_alat')
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
		// this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='IVKLAK2')!=-1?true:false
		this.btnDetail=item.findIndex((val)=>val.kode=='IVISAK2')!=-1?true:false
		this.view=item.findIndex((val)=>val.kode=='IVISAK1')!=-1?true:false
	
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

	detail(data: any) {
		const value = encodeURIComponent(data.nama_alat_kesehatan)
		this.router.navigate(['barang/stok/detail/' + data.id_alat_kesehatan+'/'+value])
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
	money(val){
		return this.MoneyService.formatRupiah(val)
	}
	showDataTables(det) {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.ModulStokService.listDatatables(dataTablesParameters)
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
					data: 'nama_alat_kesehatan'
				},
				{
					data: 'stok'
				},
				{
					data: 'ed_terdekat_unix',
					render(data: any, type: any, row: any, full: any) {
					  return data!=null?moment(new Date(data)).format('DD-MM-YYYY'):"Expired"
					}
				},
				{
					data: 'harga_jual',
					render(data: any, type: any, row: any, full: any) {
						return self.MoneyService.formatRupiah(data)
					}
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return det?`<button class="btn btn-link circle-primary text-ui-primary detail"><i class="far fa-eye"></i></button>`:'';

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
		this.modalService.open("modalFormContent");
	}

	modalClose() {
		this.modalService.close("modalFormContent")

	}

}
