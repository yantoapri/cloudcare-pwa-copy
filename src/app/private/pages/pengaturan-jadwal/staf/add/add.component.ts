import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store';
import { AkunService } from 'src/app/private/services/manajemen-akun/akun.service'
import { DaftarRuangService } from 'src/app/private/services/master-data/ruang-dan-jadwal/daftar-ruang.service'
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service'
import * as moment from 'moment';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as JadwalStaffActions from 'src/app/private/states/pengaturan-jadwal/jadwal-staf/jadwal-staf.actions'
import { JadwalStafPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-staf-payload";
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

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

	getState: Observable<any>;

	jadwalStaff: JadwalStafPayload = new JadwalStafPayload
	isLastStaff=false
	isLastRuang=false
	isLastSesi=false
	constructor(
		private akunService: AkunService,
		private validate:ValidateService,
		private daftarRuangService: DaftarRuangService,
		private fb: FormBuilder,
		private spinner : NgxSpinnerService,
		private jadwalSesiService: JadwalSesiService,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('pengaturanJadwal_jadwalStaf');
		this.minDate.setDate(this.minDate.getDate() + 1);
		// this.minDate.setDate(this.minDate.getDate() + 1);
	}

	ngOnInit(): void {

		$("#tgl1,.repeatEnd").attr('disabled','')

		let tgl = moment().add(1, 'days').format("DD-MM-YYYY")
		this.formInput = this.fb.group({
			id_akun_staff: [null, [Validators.required]],
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
		let payload = new JadwalStafPayload
		payload.id_akun_staff = this.formInput.value.id_akun_staff
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

		this.store.dispatch(JadwalStaffActions.addInitial({ payload: payload }))
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
			}
		}
	}



	deleteDetailSesi(num: number) {
		let index = this.formInput.get('detail') as FormArray
		index.removeAt(num)
	}

	prosesSelectStaff(event: any, aksi: string) {
		
		let param = this.paramStaff
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search ==""||param.search.length>=3){
			this.listJadwalSesi=[]
			param.last_data=0
			this.isLastStaff=false
			}else{
				this.isLastStaff=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			param.search = ""
			this.listJadwalSesi=[]
			param.last_data=0
			this.isLastStaff=false
		}
		if(aksi=="last_page"){
			if(!this.isLastRuang)
			param.last_data+=10
		}
		if(!this.isLastRuang){
			this.loadingListStaff = true
			this.akunService.prosesSelectAkun(param, aksi, 'staff')
				.subscribe(resp => {
					if(resp){
						if(resp.response.length==0){
							this.isLastStaff=true
						}else{
							if(resp.response.length<10){
								if(aksi=="search")this.listStaff=[]
								resp.response.map(val=>{
									let i=this.listStaff.findIndex(x=>x.id_akun==val.id_akun_)
									if(i==-1)
									this.listStaff.push(val)
								})
								this.isLastStaff=true
							}else{
								resp.response.map(val=>{
									let i=this.listStaff.findIndex(x=>x.id_akun==val.id_akun)
									if(i==-1)
									this.listStaff.push(val)
								})
							}
						}
					}
					this.loadingListStaff = false
				}, err => {
					this.loadingListStaff = false
				})
		}
	}

	prosesSelectDaftarRuang(event: any, aksi: string) {
		
		let param = this.paramDaftarRuang
		if (aksi == 'search')
		{
			param.search = event.term
			if(param.search ==""||param.search.length>=3){
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
				this.loadingListDaftarRuang = false
				if(resp){
					if(resp.response.length==0){
						this.isLastRuang=true
					}else{
						if(resp.response.length){
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
			param.search = ""
		}
		if(aksi=="last_page"){
			if(!this.isLastSesi)
			param.last_data+=10
		}
		if(!this.isLastSesi){
			this.loadingListJadwalSesi = true
			this.jadwalSesiService.prosesSelectJadwalSesi(param, aksi)
			.subscribe(res => {
				
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
				this.loadingListJadwalSesi = false
			}, err => {
				this.loadingListJadwalSesi = false
			})
		}
	}


}
