import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
// import { ModulResepService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-resep.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
// import * as ResepAction from 'src/app/private/states/resep/resep.action'
import { ObatPayload, FinishPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/resep-payload';


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
	dataResep: ObatPayload = new ObatPayload
	Resep: FinishPayload = new FinishPayload
	constructor(
		private ModalService: ModalService,
		// private ModulResepService: ModulResepService,
		private router: Router,
		private store: Store<fromApp.PrivateAppState>,) {
		this.getState = this.store.select('resep')
	}
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	btnCek=false
	view=false
	ngOnInit() {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='ATPJER3')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='ATPJER1')!=-1?true:false
		this.btnCek=item.findIndex((val)=>val.kode=='ATPJER2')!=-1?true:false
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
	}
	detail(data: any) {
		this.router.navigate(['/penjualan/e-resep/detail/' + 1])
	}


	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(edit) {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				let arr = [
					{ 'nama': 'Suprihatin', 'umur': 65, 'rm': 32323423, 'no_resep': 32312 },
					{ 'nama': 'Suprihatin', 'umur': 65, 'rm': 32323423, 'no_resep': 32312 },
				]
				callback({
					draw: 1,
					recordsTotal: arr.length,
					recordsFiltered: arr.length,
					data: arr
				})
				// this.ModulResepService.listDatatables(dataTablesParameters)
				// 	.subscribe((resp: any) => {
				// 		console.log(resp)
				// 		callback({
				// 			draw: resp.response.draw,
				// 			recordsTotal: resp.response.recordsTotal,
				// 			recordsFiltered: resp.response.recordsFiltered,
				// 			data: resp.response.data
				// 		})
				// 	})
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
					data: 'nama',
				},
				{
					data: 'umur',
				},
				{
					data: 'rm'
				},
				{
					data: 'no_resep'
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return edit?`<button class="btn btn-link circle-primary text-ui-primary detail" title="Selesaikan"><i class="fas fa-check-double"></i></button> `:'';
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
