import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import { AkunService } from 'src/app/private/services/manajemen-akun/akun.service'
import { DaftarRuangService } from 'src/app/private/services/master-data/ruang-dan-jadwal/daftar-ruang.service'
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service'
import * as moment from 'moment';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as JadwalDokterActions from 'src/app/private/states/pengaturan-jadwal/jadwal-dokter/jadwal-dokter.actions'
import { JadwalDokterPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-dokter-payload";
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

	formInput: FormGroup;
	listDokter: Array<any> = []
	listDaftarRuang: Array<any> = []
	listJadwalSesi: Array<any> = []
	tglSekarang: any = new Date()
	minDate: Date = new Date()

	loadingListDokter: boolean = false
	loadingListDaftarRuang: boolean = false
	loadingListJadwalSesi: boolean = false

	isLastDok=false
	isLastRuang=false
	isLastSesi=false

	paramDokter = { last_data: 0, get_data: 10, search: "" }
	paramDaftarRuang = { last_data: 0, get_data: 10, search: "" }
	paramJadwalSesi = { last_data: 0, get_data: 10, search: "" }

	isLoadingButton: boolean
	errorMessage: any | null
	submitButton: boolean
	submitted: boolean = false

	getState: Observable<any>;

	jadwalDokter: JadwalDokterPayload = new JadwalDokterPayload

	constructor(
		private akunService: AkunService,
		private daftarRuangService: DaftarRuangService,
		private fb: FormBuilder,
		private jadwalSesiService: JadwalSesiService,
		private store: Store<fromApp.PrivateAppState>,
		private validate:ValidateService,
		private spinner : NgxSpinnerService,

	) {
		this.getState = this.store.select('pengaturanJadwal_jadwalDokter');
		this.minDate.setDate(this.minDate.getDate() + 1);
		// this.minDate.setDate(this.minDate.getDate() + 1);
	}

	ngOnInit(): void {

		$("#tgl1,.repeatEnd").attr('disabled','')
		let tgl = moment().add(1, 'days').format("DD-MM-YYYY")
		this.formInput = this.fb.group({
			id_akun_dokter: [null, [Validators.required]],
			tgl_masuk: [tgl, [Validators.required]],
			id_jadwal_sesi: [null, []],
			repeat: ["none", []],
			repeat_number: [1, []],
			repeat_date: ["day", []],
			repeat_on: this.fb.group({
				senin: [null],
				selasa: [null],
				rabu: [null],
				kamis: [null],
				jumat: [null],
				sabtu: [null],
				minggu: [null],

			}),
			kategori: [null, [Validators.required]],
			end: ["on"],
			end_on_date: [tgl],
			end_occurrences: [1],
			detail: this.fb.array([])
		})

		this.getState.subscribe((state) => {
			this.errorMessage = state.errorMessage
			this.submitButton = state.submitButton
			this.isLoadingButton = state.isLoadingButton
		})
	}
	repeatOn(val){
		if(val){
			$("#tgl1,.repeatEnd").removeAttr('disabled')
		}else{
			$("#tgl1,.repeatEnd").attr('disabled','')
		}
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	onFocus(id){
		document.getElementById(id).click()
	}
	SubmitForm() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200);
		if (this.formInput.invalid) {
			return
		}
		this.spinner.show('spinner1')
		let payload = new JadwalDokterPayload
		payload.id_akun_dokter = this.formInput.value.id_akun_dokter
		payload.tgl_awal = moment(this.formInput.value.tgl_masuk, 'DD-MM-YYYY').format('YYYY-MM-DD')
		payload.tgl_end_type = this.formInput.value.end
		payload.repeat = this.formInput.value.repeat
		let week = []
		this.formInput.value.repeat_on.minggu != null ? week.push(0) : ''
		this.formInput.value.repeat_on.senin != null ? week.push(1) : ''
		this.formInput.value.repeat_on.selasa != null ? week.push(2) : ''
		this.formInput.value.repeat_on.rabu != null ? week.push(3) : ''
		this.formInput.value.repeat_on.kamis != null ? week.push(4) : ''
		this.formInput.value.repeat_on.jumat != null ? week.push(5) : ''
		this.formInput.value.repeat_on.sabtu != null ? week.push(6) : ''

		payload.repeat_on_week = week
		payload.repeat_value = this.formInput.value.repeat_number
		payload.repeat_type = this.formInput.value.repeat_date
		payload.kategori_jadwal = this.formInput.value.kategori
		payload.tgl_end_on = moment(this.formInput.value.end_on_date, 'DD-MM-YYYY').format('YYYY-MM-DD')
		let detail = Array();
		this.formInput.value.detail.forEach(el => {
			detail.push({
				id_jadwal_sesi: el.id_jadwal_sesi,
				jam_mulai: moment(el.jam_mulai).format("HH:mm:ss"),
				jam_selesai: moment(el.jam_selesai).format("HH:mm:ss"),
				id_ruang: el.id_ruang?el.id_ruang.toString():""
			})
		});
		payload.detail = detail

		this.store.dispatch(JadwalDokterActions.addInitial({ payload: payload }))
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
						id_ruang: [null, []],
						jam_mulai: [new Date('1 Apr 2023 '+find.jam_buka), []],
						jam_selesai: [new Date('1 Apr 2023 '+find.jam_tutup), []],
					})
				)
				console.log(this.formInput.value.detail)

			}
		}
	}



	deleteDetailSesi(num: number) {
		let index = this.formInput.get('detail') as FormArray
		index.removeAt(num)
	}

	prosesSelectDokter(event: any, aksi: string) {
		
		let param = this.paramDokter
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search==""||param.search.length>=3){
			this.listDokter=[]
			param.last_data=0
			this.isLastDok=false
			}else{
				this.isLastDok=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			param.search=""
			this.listDokter=[]
			param.last_data=0
			this.isLastDok=false
		}
		if(aksi=="last_page"){
			if(!this.isLastDok){
				param.last_data+=10
			}
		}
		if(!this.isLastDok){
			this.loadingListDokter = true
			this.akunService.prosesSelectAkun(param, aksi, 'dokter')
			.subscribe(resp => {
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
				}
				this.loadingListDokter = false
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
			this.listJadwalSesi=[]
			param.last_data=0
			this.isLastSesi=false
		}
		if(aksi=="last_page"){
			if(!this.isLastSesi)
			param.last_data+=10
		}
		if(!this.isLastSesi){
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
