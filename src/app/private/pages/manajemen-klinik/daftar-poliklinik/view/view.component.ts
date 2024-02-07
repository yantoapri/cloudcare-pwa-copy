import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';
import { DaftarPoliklinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-poliklinik-payload';
import { DaftarKlinikService } from 'src/app/private/services/manajemen-klinik/daftar-klinik.service';
import { MasterPoliService } from 'src/app/private/services/manajemen-klinik/master-poli.service';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DaftarPoliklinikActions from 'src/app/private/states/manajemen-klinik/daftar-poliklinik/daftar-poliklinik.actions'
import { NgxSpinnerService } from "ngx-spinner";
import { WilayahService } from 'src/app/private/services/master-data/wilayah.service';

import { ModalService } from 'src/app/shared/_modal';
export enum TipeAlamat {
	KTP = 'ktp',
	DOMISILI = 'domisili'
}
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	@ViewChild('formContent', { static: false }) formContentModal: any;

	getState: Observable<any>
	public formTambah: FormGroup;
	titleModal: string
	aksiModal: string
	isEdit: boolean
	isLoadingButton: boolean
	reloadTable: boolean
	errorMessage: any | null
	submitButton: boolean
	daftarPoliklinik: any
	listPoli: Array<any> = []
	listKlinik: Array<any> = []
	submitted: boolean = false
	tipeAlamat = TipeAlamat
	btnDetail=false
		btnDelete=false
		btnEdit=false
		btnSetting=false
		btnAdd=false
		view=false
		paramProvinsiKtp = { last_data: 0, get_data: 50, search: "" }
		paramKabupatenKtp = { last_data: 0, get_data: 50, search: "" }
		paramKecamatanKtp = { last_data: 0, get_data: 50, search: "" }
		paramDesaKtp = { last_data: 0, get_data: 50, search: "" }
		paramZone={ last_data: 0, get_data: 50, search: "" }
		isLastZone=false
		isLastProv=false
		isLastKab=false
		isLastKec=false
		isLastDes=false
		loadingSelectProv: boolean = false
		loadingSelectKab: boolean = false
		loadingSelectKec: boolean = false
		loadingSelectDes: boolean = false
		loadingSelectZone: boolean =false
		listProvinsiKtp: Array<any> = []
		listKabupatenKtp: Array<any> = []
		listKecamatanKtp: Array<any> = []
		listDesaKtp: Array<any> = []
		listZone: Array<any> = []
		idProvinsiKtp: any = null
		idKabupatenKtp: any = null
		idKecamatanKtp: any = null
		idDesaKtp: any = null
	constructor(
		private modalService: NgbModal,
		private fb: FormBuilder,
		private daftarKlinikService: DaftarKlinikService,
		private masterPoliService: MasterPoliService,
		private daftarPoliklinikService: DaftarPoliklinikService,
		private store: Store<fromApp.PrivateAppState>,
		private modalSrce: ModalService,
		private spinner : NgxSpinnerService,
		private wilayahService: WilayahService,
	) {
		this.getState = this.store.select('manajemenKlinik_daftatPoliklinik')
	}
	plant=[]
	ngOnInit(): void {
		this.modalService.dismissAll(this.formContentModal)
		this.store.dispatch(DaftarPoliklinikActions.clearData())
		this.formTambah = this.fb.group({
			id_master_poli: ["", [Validators.required]],
			id_klinik: ["", [Validators.required]],
			nama_poliklinik: ["", [Validators.required]],
			alamat_poliklinik: ["", [Validators.required]],
			status_aktif: [1, []],
		})
		
		let item=JSON.parse(localStorage.getItem('currentUser'))
		this.plant=item.plant
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='MGMKDP2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MGMKDP1')!=-1?true:false
		this.dtOptions = this.showDataTables(this.btnEdit)
		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			  window.location.href='/'
			})
		  }
		this.loadPoli()
		this.loadKlinik()

		this.getState.subscribe((state) => {
			this.daftarPoliklinik = state.daftarPoliklinik
			this.isLoadingButton = state.isLoadingButton
			this.errorMessage = state.errorMessage
			this.reloadTable = state.reloadTable
			this.submitButton = state.submitButton
			this.isEdit = state.isEdit
			if (this.isEdit) {
				this.formTambah.patchValue({
					id_master_poli: this.daftarPoliklinik.id_master_poli,
					id_klinik: this.daftarPoliklinik.id_klinik,
					nama_poliklinik: this.daftarPoliklinik.nama_poliklinik,
					alamat_poliklinik: this.daftarPoliklinik.alamat_poliklinik,
					status_aktif: this.daftarPoliklinik.status_aktif
				})
				console.log(this.daftarPoliklinik)
				this.listProvinsiKtp = [{ id: this.daftarPoliklinik.id_province, name: this.daftarPoliklinik.provinsi }]
				this.listKecamatanKtp = [{ id: this.daftarPoliklinik.id_district, name: this.daftarPoliklinik.kecamatan }]
				this.listKabupatenKtp = [{ id: this.daftarPoliklinik.id_regency, name: this.daftarPoliklinik.kabupaten }]
				this.listDesaKtp = [{ id: this.daftarPoliklinik.id_village, name: this.daftarPoliklinik.desa }]
				this.idProvinsiKtp = this.daftarPoliklinik.id_province
				this.idKecamatanKtp = this.daftarPoliklinik.id_district
				this.idKabupatenKtp = this.daftarPoliklinik.id_regency
				this.idDesaKtp = this.daftarPoliklinik.id_village
				this.submitted = false
				this.spinner.hide('spinner1')
				this.modalSrce.open("modalForm")
				// this.modalService.open(this.formContentModal, { ariaLabelledBy: "modal-basic-title", backdrop : 'static', keyboard : false });
			}
			if (this.reloadTable) {
				this.reLoadData()
				this.modalSrce.close("modalForm")
			}
		})
	}

	prosesSelectProvinsi(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramProvinsiKtp.search=event.term
			if(this.paramProvinsiKtp.search==""||this.paramProvinsiKtp.search.length>=3){
			this.listProvinsiKtp=[]
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramProvinsiKtp.last_data=0
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastProv=false
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
			}else{
			this.isLastProv=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramProvinsiKtp.search=""
			this.listProvinsiKtp=[]
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramProvinsiKtp.last_data=0
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastProv=false
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastProv)
			this.paramProvinsiKtp.last_data+=10
		}
		if(!this.isLastProv){
		this.loadingSelectProv = true
		this.wilayahService.prosesSelectOptionProvinsi(this.paramProvinsiKtp, aksi)
			.subscribe(res => {
				this.loadingSelectProv = false
				if(res.response.length==0){
					this.isLastProv=true
				}else{
					if(res.response.length<10){
						if(aksi=="search")this.listProvinsiKtp=[]
						res.response.map(val=>{
							let i=this.listProvinsiKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listProvinsiKtp.push(val)
						})
						this.isLastProv=true
					}else{
						res.response.map(val=>{
							let i=this.listProvinsiKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listProvinsiKtp.push(val)
						})
					}
				}
			})
		}
	}
	prosesSelectKabupaten(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramKabupatenKtp.search=event.term
			if(this.paramKabupatenKtp.search==""||this.paramKabupatenKtp.search.length>=3){
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
			}else{
			this.isLastKab=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramKabupatenKtp.search=""
			this.listKabupatenKtp=[]
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKabupatenKtp.last_data=0
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKab=false
			this.isLastKec=false
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastKab)
			this.paramKabupatenKtp.last_data+=10
		}
		if(!this.isLastKab){
			this.loadingSelectKab = true;
			this.wilayahService.prosesSelectOptionKabupaten(this.paramKabupatenKtp, aksi, this.idProvinsiKtp)
				.subscribe(res => {
					
					if(res.response.length==0){
						this.isLastKab=true
					}else{
						if(res.response.length<10){
							if(aksi=="search")this.listKabupatenKtp=[]
							res.response.map(val=>{
								let i=this.listKabupatenKtp.findIndex(x=>x.id==val.id)
								if(i==-1)
								this.listKabupatenKtp.push(val)
							})
							this.isLastKab=true
						}else{
							res.response.map(val=>{
								let i=this.listKabupatenKtp.findIndex(x=>x.id==val.id)
								if(i==-1)
								this.listKabupatenKtp.push(val)
							})
						}
						this.loadingSelectKab = false;
					}
				})
		}
	}
	prosesSelectKecamatan(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramKecamatanKtp.search=event.term
			if(this.paramKecamatanKtp.search==""||this.paramKecamatanKtp.search.length>=3){
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKec=false
			this.isLastDes=false
			}else{
			this.isLastKec=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramKecamatanKtp.search=""
			this.listKecamatanKtp=[]
			this.listDesaKtp=[]
			this.paramKecamatanKtp.last_data=0
			this.paramDesaKtp.last_data=0
			this.isLastKec=false
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastKec)
			this.paramKecamatanKtp.last_data+=10
		}
		if(!this.isLastKec){
			this.loadingSelectKec = true
			this.wilayahService.prosesSelectOptionKecamatan(this.paramKecamatanKtp, aksi, this.idKabupatenKtp)
			.subscribe(res => {
				
				if(res.response.length==0){
					this.isLastKec=true
				}else{
					if(res.response.length<10){
						if(aksi=="search")this.listKecamatanKtp=[]
						res.response.map(val=>{
							let i=this.listKecamatanKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listKecamatanKtp.push(val)
						})
						this.isLastKec=true
					}else{
						res.response.map(val=>{
							let i=this.listKecamatanKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listKecamatanKtp.push(val)
						})
					}
					this.loadingSelectKec = false
				}
			})
		}
	}
	prosesSelectDesa(event: any, aksi: string, tipe: any) {
		if (aksi == 'search') {
			this.paramDesaKtp.search=event.term
			if(this.paramDesaKtp.search==""||this.paramDesaKtp.search.length>=3){
			this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
			this.isLastDes=false
			}else{
			this.isLastDes=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramDesaKtp.search=""
			this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
			this.isLastDes=false
		}
		if(aksi=="last_page"){
			if(!this.isLastDes)
			this.paramDesaKtp.last_data+=10
		}
		if(!this.isLastDes){
			this.loadingSelectDes = true
			this.wilayahService.prosesSelectOptionDesa(this.paramDesaKtp, aksi, this.idKecamatanKtp)
			.subscribe(res => {
				this.loadingSelectDes = false
				if (res.response.length==0) {
					this.isLastDes=true
				}else{
					if(res.response.length<10){
						if(aksi=="search")this.listDesaKtp=[]
						res.response.map(val=>{
							let i=this.listDesaKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listDesaKtp.push(val)
						})
						this.isLastDes=true
					}else{
						res.response.map(val=>{
							let i=this.listDesaKtp.findIndex(x=>x.id==val.id)
							if(i==-1)
							this.listDesaKtp.push(val)
						})
					}
				}
			})
		}
	}

	changeProvinsi(tipe: any) {
		if (tipe == this.tipeAlamat.KTP) {
			this.idKabupatenKtp = null
			this.idKecamatanKtp = null
			this.idDesaKtp = null
		}
	}
	changeKabupaten(tipe: any) {
		if (tipe == this.tipeAlamat.KTP) {
			this.idKecamatanKtp = null
			this.idDesaKtp = null
		}
	}
	changeKecamatan(tipe: any) {
		if (tipe == this.tipeAlamat.KTP) {
			this.idDesaKtp = null
		}
	}

	paramSelectOption(event: any, aksi: string, tipe: any, wilayah: string) {
		let param

		if (wilayah == 'provinsi' && tipe == this.tipeAlamat.KTP) {
			param = this.paramProvinsiKtp
		} else if (wilayah == 'kabupaten' && tipe == this.tipeAlamat.KTP) {
			param = this.paramKabupatenKtp
		} else if (wilayah == 'kecamatan' && tipe == this.tipeAlamat.KTP) {
			param = this.paramKecamatanKtp
		} else if (wilayah == 'desa' && tipe == this.tipeAlamat.KTP) {
			param = this.paramDesaKtp
		}

		if (aksi == 'search') {
		}
		return param
	}
	hideModal() {
		this.modalSrce.close("modalForm")

	}

	SubmitForm() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200)

		if (this.formTambah.invalid) {
			return
		}
		this.spinner.show('spinner1')
		let payload = new DaftarPoliklinikPayload
		payload.id_poliklinik = this.daftarPoliklinik.id_poliklinik
		payload.nama_poliklinik = this.formTambah.value.nama_poliklinik
		payload.id_master_poli = this.formTambah.value.id_master_poli
		payload.id_klinik = this.formTambah.value.id_klinik
		payload.alamat_poliklinik = this.formTambah.value.alamat_poliklinik
		payload.status_aktif = String(Number(this.formTambah.value.status_aktif))
		payload.id_province = String(this.idProvinsiKtp)
		payload.id_regency = String(this.idKabupatenKtp)
		payload.id_district = String(this.idKecamatanKtp)
		payload.id_village = String(this.idDesaKtp)
		if (this.aksiModal == 'add') {
			this.store.dispatch(DaftarPoliklinikActions.addDaftarPoliklinik({ payload: payload }))
		} else {
			if(this.plant.length==0)
			this.store.dispatch(DaftarPoliklinikActions.updateDaftarPoliklinik({ payload: payload }))
			else
			this.daftarPoliklinikService.updateKlinik(payload.id_poliklinik,payload).subscribe(res=>{
				this.reLoadData()
				this.hideModal()
				this.spinner.hide('spinner1')
			})
		}
		setTimeout(() => {
			this.reLoadData()
			this.spinner.hide('spinner1')
		}, 600);
	}

	FormModalOpen() {
		this.submitted = false
		this.modalSrce.open("modalForm")
		this.store.dispatch(DaftarPoliklinikActions.clearData())

		this.titleModal = "Form Tambah Daftar Poliklinik"
		this.aksiModal = 'add'
		// this.modalService.open(content, { ariaLabelledBy: "modal-basic-title", backdrop : 'static', keyboard : false });
		this.formTambah.reset()
		this.formTambah.patchValue({
			id_master_poli: "",
			id_klinik: "",
			status_aktif: 1
		})
		this.idDesaKtp=null
		this.idKabupatenKtp=null
		this.idKecamatanKtp=null
		this.idProvinsiKtp=null
	}

	showModalEvent(event: any) {

	}
	hideModalEvent(event: any) {

	}
	setStatus(val) {
		this.formTambah.patchValue({
			status_aktif: val
		})
	}
	editData(data: any) {
		this.aksiModal = 'update'
		this.titleModal = "Form Edit Poliklinik"
		this.spinner.show('spinner1')

		this.store.dispatch(
			DaftarPoliklinikActions.getBbyIdDaftarPoliklinik({ payload: { id: data.id_poliklinik } })
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
				this.store.dispatch(
					DaftarPoliklinikActions.deleteDaftarPoliklinik({ payload: { id: data.id_poliklinik } })
				)
			}
		})
	}


	loadPoli() {
		this.masterPoliService.getAll()
			.subscribe(succ => {
				this.listPoli = succ.response
			})
	}

	loadKlinik() {
		this.daftarKlinikService.getAll()
			.subscribe(succ => {
				this.listKlinik = succ.response
			})
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(edit) {
		let self=this
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.daftarPoliklinikService.getDataTables(dataTablesParameters)
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
					data: 'nama_klinik'
				}, {
					data: 'nama_poli'
				}, {
					data: 'no_reg_poliklinik'
				}, {
					data: 'nama_poliklinik'
				}, {
					data: 'alamat_poliklinik'
				}, {
					data: 'status_aktif',
					render(data: any, type: any, row: any, full: any) {
						if (data == '1') {
							return '<span class="badge col-green">Aktif</span>'
						} else {
							return '<span class="badge col-red">Tidak Aktif</span>'
						}
					}
				}, {
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						let disabled=(self.plant.length==0)?'':'disabled'
						return edit?`<div style="white-space: nowrap;">
                  <button class="btn btn-link circle-primary text-ui-primary update-data "><i class="far fa-edit"></i></button>
                  <button ${disabled} class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>
                  </div>`:'';
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
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
