import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { AkunService } from 'src/app/private/services/manajemen-akun/akun.service'
import { DaftarRuangService } from 'src/app/private/services/master-data/ruang-dan-jadwal/daftar-ruang.service'
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service'
import { JadwalDokterService } from 'src/app/private/services/pengaturan-jadwal/jadwal-dokter.service'
import * as moment from 'moment';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as JadwalDokterActions from 'src/app/private/states/pengaturan-jadwal/jadwal-dokter/jadwal-dokter.actions'
// import { JadwalDokterPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-dokter-payload";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

	formInput: FormGroup;
	listDokter: Array<any> = []
	listDaftarRuang: Array<any> = []
	listJadwalSesi: Array<any> = []
	tglSekarang: any = new Date()
	minDate: Date = new Date()

	isLastDok=false
	isLastSesi=false
	isLastRuang=false
	
	loadingListDokter: boolean = false
	loadingListDaftarRuang: boolean = false
	loadingListJadwalSesi: boolean = false

	paramDokter = { last_data: 0, get_data: 10, search: "" }
	paramDaftarRuang = { last_data: 0, get_data: 10, search: "" }
	paramJadwalSesi = { last_data: 0, get_data: 10, search: "" }

	isLoadingButton: boolean
	errorMessage: any | null
	submitButton: boolean
	submitted: boolean = false
	isEdit: boolean
	id_jadwal_dokter = null
	getState: Observable<any>;

	jadwalDokter: any

	constructor(
		private akunService: AkunService,
		private daftarRuangService: DaftarRuangService,
		private fb: FormBuilder,
		private jadwalSesiService: JadwalSesiService,
		private store: Store<fromApp.PrivateAppState>,
		private activatedRoute: ActivatedRoute,
		private JadwalDokterService: JadwalDokterService,
		private spinner : NgxSpinnerService,

	) {
		this.getState = this.store.select("pengaturanJadwal_jadwalDokter")
	}

	ngOnInit(): void {
		let tgl = moment().add(1, 'days').format("DD-MM-YYYY")
		this.formInput = this.fb.group({
			id_akun_dokter: [null, [Validators.required]],
			tgl_masuk: [tgl, [Validators.required]],
			kategori: [null, [Validators.required]],
			id_jadwal_sesi: [null, []],
			detail: this.fb.array([])
		})
		this.spinner.show('spinner1')
		// this.prosesSelectDokter('', 'open')
		this.prosesSelectDaftarRuang('', 'open')
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.id_jadwal_dokter = params.id
				this.JadwalDokterService.show(params.id)
					.subscribe((resp: any) => {
						if (resp.metaData.response_code == '0000') {
							this.jadwalDokter = resp.response
							this.listDokter=[{id_akun:this.jadwalDokter.id_akun_dokter,nama_lengkap:this.jadwalDokter.nama_lengkap_dokter}]
							this.formInput.patchValue({
								id_akun_dokter: this.jadwalDokter.id_akun_dokter,
								kategori: this.jadwalDokter.kategori_jadwal,
								tgl_masuk: moment(this.jadwalDokter.tgl_kegiatan, 'YYYY-MM-DD').format('DD-MM-YYYY'),
							})
							if (this.jadwalDokter.detail != undefined) {
								if (this.jadwalDokter.detail.length > 0) {
									this.jadwalDokter.detail.forEach(el => {

										let control = <FormArray>this.formInput.controls.detail;
										control.push(
											this.fb.group({
												id_jadwal_dokter_detail: [el.id_jadwal_dokter_detail, []],
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
				id_jadwal_dokter_detail: el.id_jadwal_dokter_detail,
				id_jadwal_sesi: el.id_jadwal_sesi,
				jam_mulai: moment(el.jam_mulai).format("HH:mm:ss"),
				jam_selesai: moment(el.jam_selesai).format("HH:mm:ss"),
				id_ruang: el.id_ruang.toString()
			})
		});
		let payload = {
			tgl_kegiatan: moment(this.formInput.value.tgl_masuk, 'DD-MM-YYYY').format('YYYY-MM-DD'),
			detail: detail,
			id_jadwal_dokter: this.id_jadwal_dokter
		}
		this.store.dispatch(JadwalDokterActions.updateInitial({ payload: payload }))
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
	}
	onFocus(id){
		document.getElementById(id).click()
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
	prosesSelectDokter(event: any, aksi: string) {
		
		let param = this.paramDokter
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search==""||param.search.length>=3){
			this.isLastDok=false
			this.listDokter=[]
			param.last_data=0
			}else{
				this.isLastDok=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			param.search = ""
			this.listDokter=[]
			param.last_data=0
			this.isLastDok=false
		}
		if(aksi=="last_page"){
			if(!this.isLastDok)
			param.last_data+=10
		}
		if(!this.isLastDok){
			this.loadingListDokter = true
			this.akunService.prosesSelectAkun(param, aksi, 'dokter')
			.subscribe(resp => {
				this.loadingListDokter = false
				if(resp){
					if(resp.response.length==0){
						this.isLastDok=true
					}else{
						if(resp.response.length<10){
							if(aksi=="search")this.listDokter=[]
							resp.response.map(val=>{
								let i=this.listDokter.findIndex(x=>x.id_akun==val.id_akun)
								if(i==-1)
								this.listDokter.push(val)
							})
							this.isLastDok=true
						}else{
							resp.response.map(val=>{
								let i=this.listDokter.findIndex(x=>x.id_akun==val.id_akun)
								if(i==-1)
								this.listDokter.push(val)
							})
						}
					}
					this.loadingListDokter=false
				}
			}, err => {
				this.loadingListDokter = false
			})
		}
	}

	prosesSelectDaftarRuang(event: any, aksi: string) {
		
		let param = this.paramDaftarRuang
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search==""||param.search.length>=3){
			this.isLastRuang=false
			this.listDaftarRuang=[]
			param.last_data=0
			}else{
				this.isLastRuang=true
			}
		}
		
		if(aksi=="open"||aksi=="clear"){
			param.search=""
			this.isLastRuang=false
			this.listDaftarRuang=[]
			param.last_data=0
		}
		if(aksi=="last_page"){
			if(!this.isLastRuang)
			param.last_data+=10
		}
		if(!this.isLastRuang){
			this.loadingListDaftarRuang = true
			this.daftarRuangService.prosesSelectDaftarRuang(param, aksi)
			.subscribe(resp => {
				
				if(resp){
					if(resp.response.length==0){
						this.isLastRuang=true
					}else{
						if(resp.response.length<10){
							if(aksi=="search")this.listDaftarRuang=[]
							resp.response.map(val=>{
								let i=this.listDaftarRuang.findIndex(x=>x.id_ruang==val.id_ruang)
								if(i==-1)
								this.listDaftarRuang.push(val)
							})
							this.isLastRuang=true
						}else{
							resp.response.map(val=>{
								let i=this.listDaftarRuang.findIndex(x=>x.id_ruang==val.id_ruang)
								if(i==-1)
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
			param.search = ""
			this.isLastSesi=false
			this.listJadwalSesi=[]
			param.last_data=0
		}
		if(aksi=="last_page"){
			if(!this.isLastSesi)
			param.last_data+=10
		}
		if(!this.isLastSesi){
			this.loadingListJadwalSesi = true
			this.jadwalSesiService.prosesSelectJadwalSesi(param, aksi)
			.subscribe(res => {
				if(res){
					if(res.response.length==0){
						this.isLastSesi=true
					}else{
						if(res.response.length<10){
							if(aksi=="search")this.listJadwalSesi=[]
							res.response.map(el => {
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
							});
							this.isLastSesi=true
						}else{
							res.response.map(el => {
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
							});
						}
					}
				}
				this.loadingListJadwalSesi = false
			}, err => {
				this.loadingListJadwalSesi = false
			})
		}
	}

}
