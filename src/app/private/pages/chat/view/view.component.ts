import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulObatService } from 'src/app/private/modul-api/modul-master-node/modul-obat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DataObatActions from 'src/app/private/states/master-data/data-obat/data-obat.actions'
import { DataObatPayload } from 'src/app/private/models/class-payload-api/master-data/data-obat-payload';
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit, OnDestroy {

	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataObat: DataObatPayload = new DataObatPayload
	dropdown = false
	resepSelected = false
	rmSelected = false
	profilSelected = false
	chatSelesai = false
	resepNew = false
	constructor(
		private modalService: ModalService,
		private modulObatService: ModulObatService,
		private router: Router,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('masterData_dataObat')
	}

	ngOnInit(): void {
		this.dtOptions = this.showDataTables()
		this.getState.subscribe((state) => {
			this.reloadTable = state.reloadTable
			if (this.reloadTable === true) {
				this.reLoadData()
			}
		})
	}

	editData(data: any) {
		this.router.navigate(['katalog-obat', 'katalog', 'edit-buat-baru', data.id_obat])
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
				this.store.dispatch(
					DataObatActions.deleteInitial({ payload: { id: data.id_obat } })
				)
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
				this.modulObatService.listDatatables(dataTablesParameters)
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
					data: 'nama_obat'
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return `<button class="btn btn-sm btn-ubah update-data">Edit</button>
                    <button class="btn nonaktif-data btn-hapus btn-sm">Hapus</button>`;
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				// Note: In newer jQuery v3 versions, `unbind` and `bind` are
				// deprecated in favor of `off` and `on`
				$('td .update-data', row).on('click', () => {
					self.editData(data);
				});
				$('td .nonaktif-data', row).on('click', () => {
					self.nonAktif(data);
				});
				return row;
			}
		}
	}
	addObat() {
		this.modalOpen()
	}
	ngOnDestroy(): void {
		document.body.classList.remove('jw-modal-open');
	}

	modalOpen() {
		this.modalService.open("modalFormContent");
	}

	modalClose() {
		this.modalService.close("modalFormContent")

	}
	detailObatClose() {
		this.modalService.close("detailObat")
	}
	detailObatOpen() {
		this.modalService.open("detailObat")
	}
	inputRekamMedis() {
		this.router.navigate(['/chat/rekam-medis'])
	}

}
