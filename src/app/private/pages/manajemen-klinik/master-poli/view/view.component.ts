import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MasterPoliService } from 'src/app/private/services/manajemen-klinik/master-poli.service';
import { MasterPoliPayload } from "src/app/private/models/class-payload-api/manajemen-klinik/master-poli-payload";
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as fromApp from 'src/app/private/states/private-app.states'
import * as MasterPoliActions from 'src/app/private/states/manajemen-klinik/master-poli/master-poli.actions'
import { ModalService } from 'src/app/shared/_modal';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	getState: Observable<any>;
	@ViewChild('formContent') formContent: any;
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	public formTambah: FormGroup;
	titleModal: string
	aksiModal: string
	isEdit: boolean
	isLoadingButton: boolean
	reloadTable: boolean
	errorMessage: any | null
	submitButton: boolean
	masterPoli: MasterPoliPayload = new MasterPoliPayload
	submitted: boolean = false
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	constructor(
		private modalService: ModalService,
		private fb: FormBuilder,
		private masterPoliService: MasterPoliService,
		private store: Store<fromApp.PrivateAppState>,
		private spinner : NgxSpinnerService,
	) {
		this.getState = this.store.select('manajemenKlinik_masterPoli')
	}

	ngOnInit(): void {
		this.formTambah = this.fb.group({
			nama_poli: ["", [Validators.required]],
			nama_table: ["", [Validators.required]],
			status_aktif: [1, []],
		})
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MDMP02')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MDMP01')!=-1?true:false
		this.dtOptions = this.showDataTables(this.btnEdit)
		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			  window.location.href='/'
			})
		  }
		this.getState.subscribe((state) => {
			this.masterPoli = state.masterPoli
			this.isLoadingButton = state.isLoadingButton
			this.errorMessage = state.errorMessage
			this.reloadTable = state.reloadTable
			this.submitButton = state.submitButton
			this.isEdit = state.isEdit
			if (this.isEdit === true) {
				this.formTambah.patchValue({
					nama_poli: this.masterPoli.nama_poli,
					nama_table: this.masterPoli.nama_table,
					status_aktif: this.masterPoli.status_aktif
				})
				this.spinner.hide('spinner1')
				this.modalService.open("modalFormContent");
			}

			if (this.reloadTable) {
				this.reLoadData()
				this.modalService.close("modalFormContent")
			}
		})

	}
	setStatus(val) {
		this.formTambah.patchValue({
			status_aktif: val
		})
	}
	SubmitForm() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200)
		if (this.formTambah.invalid) {
			return
		}
		// console.log(this.formTambah.value)
		let payload = new MasterPoliPayload
		payload.id_master_poli = this.masterPoli.id_master_poli
		payload.nama_poli = this.formTambah.value.nama_poli
		payload.nama_table = this.formTambah.value.nama_table
		payload.status_aktif = String(Number(this.formTambah.value.status_aktif))

		if (this.aksiModal == 'add') {
			this.store.dispatch(
				MasterPoliActions.addMasterPoli({ payload: payload })
			)
		} else {
			this.store.dispatch(
				MasterPoliActions.updateMasterPoli({ payload: payload })
			)
		}

	}

	FormModalOpen() {
		this.modalService.open("modalFormContent");
		this.titleModal = "Form Tambah Master Poli"
		this.aksiModal = 'add'
		this.formTambah.reset()
		this.store.dispatch(MasterPoliActions.clearData())
		this.formTambah.patchValue({
			status_aktif: "1",
		})
	}

	closeModal() {
		this.modalService.close("modalFormContent");
	}

	editData(data: any) {
		this.aksiModal = 'update'
		this.titleModal = "Form Edit"
		this.spinner.show('spinner1')
		this.store.dispatch(
			MasterPoliActions.getMasterPoliById({ payload: { id: data.id_master_poli } })
		)
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
					MasterPoliActions.deleteMasterPoli({ payload: { id: data.id_master_poli } })
				)
				setTimeout(() => {
					this.spinner.hide('spinner1')
				}, 400);
			}
		})
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(edit) {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.masterPoliService.getDataTables(dataTablesParameters)
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
				}, {
					data: 'nama_poli'
				}, {
					data: 'nama_table'
				}, {
					data: 'status_aktif',
					render(data: any, type: any, row: any, full: any) {
						if (data == 1) {
							return '<span class="badge col-green">Aktif</span>'
						} else {
							return '<span class="badge col-red">Tidak Aktif</span>'
						}
					}
				}, {
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return edit?'<button class="btn btn-link circle-primary text-ui-primary update-data "><i class="far fa-edit"></i></button> <button class="btn btn-link circle-danger text-ui-danger nonaktif-data "><i class="far fa-trash-alt"></i></button>':'';
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
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

}
