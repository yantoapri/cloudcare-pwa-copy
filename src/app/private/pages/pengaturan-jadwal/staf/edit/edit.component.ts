import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { AkunService } from 'src/app/private/services/manajemen-akun/akun.service'
import { DaftarRuangService } from 'src/app/private/services/master-data/ruang-dan-jadwal/daftar-ruang.service'
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service'
import { JadwalStafService } from 'src/app/private/modul-api/modul-master/modul-jadwal-staf.service'
import * as moment from 'moment';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as JadwalStaffActions from 'src/app/private/states/pengaturan-jadwal/jadwal-staf/jadwal-staf.actions'
// import { JadwalStafPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-staf-payload";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.sass']
})
export class EditComponent implements OnInit {

	formInput: FormGroup;
	listStaff: Array<any> = []
	listDaftarRuang: Array<any> = []
	listJadwalSesi: Array<any> = []
	tglSekarang: any = new Date()
	minDate: Date = new Date()

	loadingListStaff: boolean = false
	loadingListDaftarRuang: boolean = false
	loadingListJadwalSesi: boolean = false

	paramStaff = { last_data: 0, get_data: 10, search: "" }
	paramDaftarRuang = { last_data: 0, get_data: 10, search: "" }
	paramJadwalSesi = { last_data: 0, get_data: 10, search: "" }

	isLoadingButton: boolean
	errorMessage: any | null
	submitButton: boolean
	submitted: boolean = false
	isEdit: boolean
	id_jadwal_staff = null
	getState: Observable<any>;
	isLastSesi=false
	isLastRuang=false
	isLastAkun=false
	jadwalStaff: any

	constructor(
		private akunService: AkunService,
		private daftarRuangService: DaftarRuangService,
		private fb: FormBuilder,
		private jadwalSesiService: JadwalSesiService,
		private store: Store<fromApp.PrivateAppState>,
		private activatedRoute: ActivatedRoute,
		private spinner : NgxSpinnerService,
		private JadwalStaffService: JadwalStafService
	) {
		this.getState = this.store.select("pengaturanJadwal_jadwalStaf")
	}

	ngOnInit(): void {
		this.spinner.show('spinner1')
		let tgl = moment().add(1, 'days').format("DD-MM-YYYY")
		this.formInput = this.fb.group({
			id_akun_staff: [null, [Validators.required]],
			tgl_masuk: [tgl, [Validators.required]],
			kategori: [null, [Validators.required]],
			id_jadwal_sesi: [null, []],
			detail: this.fb.array([])
		})
		this.prosesSelectStaff('', 'open')
		this.prosesSelectDaftarRuang('', 'open')
		setTimeout(() => {
			this.activatedRoute.params.subscribe((params: Params) => {
				if (params) {
					this.id_jadwal_staff = params.id
					this.JadwalStaffService.show(params.id)
						.subscribe(async (resp: any) => {
							if (resp.metaData.response_code == '0000') {
								// await this.prosesSelectStaff('', '')
								this.jadwalStaff = resp.response
								this.formInput.patchValue({
									id_akun_staff: this.jadwalStaff.id_akun_staff,
									kategori: this.jadwalStaff.kategori_jadwal,
									tgl_masuk: moment(this.jadwalStaff.tgl_kegiatan, 'YYYY-MM-DD').format('DD-MM-YYYY'),
								})
	
								this.listStaff = [{
									id_akun: this.jadwalStaff.id_akun_staff,
									nama_lengkap: this.jadwalStaff.nama_lengkap_staf
								}]
	
								if (this.jadwalStaff.detail != undefined) {
									if (this.jadwalStaff.detail.length > 0) {
										this.jadwalStaff.detail.forEach(el => {
	
											let control = <FormArray>this.formInput.controls.detail;
											control.push(
												this.fb.group({
													id_jadwal_staff_detail: [el.id_jadwal_staff_detail, []],
													id_jadwal_sesi: [el.id_jadwal_sesi, []],
													nama_sesi: [el.nama_sesi, []],
													id_ruang: [el.id_ruang, []],
													jam_mulai: [this.parseTime(el.jam_mulai), []],
													jam_selesai: [this.parseTime(el.jam_selesai), []],
												})
											)
										});
									}
								}
	
							}
							this.spinner.hide('spinner1')
						})
				}
			})
		}, 400);



	}
	onFocus(id){
		document.getElementById(id).click()
	}
	async SubmitForm() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200);
		if (this.formInput.invalid) {
			return false
		}
		this.spinner.show('spinner1')
		let detail = Array();
		this.formInput.value.detail.forEach(el => {
			detail.push({
				id_jadwal_staff_detail: el.id_jadwal_staff_detail,
				id_jadwal_sesi: el.id_jadwal_sesi,
				jam_mulai: moment(el.jam_mulai).format("HH:mm:ss"),
				jam_selesai: moment(el.jam_selesai).format("HH:mm:ss"),
				id_ruang: el.id_ruang.toString()
			})
		});
		let payload = {
			tgl_kegiatan: moment(this.formInput.value.tgl_masuk, 'DD-MM-YYYY').format('YYYY-MM-DD'),
			detail: detail,
			id_jadwal_staff: this.id_jadwal_staff
		}
		this.store.dispatch(JadwalStaffActions.updateInitial({ payload: payload }))
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
	}

	simpanDetailSesi() {
		let idJadwalSesi = this.formInput.value.id_jadwal_sesi
		if (idJadwalSesi) {
			let indexJadwal = this.listJadwalSesi.findIndex((el) => {
				return el.id_jadwal_sesi == idJadwalSesi
			})
			if (indexJadwal >= 0) {
				let find = this.listJadwalSesi[indexJadwal]
				let control = <FormArray>this.formInput.controls.detail;
				control.push(
					this.fb.group({
						id_jadwal_sesi: [find.id_jadwal_sesi, []],
						nama_sesi: [find.nama_sesi, []],
						id_ruang: [find.id_ruang, []],
						jam_mulai: [new Date('1 Apr 2023 '+find.jam_buka), []],
						jam_selesai: [new Date('1 Apr 2023 '+find.jam_tutup), []],
					})
				)
			}
		}
	}
	deleteDetailSesi(i: number) {
		let control = <FormArray>this.formInput.controls.detail
		control.controls.splice(i, 1)
	}
	prosesSelectStaff(event: any, aksi: string) {
		
		let param = this.paramStaff
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search==""||param.search.length>=3){
				this.listStaff=[]
				param.last_data=0
				this.isLastAkun=false
			}else{
				this.isLastAkun=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			param.search = ""
			this.listStaff=[]
			param.last_data=0
			this.isLastAkun=false
		}
		if(aksi=="last_page"){
			if(!this.isLastAkun)
			param.last_data+=10
		}
		if(!this.isLastAkun){
			this.loadingListStaff=true
			this.akunService.prosesSelectAkun(param, aksi, 'staff')
			.subscribe(resp => {
				if(resp){
					if(resp.response.length==0){
						this.isLastAkun=true
					}else{
						if(resp.response.length<10){
							if(aksi=="search")this.listStaff=[]
							resp.response.map(val=>{
								let index=this.listStaff.findIndex(x=>x.id_akun==val.id_akun)
								if(index<0){
									this.listStaff.push(val)
								}
							})
							this.isLastAkun=true
						}else{
							resp.response.map(val=>{
								let index=this.listStaff.findIndex(x=>x.id_akun==val.id_akun)
								if(index<0)
								this.listStaff.push(val)
							})
						}
						
					}
					this.loadingListStaff = false
				}
			}, err => {
				this.loadingListStaff = false
			})
		}
	}

	prosesSelectDaftarRuang(event: any, aksi: string) {
		this.loadingListDaftarRuang = true
		let param = this.paramDaftarRuang
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search==""||param.search.length>=3){
			this.listDaftarRuang=[]
			param.last_data=0
			this.isLastRuang=false
			}else{
			this.isLastRuang=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			param.search = ""
			this.listDaftarRuang=[]
			param.last_data=0
			this.isLastRuang=false
		}
		if(aksi=="last_page"){
			if(!this.isLastRuang)
			param.last_data+=10
		}
		if(!this.isLastRuang){
			this.loadingListDaftarRuang=true
			this.daftarRuangService.prosesSelectDaftarRuang(param, aksi)
			.subscribe(resp => {
				
				if(resp){
					if(resp.response.length==0){
						this.isLastRuang=true
					}else{
						if(resp.response.length<10){
							if(aksi=="search")this.listDaftarRuang=[]
							resp.response.map(val=>{
								let index=this.listDaftarRuang.findIndex(x=>x.id_ruang==val.id_ruang)
								if(index<0)
								this.listDaftarRuang.push(val)
							})
							this.isLastRuang=true
						}else{
							resp.response.map(val=>{
								let index=this.listDaftarRuang.findIndex(x=>x.id_ruang==val.id_ruang)
								if(index<0)
								this.listDaftarRuang.push(val)
							})
						}
					}
					
				}
				this.loadingListDaftarRuang = false
			}, err => {
				this.loadingListDaftarRuang = false
			})
		}
	}

	parseTime(t: any) {
		var d = new Date();
		var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
		d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
		d.setMinutes(parseInt(time[2]) || 0);
		return d;
	}

	prosesSelectJadwalSesi(event: any, aksi: string) {
		let param = this.paramJadwalSesi
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search==""||param.search.length>=3){
			this.listJadwalSesi=[]
			param.last_data=0
			this.isLastSesi=false
			}else{
			this.isLastSesi=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.listJadwalSesi=[]
			param.last_data=0
			this.isLastSesi=false
		}
		if(aksi=="last_page"){
			if(!this.isLastSesi)
			param.last_data+=10
		}
		if(!this.isLastSesi){
			this.loadingListJadwalSesi=true
			this.jadwalSesiService.prosesSelectJadwalSesi(param, aksi)
			.subscribe(res => {
				this.loadingListJadwalSesi = false
				this.listJadwalSesi = []
				if(res){
					if(res.response.length==0){
						this.isLastSesi=true
					}else{
						if(res.response.length<10){
							if(aksi=="search")this.listJadwalSesi=[]
							res.response.map(el=>{
								let i=this.listJadwalSesi.findIndex(x=>x.id_jadwal_sesi==el.id_jadwal_sesi)
								if(i==-1)
								this.listJadwalSesi.push({
									id_jadwal_sesi: el.id_jadwal_sesi,
									nama_sesi: el.nama_sesi
										+ ' ('
										+ moment(this.parseTime(el.jam_buka)).format("HH:mm")
										+ ' - '
										+ moment(this.parseTime(el.jam_tutup)).format("HH:mm")
										+ ')',
									jam_buka:moment(this.parseTime(el.jam_buka)).format("HH:mm"),
									jam_tutup:moment(this.parseTime(el.jam_tutup)).format("HH:mm")
								})
							})
							this.isLastSesi=true
						}else{
							res.response.map(el=>{
								let i=this.listJadwalSesi.findIndex(x=>x.id_jadwal_sesi==el.id_jadwal_sesi)
								if(i==-1)
								this.listJadwalSesi.push({
									id_jadwal_sesi: el.id_jadwal_sesi,
									nama_sesi: el.nama_sesi
										+ ' ('
										+ moment(this.parseTime(el.jam_buka)).format("HH:mm")
										+ ' - '
										+ moment(this.parseTime(el.jam_tutup)).format("HH:mm")
										+ ')',
									jam_buka:moment(this.parseTime(el.jam_buka)).format("HH:mm"),
									jam_tutup:moment(this.parseTime(el.jam_tutup)).format("HH:mm")
								})
							})
						}
					}
				}
				
			}, err => {
				this.loadingListJadwalSesi = false
			})
		}
	}
}
