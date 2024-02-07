import { Observable } from 'rxjs';
import { DaftarKlinikPayload } from 'src/app/private/models/class-payload-api/manajemen-klinik/daftar-klinik-payload';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DaftarKlinikService } from 'src/app/private/services/manajemen-klinik/daftar-klinik.service';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { WilayahService } from 'src/app/private/services/master-data/wilayah.service';
import * as fromApp from 'src/app/private/states/private-app.states'
import {InformasiKlinikService} from 'src/app/private/services/manajemen-klinik/informasi-klinik.service'

import * as DaftarKlinikActions from 'src/app/private/states/manajemen-klinik/daftar-klinik/daftar-klinik.actions'
import { ModalService } from 'src/app/shared/_modal';
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
export enum TipeAlamat {
	KTP = 'ktp',
	DOMISILI = 'domisili'
}
import { Router } from '@angular/router'
// import { Detail } from 'src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-dokter-payload';
// import { InformasiKlinikEffects } from 'src/app/private/states/manajemen-klinik/informasi-klinik/informasi-klinik.effects';

@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	@ViewChild('formContent') formContent: any;
	getState: Observable<any>
	public formTambah: FormGroup;
	titleModal: string
	aksiModal: string
	isEdit: boolean
	isLoadingButton: boolean
	reloadTable: boolean
	errorMessage: any | null
	submitButton: boolean
	daftarKlinik: DaftarKlinikPayload = new DaftarKlinikPayload
	submitted: boolean = false

	tipeAlamat = TipeAlamat

	paramProvinsiKtp = { last_data: 0, get_data:10, search: "" }
	paramKabupatenKtp = { last_data: 0, get_data:10, search: "" }
	paramKecamatanKtp = { last_data: 0, get_data:10, search: "" }
	paramDesaKtp = { last_data: 0, get_data:10, search: "" }
	paramZone={ last_data: 0, get_data:10, search: "" }
	listProvinsiKtp: Array<any> = []
	listKabupatenKtp: Array<any> = []
	listKecamatanKtp: Array<any> = []
	listDesaKtp: Array<any> = []
	listZone: Array<any> = []
	idProvinsiKtp: any = null
	idKabupatenKtp: any = null
	idKecamatanKtp: any = null
	idDesaKtp: any = null
	timeZone:any =null
	loadingSelectProv: boolean = false
	loadingSelectKab: boolean = false
	loadingSelectKec: boolean = false
	loadingSelectDes: boolean = false
	loadingSelectZone:boolean =false
	btnDetail=false
	btnDelete=false
	btnSetting=false
	btnAdd=false
	view=false
	isLastProv=false
	isLastKab=false
	isLastKec=false
	isLastDes=false
	isLastZone=false
	constructor(
		private modalService: ModalService,
		private fb: FormBuilder,
		private daftarKlinikService: DaftarKlinikService,
		private store: Store<fromApp.PrivateAppState>,
		private spinner : NgxSpinnerService,
		private wilayahService: WilayahService,
		private validate:ValidateService,
		private router:Router,
		private infoKlinik:InformasiKlinikService
	) {
		this.getState = this.store.select('manajemenKlinik_daftarKlinik')
	}

	ngOnInit(): void {
		this.spinner.show('spinner1')
		this.formTambah = this.fb.group({
			// no_reg_klinik : ["", [] ],
			nama_klinik: ["", [Validators.required]],
			alamat_klinik: ["", [Validators.required]],
			status_klinik: ["private", []],
			status_aktif: [1, []],
			id_province: ["", []],
			id_regency: ["", []],
			id_district: ["", []],
			id_village: ["", []],
			rm_kode: ["", []],
			rm_start: ["", []],
			pcare_consID: ["", []],
			pcare_secretKey: ["", []],
			pcare_pcareUname: ["", []],
			pcare_pcarePWD: ["", []],
			pcare_kdAplikasi: ["", []],
			status_pcare: [0, []],
		})
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnSetting=item.findIndex((val)=>val.kode=='MGMKDK2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='MGMKDK1')!=-1?true:false
		this.dtOptions = this.showDataTables(this.btnSetting,this.btnDetail,this.btnDelete)
		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			  window.location.href='/'
			})
		  }
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
	}
	isNumber(e){
		return this.validate.Number(e)
	}

	SubmitForm() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200)

		if (this.formTambah.invalid) {
			return
		}
		this.spinner.show('spinner1')
		let payload = new DaftarKlinikPayload
		payload.id_klinik = this.daftarKlinik.id_klinik
		// payload.no_reg_klinik = this.formTambah.value.no_reg_klinik
		payload.nama_klinik = this.formTambah.value.nama_klinik
		payload.alamat_klinik = this.formTambah.value.alamat_klinik
		payload.status_klinik = this.formTambah.value.status_klinik
		payload.status_aktif = String(Number(this.formTambah.value.status_aktif))
		payload.id_province = String(this.idProvinsiKtp)
		payload.id_regency = String(this.idKabupatenKtp)
		payload.id_district = String(this.idKecamatanKtp)
		payload.id_village = String(this.idDesaKtp)
		payload.rm_kode = this.formTambah.value.rm_kode
		payload.rm_start = this.formTambah.value.rm_start
		payload.pcare_consID = this.formTambah.value.pcare_consID
		payload.pcare_secretKey = this.formTambah.value.pcare_secretKey
		payload.pcare_pcareUname = this.formTambah.value.pcare_pcareUname
		payload.pcare_pcarePWD = this.formTambah.value.pcare_pcarePWD
		payload.pcare_kdAplikasi = this.formTambah.value.pcare_kdAplikasi
		payload.status_pcare = this.formTambah.value.status_pcare == null ? '0' : String(Number(this.formTambah.value.status_pcare))
		payload.config_time_zone=this.timeZone
		if (this.aksiModal == 'add') {
			this.store.dispatch(
				DaftarKlinikActions.addDaftarKlinik({ payload: payload })
			)
			setTimeout(() => {
				this.modalService.close("modalFormContent");
				this.reLoadData()
				this.spinner.hide('spinner1')

			}, 600);
		} else {
			this.store.dispatch(
				DaftarKlinikActions.updateDaftarKlinik({ payload: payload })
			)
			setTimeout(() => {
				this.modalService.close("modalFormContent");
				this.reLoadData()
				this.spinner.hide('spinner1')
			}, 600);
		}

		// console.log('submitValue', this.formTambah.value)
	}
	prosesSelectProvinsi(event: any, aksi: string, tipe: any) {
		if (aksi == 'search')
		{
			this.paramProvinsiKtp.search = event.term
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
			this.paramProvinsiKtp.search = ""
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
					if (res) {
						if(res.response.length==0)
						this.isLastProv=true
						else
						{
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
					}
				})
		}
	}
	prosesSelectZone(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.paramZone.search = event.term
			if(this.paramZone.search==""||this.paramZone.search.length>=3){
				this.listZone=[]
				this.paramZone.last_data=0
				this.isLastZone=false
			}else{
				this.isLastZone=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramZone.search = ""
			this.listZone=[]
			this.paramZone.last_data=0
			this.isLastZone=false
		}
		  
		if(aksi=="last_page"){
			if(!this.isLastZone)
			this.paramZone.last_data+=10
		}
		if(!this.isLastZone){
		this.loadingSelectZone = true
		this.infoKlinik.getTimeZone().subscribe(res => {
				this.loadingSelectZone = false
				if(res){
					if(res.response.length==0){
						this.isLastZone=true
					}else{
						if(res.response.length<10){
							if(aksi=="search")this.listZone=[]
							res.response.map(val=>{
								let i=this.listZone.findIndex(x=>x.id_time_zone==val.id_time_zone)
								if(i==-1)
								this.listZone.push(val)
							})
							this.isLastZone=true
						}else{
							res.response.map(val=>{
								let i=this.listZone.findIndex(x=>x.id_time_zone==val.id_time_zone)
								if(i==-1)
								this.listZone.push(val)
							})
						}
					}
				}
				
			})
		}
	}
	prosesSelectKabupaten(event: any, aksi: string, tipe: any) {
		let idProvinsi=this.idProvinsiKtp
		if (aksi == 'search')
		{
			this.paramKabupatenKtp.search = event.term
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
			this.paramKabupatenKtp.search = ""
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
		this.wilayahService.prosesSelectOptionKabupaten(this.paramKabupatenKtp, aksi, idProvinsi)
			.subscribe(res => {
				this.loadingSelectKab = false;
				if (res) {
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
					}
					 
				}
			})
		}
	}
	prosesSelectKecamatan(event: any, aksi: string, tipe: any) {
		let idKabupaten= this.idKabupatenKtp
		if (aksi == 'search')
		{
			this.paramKecamatanKtp.search = event.term
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
			this.paramKecamatanKtp.search = ""
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
			this.wilayahService.prosesSelectOptionKecamatan(this.paramKecamatanKtp, aksi, idKabupaten)
				.subscribe(res => {
					this.loadingSelectKec = false
					if (res) {
						if(res.response.length==0)
						this.isLastKec=true
					else{
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
					}
						
					}
				})
		}
	}
	prosesSelectDesa(event: any, aksi: string, tipe: any) {
		let idKecamatan= this.idKecamatanKtp
		if (aksi == 'search')
		{
			this.paramDesaKtp.search = event.term
			if(this.paramDesaKtp.search==""||this.paramDesaKtp.search.length>=3){
			this.listDesaKtp=[]
			this.paramDesaKtp.last_data=0
			this.isLastDes=false
			}else{
			this.isLastDes=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramDesaKtp.search = ""
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
		this.wilayahService.prosesSelectOptionDesa(this.paramDesaKtp, aksi, idKecamatan)
			.subscribe(res => {
				this.loadingSelectDes = false
				if (res) {
					if(res.response.length==0)
					this.isLastDes=true
					else{
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

	

	FormModalOpen() {
		this.store.dispatch(DaftarKlinikActions.clearData())
		this.titleModal = "Form Tambah Daftar Klinik"
		this.aksiModal = 'add'
		this.modalService.open("modalFormContent");
		this.formTambah.reset()
		this.idProvinsiKtp=null
		this.idKabupatenKtp=null
		this.idKecamatanKtp=null
		this.idDesaKtp=null
		this.timeZone=null
		this.formTambah.patchValue({
			status_klinik: "private",
			status_aktif: "1"
		})
	}
	setStatus(val) {
		this.formTambah.patchValue({
			status_aktif: val
		})
	}
	setPcare(val) {
		this.formTambah.patchValue({
			status_pcare: val
		})
	}
	setKlinik(val) {
		this.formTambah.patchValue({
			status_klinik: val
		})
	}
	editData(data: any) {
		this.aksiModal = 'update'
		this.titleModal = "Form Edit"
		this.spinner.show('spinner1')
		this.daftarKlinikService.show(data.id_klinik).subscribe(async (resp: any) => {
			if (resp) {
				this.daftarKlinik = resp.response
				this.formTambah.patchValue({
					// no_reg_klinik : this.daftarKlinik.no_reg_klinik,
					nama_klinik: this.daftarKlinik.nama_klinik,
					alamat_klinik: this.daftarKlinik.alamat_klinik,
					status_klinik: this.daftarKlinik.status_klinik,
					status_aktif: this.daftarKlinik.status_aktif,
					rm_kode: this.daftarKlinik.rm_kode,
					rm_start: this.daftarKlinik.rm_start,
					pcare_consID: this.daftarKlinik.pcare_consID,
					pcare_secretKey: this.daftarKlinik.pcare_secretKey,
					pcare_pcareUname: this.daftarKlinik.pcare_pcareUname,
					pcare_pcarePWD: this.daftarKlinik.pcare_pcarePWD,
					pcare_kdAplikasi: this.daftarKlinik.pcare_kdAplikasi,
					status_pcare: Number(this.daftarKlinik.status_pcare),
				})
				this.listProvinsiKtp = [{ id: resp.response.id_province, name: resp.response.provinsi }]
				this.listKecamatanKtp = [{ id: resp.response.id_district, name: resp.response.kecamatan }]
				this.listKabupatenKtp = [{ id: resp.response.id_regency, name: resp.response.kabupaten }]
				this.listDesaKtp = [{ id: resp.response.id_village, name: resp.response.desa }]
				this.idProvinsiKtp = this.daftarKlinik.id_province
				this.idKecamatanKtp = this.daftarKlinik.id_district
				this.idKabupatenKtp = this.daftarKlinik.id_regency
				this.idDesaKtp = this.daftarKlinik.id_village
				this.spinner.hide('spinner1')
				this.modalService.open("modalFormContent");
			}
		})

	}
	detail(data){
		this.router.navigate(['manajemen-klinik/informasi-klinik/view/'+data.id_klinik])
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
					DaftarKlinikActions.deleteDaftarKlinik({ payload: { id: data.id_klinik } })
				)
				setTimeout(() => {
					this.reLoadData()
				}, 600);
			}
		})
	}

	closeModal() {
		this.modalService.close("modalFormContent");
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(settings,detail,del) {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.daftarKlinikService.getDataTables(dataTablesParameters)
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
					data: 'no_reg_klinik'
				}, {
					data: 'nama_klinik'
				}, {
					data: 'alamat_klinik'
				}, {
					data: 'status_klinik',
					render(data: any, type: any, row: any, full: any) {
						if (data == 'private') {
							return `<span class="badge col-red">${data}</span>`
						} else {
							return `<span class="badge col-blue">${data}</span>`
						}
					}
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
						let btn=''
						btn+=settings?'<button class="btn btn-link circle-primary text-ui-primary update-data "><i class="far fa-edit"></i></button>':''
						btn+=detail?'<button class="btn btn-link circle-info text-ui-info detail "><i class="far fa-eye"></i></button>':''
						btn+=del?'<button class="btn btn-link circle-danger text-ui-danger nonaktif-data"><i class="far fa-trash-alt"></i></button>':'';
						return btn
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
				$('td .detail', row).on('click', () => {
					self.detail(data);
				});
				return row;
			}
		}
	}
}
