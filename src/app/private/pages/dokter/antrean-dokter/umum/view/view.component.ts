import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs'
import { DataTableDirective } from 'angular-datatables'
import { AntreanDokterUmumService } from 'src/app/private/services/dokter/antrean/antrean-dokter-umum.service';
import { Pasien } from 'src/app/private/models/pages/dokter/Pasien';
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { Store } from '@ngrx/store';
import {ValidateService} from 'src/app/private/services/validate/validateService'
import { AssessmentService } from 'src/app/private/services/master-data/assessment.service';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as  AntreanUmumAction from 'src/app/private/states/dokter/antrean/umum/anteran-umum.actions'
import { TindakanMedisUmumService } from 'src/app/private/services/master-data/tindakan/tindakan-medis-umum.service';
import { TindakanMedisService} from 'src/app/private/services/perawat/tindakan-medis.service';
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { AESService } from 'src/app/private/services/AES/aes'
import { AntreanUmumPayload } from 'src/app/private/models/class-payload-api/dokter/antrean-dokter/antrean-umum-payload';
import { CdTimerComponent } from 'angular-cd-timer';
import { ModulSuratDokter} from 'src/app/private/modul-api/modul-master-node/modul-surat.service';
import { AntreanPerawatService } from 'src/app/private/services/perawat/antrean-perawat.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ModalService } from 'src/app/shared/_modal';
import {MoneyService} from 'src/app/private/services/money/index'
import Swal from 'sweetalert2/dist/sweetalert2.js'
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})

export class ViewComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	@ViewChild('basicTimer', { static: true }) basicTimer: CdTimerComponent;
	@ViewChild('bodyTable') bodyTable: ElementRef
	@ViewChild('namaAssessmentManual') namaAssessmentManual: ElementRef
	tabPane: any = { pane1: true, pane2: false, pane3: false, pane4: false }
	private element: any;
	jadwalSesi: string
	pasien: Pasien = new Pasien
	pasienJson: string
	tglSekarang: string = moment().locale('id').format('dddd') + ', ' + moment().locale('id').format('LL')
	// public Editor = ClassicEditor;
	formDiagnosa: FormGroup
	formDiagnosaBiaya: FormGroup
	formSuratSehat: FormGroup
	formSuratSakit: FormGroup
	formSuratRujukan: FormGroup
	formSuratDiagnosa: FormGroup
	getState: Observable<any>;
	listAssesment: Array<any> = []
	listTindakanMedis: Array<any> = []
	paramAssesment = { last_data: 0, get_data: 10, search: "" }
	paramTindakanMedis = { last_data: 0, get_data: 10, search: "" }
	idAssesment: any = null
	idTindakanMedis: any = null
	loadingListAssesment: boolean
	loadingTindakanMedis: boolean
	listManualAssessment = new FormArray([])
	isLoadingButton: boolean
	aksiAntrean: any
	reloadTable: boolean
	errorMessage: any | null
	isEdit: boolean = false
	submitted: boolean = false
	simpanSukses: boolean
	pasienPayload: any
	idSelectedPasien: string = ""
	id_diagnosa_dokter_umum:any
	id_antrian=''
	id_pasien=''
	loadingSurat=false
	listSurat=[]
	idSurat=null
	submittedSurat=false
	kode_surat=null
	minDate=new Date()
	maxDate=new Date()
	constructor(
		private antreanDokterUmumService: AntreanDokterUmumService,
		private el: ElementRef,
		private jadwalSesiService: JadwalSesiService,
		private fb: FormBuilder,
		private validate:ValidateService,
		private money:MoneyService,
		private store: Store<fromApp.PrivateAppState>,
		private assessmentService: AssessmentService,
		private surat:ModulSuratDokter,
		private ModalService:ModalService,
		private auth:AuthService,
		private aes:AESService,
		private tindakanMedisUmumService: TindakanMedisUmumService,
		private spinner: NgxSpinnerService

	) {
		this.getState = this.store.select('dokter_antrean_umum')
	}
	optionsCur :any
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	time=false
	time_input=null
	dataSelected:any
	isAddSurat=false
	isEditSurat=false
	indexSurat=""
	minDate2=new Date()
	keyGen:any
	tglLahir=new Date()
	isLastAssesment=false
	isLastMedis=false
	isLastSurat=false
	isLoadingAss=false
	isLoadingMedis=false
	isLoadingSurat=false
	ngOnInit(): void {
		this.keyGen=this.aes.getKeyLogin(this.auth.currentUserValue)
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.minDate = new Date(y, m, d);
		this.minDate2=new Date(y, m, d);
		this.maxDate= new Date(y, m + 1, 0);
		this.optionsCur=this.money.currency()
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='AMATDU2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMATDU1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		this.dtOptions = this.showDataTables()
		this.getJadwalSesi()
		setTimeout(() => { this.basicTimer.reset() })

		this.formDiagnosa = this.fb.group({
			keluhan: ["", [Validators.required]],
			sistole: ["", [Validators.required]],
			diastole: ["", [Validators.required]],
			suhu: ["", [Validators.required]],
			hr: ["", [Validators.required]],
			status_hr: ["tidak_teratur", [Validators.required]],
			rr: ["", [Validators.required]],
			keterangan_rr: ["", [Validators.required]],
			tb: ["", [Validators.required]],
			bb: ["", [Validators.required]],
			alergi: ["", []],
			catatan_khusus: ["", []],
			obyektif_dokter: ["", [Validators.required]],
			hambatan: ["", []],
			pxfisik: ["", []],
			planning: ["", [Validators.required]],
			tindakan: ["", [Validators.required]],
			resep_obat: ["R/", [Validators.required]],
			tindakan_medis: this.fb.array([]),
			surat: this.fb.array([])
		})

		this.formDiagnosaBiaya = this.fb.group({
			jm: [0, []],
			jt: [0, []],
			bhp: [0, []],
			biaya_dokter: [0, []],
			lain_lain: [0, []],
		})
		this.formSuratDiagnosa = this.fb.group({
			pekerjaan: ["", [Validators.required]],
			diagnosa: ["", [Validators.required]],
			terapi: ["", [Validators.required]],
			saran: ["", [Validators.required]],
		})
		this.formSuratSehat = this.fb.group({
			pekerjaan: ["", [Validators.required]],
			td: ["", [Validators.required]],
			tb: ["", [Validators.required]],
			bb: ["", [Validators.required]],
			buta_warna: ["", [Validators.required]],
			keterangan: ["", [Validators.required]],
		})
		this.formSuratSakit = this.fb.group({
			tgl_mulai: [new Date(), [Validators.required]],
			tgl_akhir: [new Date(), [Validators.required]],
			hari: ["", [Validators.required]],
			keterangan: ["", [Validators.required]],
		})
		this.formSuratRujukan = this.fb.group({
			poli: ["", [Validators.required]],
			rs: ["", [Validators.required]],
			diagnosa: ["", [Validators.required]],
			tindakan: ["", [Validators.required]],
		})
		this.getState.subscribe((state) => {
			this.pasienPayload = state.pasien
			this.errorMessage = state.errorMessage
			this.isLoadingButton = state.isLoadingButton
			this.isEdit = state.isEdit
			this.aksiAntrean = state.aksiAntrean
			this.simpanSukses = state.simpanSukses
			if (this.simpanSukses) {
				this.pasien = new Pasien
				this.idSelectedPasien = ""
				this.idAssesment = null
				this.idTindakanMedis = null
				// this.ShowTabPane(1)
				this.reLoadData()
				this.listManualAssessment.clear()
				this.clearArrayTindakan()
				this.formDiagnosa.reset()
				this.formDiagnosaBiaya.reset()
				this.formDiagnosa.patchValue({
					resep_obat: 'R/',
					status_hr: 'tidak_teratur'
				})
				this.basicTimer.stop()
				this.basicTimer.reset()
				this.ShowTabPane(1)
			}
			if (this.isEdit) {
				this.formDiagnosa.patchValue({
					keluhan: this.pasienPayload.keluhan,
					biaya_dokter: this.pasienPayload.biaya_dokter,
					obyektif_dokter: this.pasienPayload.obyektif_dokter,
					planning: this.pasienPayload.planning,
					resep_obat: this.pasienPayload.resep_obat == null ? 'R/' : this.pasienPayload.resep_obat,
					tindakan: this.pasienPayload.tindakan,
					alergi: this.pasienPayload.alergi,
					bb: this.pasienPayload.bb,
					catatan_khusus: this.pasienPayload.catatan_khusus,
					diastole: this.pasienPayload.diastole,
					hambatan: this.pasienPayload.hambatan,
					hr: this.pasienPayload.hr,
					keterangan_rr: this.pasienPayload.keterangan_rr,
					pxfisik: this.pasienPayload.pxfisik,
					rr: this.pasienPayload.rr,
					sistole: this.pasienPayload.sistole,
					status_hr: this.pasienPayload.status_hr,
					suhu: this.pasienPayload.suhu,
					tb: this.pasienPayload.tb,
				})

				this.formDiagnosaBiaya.patchValue({
					jm: this.pasienPayload.jm?this.pasienPayload.jm:0,
					jt: this.pasienPayload.jt?this.pasienPayload.jt:0,
					bhp: this.pasienPayload.bhp?this.pasienPayload.bhp:0,
					biaya_dokter:this.pasienPayload.biaya_dokter?this.pasienPayload.biaya_dokter:0,
					lain_lain: this.pasienPayload.lain_lain?this.pasienPayload.lain_lain:0,
				})
				
				
			}
			if(this.pasienPayload ){
				
				let control = <FormArray>this.formDiagnosa.controls.tindakan_medis;
				let surat = <FormArray>this.formDiagnosa.controls.surat;
				control.clear()
				surat.clear()
				
					this.listAssesment=[]
					this.idAssesment=[]
					this.id_diagnosa_dokter_umum = this.pasienPayload.id_diagnosa_dokter_umum
					if(this.pasienPayload.assessment){
						if(this.pasienPayload.assessment.length>0){
							this.pasienPayload.assessment.map(val=>{
								this.listAssesment.push({
									id_assessment:val.id_assessment,
									nama_full:val.nama_full
								})
								this.idAssesment.push(val.id_assessment)
							})
								
						}
					}
					
					this.listSurat=[]
					if(this.pasienPayload.surat){
						if(this.pasienPayload.surat.length>0){
							this.pasienPayload.surat.map(val=>{
								switch(val.kode_surat){
									case "SRT002":
										surat.push(
											this.fb.group({
												nama_surat:'Surat Kesehatan',
												kode_surat:val.kode_surat,
												id_diagnosa_surat_kesehatan:val.id_diagnosa_surat_kesehatan,
												pekerjaan:val.pekerjaan,
												td: this.formDiagnosa.value.td,
												tb: this.formDiagnosa.value.tb,
												bb:this.formDiagnosa.value.bb,
												buta_warna:val.buta_warna,
												keterangan:val.keterangan
											})
										)
									break;
									case "SRT001":
										surat.push(
											this.fb.group({
												nama_surat:'Surat Sakit',
												kode_surat:val.kode_surat,
												id_diagnosa_surat_sakit:val.id_diagnosa_surat_sakit,
												tgl_mulai_unix: val.tgl_mulai_unix,
												tgl_akhir_unix: val.tgl_akhir_unix,
												hari: 0,
												keterangan: val.keterangan,
											})
										)
									break;
									case "SRT003":
										surat.push(
											this.fb.group({
												nama_surat:'Surat Rujukan',
												kode_surat:val.kode_surat,
												id_diagnosa_surat_rujukan:val.id_diagnosa_surat_rujukan,
												poli: val.nama_poli,
												rs: val.nama_rs,
												diagnosa: val.diagnosa,
												tindakan: val.tindakan,
											})
										)
									break;
									case "SRT004":
										surat.push(
											this.fb.group({
												nama_surat:'Surat Diagnosa',
												kode_surat:val.kode_surat,
												id_diagnosa_surat_diagnosa:val.id_diagnosa_surat_diagnosa,
												pekerjaan: val.pekerjaan,
												diagnosa: val.diagnosa,
												terapi: val.terapi,
												saran: val.saran,
											})
										)
									break;
									default:
										Swal.fire('Warning','Kode Tipe surat belum dipilih','warning')
									break;
								}
								
							})
						}
					}
					
					if(this.pasienPayload.tindakan_medis_dokter){
						if(this.pasienPayload.tindakan_medis_dokter.length>0){
							this.pasienPayload.tindakan_medis_dokter.map(val=>{
								control.push(
									this.fb.group({
										id_tindakan_medis: [val.id_tindakan_medis],
										nama_tindakan: [val.nama_tindakan],
										keterangan: [val.keterangan],
										id_akun_pelaksana: [val.id_pelaksana_medis_tindakan]
									})
								)
							})
						}
						
					}else{
						if(this.pasienPayload.tindakan_medis){
							if(this.pasienPayload.tindakan_medis.length>0){
								this.pasienPayload.tindakan_medis.map(val=>{
									control.push(
										this.fb.group({
											id_tindakan_medis: [val.id_tindakan_medis],
											nama_tindakan: [val.nama_tindakan],
											keterangan: [val.keterangan],
											id_akun_pelaksana: [val.id_pelaksana_medis_tindakan]
										})
									)
								})
							}
						}
					}
					
			}
		})
	}
	dekryp(val){
		try{
			return this.aes.decrypt(val,this.keyGen.key,this.keyGen.iv,256)
		}
		catch(err){
			return val
		}
	}
	getAge(dateString) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}
	setTime(){
		if(!this.time){
		  this.time=true
		  this.time_input=new Date().getTime()
		}
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	setDefault(e){
		if(e.target.value==''){
			e.target.value=0
		}
	}
	getJadwalSesi() {
		this.jadwalSesiService.getJadwalSesi()
			.subscribe(res => {
				this.jadwalSesi = res.response.nama_sesi
			})
	}
	ubahTanggal(tgl: string) {
		// return moment(new Date(tgl)).format('dd-MMMM-YYYY HH:i')
		return moment(new Date(tgl)).format('DD-MMM-YYYY, HH:mm')
	}
	
	prosesSelectAssesment(event: any, aksi: string) {
		
		let param = this.paramAssesment
		if (aksi == 'search')
		{
			this.paramAssesment.search = event.term
			if(this.paramAssesment.search==""||this.paramAssesment.search.length>=3){
			this.listAssesment=[]
			this.paramAssesment.last_data=0
			this.isLastAssesment=false
			}else{
			this.isLastAssesment=true
			}
		}
		
		if(aksi=="open"||aksi=="clear"){
			this.listAssesment=[]
			this.paramAssesment.last_data=0
			this.isLastAssesment=false
			this.paramAssesment.search = ""
		  }
		if(aksi=="last_page"){
			if(!this.isLastAssesment)
			this.paramAssesment.last_data+=10
		}
		if(!this.isLastAssesment){
			this.loadingListAssesment=true
			this.assessmentService.prosesSelectAssesment(param, aksi)
			.subscribe(resp => {
				
				if(resp){
					if(resp.response.length==0){
						this.isLastAssesment=true
					}else{
						if(resp.response.le<10){
							if(aksi=="search")this.listAssesment=[]
							resp.response.map(val=>{
								let i=this.listAssesment.findIndex(x=>x.id_assessment==val.id_assessment)
								if(i==-1)
								this.listAssesment.push(val)
							})
							this.isLastAssesment=true
						}else{
							resp.response.map(val=>{
								this.listAssesment.push(val)
							})
						}
						
					}
					this.loadingListAssesment = false
				}
			})
		}
	}
	toJson(val){
		return JSON.stringify(val)
	}
	prosesSelectTindakanMedis(event: any, aksi: string) {
		this.loadingTindakanMedis = true
		let param = this.paramTindakanMedis
		if (aksi == 'search')
		{
			this.paramTindakanMedis.search = event.term
			if(this.paramTindakanMedis.search==""||this.paramTindakanMedis.search.length>=3){
			this.listAssesment=[]
			this.paramTindakanMedis.last_data=0
			this.isLastMedis=false
			}else{
			this.isLastMedis=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramTindakanMedis.search = ""
			this.listAssesment=[]
			this.paramTindakanMedis.last_data=0
			this.isLastMedis=false
		  }
		if(aksi=="last_page"){
			if(!this.isLastMedis)
			this.paramTindakanMedis.last_data+=10
		}
		if(!this.isLastMedis){
			this.loadingTindakanMedis=true
			this.tindakanMedisUmumService.prosesSelectOption(param, aksi)
			.subscribe(resp => {
				
				if(resp){
					if(resp.response.length==0){
						this.isLastMedis=true
					}else{
						if(resp.response.length<10){
							if(aksi=="search")this.listTindakanMedis=[]
							resp.response.map(val=>{
								let i=this.listTindakanMedis.findIndex(x=>x.id_tindakan_medis==val.id_tindakan_medis)
								if(i==-1)
								this.listTindakanMedis.push(val)
							})
							this.isLastMedis=true
						}else{
							resp.response.map(val=>{
								this.listTindakanMedis.push(val)
							})
						}
					}
					this.loadingTindakanMedis = false
				}
			})
		}
	}
	prosesSelectSurat(event: any, aksi: string) {
		this.loadingSurat = true
		let param = this.paramTindakanMedis
		if (aksi == 'search')
		{
			this.listSurat=[]
			this.paramTindakanMedis.search = event.term
			this.paramTindakanMedis.last_data=0
		}
		else
		{
			this.paramTindakanMedis.search = ""
		}
		
		// if(aksi=="last_page"){
			
		// 	this.paramTindakanMedis.last_data
		// }
		this.loadingSurat = false
		this.surat.getSelectOption(param)
			.subscribe(res => {
				this.loadingSurat = false
				this.listSurat =[]
				res.response.map(val=>{
					if(this.formDiagnosa.value.surat.findIndex(x=>x.kode_surat==val.kode_surat)<0){
						this.listSurat.push(val)
					}
				})
			})
	}

	SubmitDiagnosa() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200);

		if (this.formDiagnosa.invalid) {
			for (const key of Object.keys(this.formDiagnosa.controls)) {
				if (this.formDiagnosa.controls[key].invalid) {
					const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
					invalidControl.focus()
					break;
				}
			}
			return
		}
		let surat=[]
		let err=false
		this.formDiagnosa.value.surat.map(val=>{
			switch(val.kode_surat){
				case "SRT002":
					if(val.pekerjaan==""||val.td==""||val.tb==""||val.buta_warna==""||val.keterangan==""){
						Swal.fire("Warning",'Data Surat Sehat masih ada yang kosong.','warning')
						err=true
					}else{
						surat.push(
							{
								"kode":"SRT002",
								"data":{
									"pekerjaan": val.pekerjaan,
									"tekanan_darah": this.formDiagnosa.value.sistole+'/'+this.formDiagnosa.value.diastole,
									"tinggi_badan": this.formDiagnosa.value.tb,
									"berat_badan": this.formDiagnosa.value.bb,
									"buta_warna":val.buta_warna,
									"keterangan":val.keterangan
								}
							}
						)
					}
					
				break;
				case "SRT001":
					if(val.tgl_mulai==""||val.tgl_akhir==""||val.keterangan==""){
						Swal.fire("Warning",'Data Surat Sakit masih ada yang kosong.','warning')
						err=true
					}else{
						surat.push(
							{
								"kode":"SRT001",
								"data":{
									"tgl_mulai": val.tgl_mulai_unix,
									"tgl_akhir": val.tgl_akhir_unix,
									"keterangan":val.keterangan
								}
							}
						)
					}
				break;
				case "SRT003":
					if(val.poli==""||val.rs==""||val.diagnosa==""||val.tindakan==""){
						Swal.fire("Warning",'Data Surat Rujukan masih ada yang kosong.','warning')
						err=true
					}else{
						surat.push(
							{
								"kode":"SRT003",
								"data":{
									"nama_poli": val.poli,
									"nama_rs": val.rs,
									"diagnosa": val.diagnosa,
									"tindakan": val.tindakan
								}
							}
						)
					}
				break;
				case "SRT004":
					if(val.pekerjaan==""||val.terapi==""||val.diagnosa==""||val.saran==""){
						Swal.fire("Warning",'Data Surat Diagnosa masih ada yang kosong.','warning')
						err=true
					}else{
						surat.push(
							{
								"kode":"SRT004",
								"data":{
									"pekerjaan": val.pekerjaan,
									"diagnosa": val.diagnosa,
									"terapi":val.terapi,
									"saran": val.saran
								}
							}
						)
					}
				break;
				default:
					err=true
				break;
			}
		
		})
		if(err){
			return
		}
		let payload = new AntreanUmumPayload
		payload.surat=surat
		payload.id_antrian = this.pasien.id_antrian
		payload.id_diagnosa_dokter_umum = this.id_diagnosa_dokter_umum
		payload.alergi=this.formDiagnosa.value.alergi
		// payload.assessment = this.formDiagnosa.value.assessment
		payload.bb = this.formDiagnosa.value.bb
		payload.bhp = this.formDiagnosaBiaya.value.bhp
		payload.bhp = parseInt(this.formDiagnosaBiaya.value.bhp)
		payload.biaya_dokter=parseInt(this.formDiagnosaBiaya.value.biaya_dokter)
		payload.catatan_khusus = this.formDiagnosa.value.catatan_khusus
		payload.hambatan = this.formDiagnosa.value.hambatan
		payload.hr = this.formDiagnosa.value.hr
		payload.jm = parseInt(this.formDiagnosaBiaya.value.jm)
		payload.jt = parseInt(this.formDiagnosaBiaya.value.jt)
		payload.keluhan = this.formDiagnosa.value.keluhan
		payload.keterangan_rr = this.formDiagnosa.value.keterangan_rr
		payload.lain_lain = parseInt(this.formDiagnosa.value.lain_lain)
		payload.obyektif_dokter = this.formDiagnosa.value.obyektif_dokter
		payload.planning = this.formDiagnosa.value.planning
		// payload.pxfisik
		payload.resep_obat = this.formDiagnosa.value.resep_obat
		payload.rr = this.formDiagnosa.value.rr
		payload.tb = this.formDiagnosa.value.tb
		payload.sistole = this.formDiagnosa.value.sistole
		payload.diastole = this.formDiagnosa.value.diastole
		payload.status_hr = this.formDiagnosa.value.status_hr
		payload.suhu = this.formDiagnosa.value.suhu
		payload.tindakan = this.formDiagnosa.value.tindakan
		payload.tindakan_medis = this.formDiagnosa.value.tindakan_medis
		payload.time_input=this.time_input
		let arrayAssesment = []
		if (this.idAssesment != null) {
			this.idAssesment.forEach(el => {
				arrayAssesment.push({
					id_assessment: el
				})
			});
			payload.assessment = arrayAssesment
		}

		// let stringAssesment = ""
		// if(this.listManualAssessment.controls.length > 0) {
		//   this.listManualAssessment.value.forEach(el => {
		//     stringAssesment += el + ";"
		//   });
		// }
		payload.assessment_manual = this.listManualAssessment.value
		payload.lain_lain = this.formDiagnosaBiaya.value.lain_lain
		if (this.aksiAntrean === 'insert') {
			this.store.dispatch(AntreanUmumAction.addInitial({ payload: payload }))
		} else {
			this.store.dispatch(AntreanUmumAction.updateInitial({ payload: payload }))
		}

	}

	hapusTindakanMedis(i: number) {
		const fa = this.formDiagnosa.get('tindakan_medis') as FormArray;
		fa.removeAt(i);
	}

	clearArrayTindakan() {
		const fa = this.formDiagnosa.get('tindakan_medis') as FormArray;
		fa.clear()
	}

	addTindakanMedis() {
		if (this.idTindakanMedis != "") {
			let idxTindakan = this.listTindakanMedis.findIndex((el, index) => {
				return el.id_tindakan_medis == this.idTindakanMedis
			})
			if (idxTindakan >= 0) {
				let find = this.listTindakanMedis[idxTindakan]

				let have = this.formDiagnosa.controls.tindakan_medis.value.findIndex((el, index) => {
					return el.id_tindakan_medis == find.id_tindakan_medis
				})

				if (have >= 0) {
					Swal.fire("Warning","sepertinya anda sudah menambahkan data ini",'warning')
				} else {
					let control = <FormArray>this.formDiagnosa.controls.tindakan_medis;
					control.push(
						this.fb.group({
							id_tindakan_medis: [find.id_tindakan_medis],
							nama_tindakan: [find.nama_tindakan],
							keterangan: [""],
							id_akun_pelaksana: [""]
						})
					)
					this.idTindakanMedis=null
				}
			}
		}
	}
	closeBtn(i){
		switch(this.kode_surat){
			case "SRT002":
				this.ModalService.close("modalSuratKesehatan");
			break;
			case "SRT001":
				this.ModalService.close("modalSuratSakit");
			break;
			case "SRT003":
				this.ModalService.close("modalSuratRujukan");
			break;
			case "SRT004":
				this.ModalService.close("modalSuratDiagnosa");
			break;
			default:
				Swal.fire('Warning','Tipe surat belum dipilih','warning')
			break;
		}
		this.kode_surat=""
	}
	setSurat(){
		if(this.idSurat)
		{
			let i=this.listSurat.findIndex(x=>x.id_surat_dokter==this.idSurat)
			this.kode_surat=this.listSurat[i].kode_surat
		}
		else
		this.kode_surat=null
	}
	addSurat() {
		this.formSuratDiagnosa.reset()
		this.formSuratSehat.reset()
		this.formSuratSakit.reset()
		this.formSuratRujukan.reset()
		this.submittedSurat=false
		this.isAddSurat=true
		this.isEditSurat=false
		this.indexSurat=""
			switch(this.kode_surat){
				case "SRT002":
					this.formSuratSehat.patchValue({
						td: this.formDiagnosa.value.sistole+'/'+this.formDiagnosa.value.diastole,
						tb: this.formDiagnosa.value.tb,
						bb:this.formDiagnosa.value.bb,
						pekerjaan:this.pasien.pekerjaan,
					})
					this.ModalService.open("modalSuratKesehatan");
				break;
				case "SRT001":
					this.ModalService.open("modalSuratSakit");
				break;
				case "SRT003":
				this.ModalService.open("modalSuratRujukan");
				break;
				case "SRT004":
					this.formSuratDiagnosa.patchValue({
						pekerjaan:this.pasien.pekerjaan,
					})
					this.ModalService.open("modalSuratDiagnosa");
				break;
				default:
					Swal.fire('Warning','Tipe surat belum dipilih','warning')
				break;
			}
		this.idSurat=null
	}
	saveSurat(i){
		this.submittedSurat=true
		let control = <FormArray>this.formDiagnosa.controls.surat;
		switch(this.kode_surat){
			case "SRT002":
				if (this.formSuratSehat.invalid) {
					return
				}
				if(this.isAddSurat){
					control.push(
						this.fb.group(	
						{
							kode_surat:'SRT002',
							nama_surat:'Surat Kesehatan',
							pekerjaan: this.formSuratSehat.value.pekerjaan,
							td: this.formSuratSehat.value.td,
							tb: this.formSuratSehat.value.tb,
							bb:this.formSuratSehat.value.bb,
							buta_warna:this.formSuratSehat.value.buta_warna,
							keterangan:this.formSuratSehat.value.keterangan
						}
						)
					)
				}else{
					let rows = this.formDiagnosa.get('surat') as FormArray;
    				rows.controls[this.indexSurat].patchValue(
						{
							kode_surat:'SRT002',
							nama_surat:'Surat Kesehatan',
							pekerjaan: this.formSuratSehat.value.pekerjaan,
							td: this.formSuratSehat.value.td,
							tb: this.formSuratSehat.value.tb,
							bb:this.formSuratSehat.value.bb,
							buta_warna:this.formSuratSehat.value.buta_warna,
							keterangan:this.formSuratSehat.value.keterangan
						}
					)
				}
				this.ModalService.close("modalSuratKesehatan");
			break;
			case "SRT001":
				if (this.formSuratSakit.invalid||this.formSuratSakit.value.hari<=0) {
					return
				}
				if(this.isAddSurat){
					control.push(
						this.fb.group(	
						{
							kode_surat:'SRT001',
							nama_surat:'Surat Sakit',
							tgl_mulai_unix: new Date(this.formSuratSakit.value.tgl_mulai).getTime(),
							tgl_akhir_unix: new Date(this.formSuratSakit.value.tgl_akhir).getTime(),
							hari: this.formSuratSakit.value.hari,
							keterangan: this.formSuratSakit.value.keterangan,
						}
						)
					
					)
				}else{
					let rows = this.formDiagnosa.get('surat') as FormArray;
    				rows.controls[this.indexSurat].patchValue(
						{
							kode_surat:'SRT001',
							nama_surat:'Surat Sakit',
							tgl_mulai_unix: new Date(this.formSuratSakit.value.tgl_mulai).getTime(),
							tgl_akhir_unix: new Date(this.formSuratSakit.value.tgl_akhir).getTime(),
							hari: this.formSuratSakit.value.hari,
							keterangan: this.formSuratSakit.value.keterangan,
						}
					);
				
				}
				this.ModalService.close("modalSuratSakit");
			break;
			case "SRT003":
				if (this.formSuratRujukan.invalid) {
					return
				}
				if(this.isAddSurat){
					control.push(
						this.fb.group(	
						{
							kode_surat:'SRT003',
							nama_surat:'Surat Rujukan',
							poli: this.formSuratRujukan.value.poli,
							rs: this.formSuratRujukan.value.rs,
							diagnosa: this.formSuratRujukan.value.diagnosa,
							tindakan: this.formSuratRujukan.value.tindakan,
						}
						)
					
					)
					}else{
						let rows = this.formDiagnosa.get('surat') as FormArray;
    					rows.controls[this.indexSurat].patchValue(
							{
								kode_surat:'SRT003',
								nama_surat:'Surat Rujukan',
								poli: this.formSuratRujukan.value.poli,
								rs: this.formSuratRujukan.value.rs,
								diagnosa: this.formSuratRujukan.value.diagnosa,
								tindakan: this.formSuratRujukan.value.tindakan,
							}
						)
					}
				this.ModalService.close("modalSuratRujukan");
			break;
			case "SRT004":
				if (this.formSuratDiagnosa.invalid) {
					return
				}
				if(this.isAddSurat){
					control.push(
						this.fb.group(	
						{
							kode_surat:'SRT004',
							nama_surat:'Surat Diagnosa',
							pekerjaan: this.formSuratDiagnosa.value.pekerjaan,
							diagnosa: this.formSuratDiagnosa.value.diagnosa,
							terapi: this.formSuratDiagnosa.value.terapi,
							saran: this.formSuratDiagnosa.value.saran,
						}
						)
					)
				}else{
					let rows = this.formDiagnosa.get('surat') as FormArray;
    				rows.controls[this.indexSurat].patchValue(
						{
							kode_surat:'SRT004',
							nama_surat:'Surat Diagnosa',
							pekerjaan: this.formSuratDiagnosa.value.pekerjaan,
							diagnosa: this.formSuratDiagnosa.value.diagnosa,
							terapi: this.formSuratDiagnosa.value.terapi,
							saran: this.formSuratDiagnosa.value.saran,
						}
					)
				}
				this.ModalService.close("modalSuratDiagnosa");
			break;
			default:
				Swal.fire('Warning','Tipe surat belum dipilih','warning')
			break;
		}
		this.kode_surat=""
	}
	editSurat(id,i){
		this.submittedSurat=false
		this.isAddSurat=false
		this.isEditSurat=true
		this.indexSurat=i
		this.kode_surat=id
		switch(id){
			case "SRT002":
				this.formSuratSehat.patchValue(
					{
						nama_surat:'Surat Kesehatan',
						pekerjaan:this.formDiagnosa.value.surat[i].pekerjaan,
						td: this.formDiagnosa.value.sistole+'/'+this.formDiagnosa.value.diastole,
						tb: this.formDiagnosa.value.tb,
						bb:this.formDiagnosa.value.bb,
						buta_warna:this.formDiagnosa.value.surat[i].buta_warna,
						keterangan:this.formDiagnosa.value.surat[i].keterangan
					}
				)
			
				this.ModalService.open("modalSuratKesehatan");
			break;
			case "SRT001":
				this.formSuratSakit.patchValue(
					{
						nama_surat:'Surat Sakit',
						tgl_mulai: new Date(this.formDiagnosa.value.surat[i].tgl_mulai_unix),
						tgl_akhir: new Date(this.formDiagnosa.value.surat[i].tgl_akhir_unix),
						hari: 0,
						keterangan: this.formDiagnosa.value.surat[i].keterangan,
					}
				)
				this.diffDate()
				this.ModalService.open("modalSuratSakit");
			break;
			case "SRT003":
				this.formSuratRujukan.patchValue(
					{
						nama_surat:'Surat Rujukan',
						poli: this.formDiagnosa.value.surat[i].poli,
						rs: this.formDiagnosa.value.surat[i].rs,
						diagnosa: this.formDiagnosa.value.surat[i].diagnosa,
						tindakan: this.formDiagnosa.value.surat[i].tindakan,
					}
				)
				this.ModalService.open("modalSuratRujukan");
			break;
			case "SRT004":
				this.formSuratDiagnosa.patchValue(
					{
						nama_surat:'Surat Diagnosa',
						pekerjaan: this.formDiagnosa.value.surat[i].pekerjaan,
						diagnosa: this.formDiagnosa.value.surat[i].diagnosa,
						terapi: this.formDiagnosa.value.surat[i].terapi,
						saran: this.formDiagnosa.value.surat[i].saran,
					}
				)
				this.ModalService.open("modalSuratDiagnosa");
			break;
			default:
				Swal.fire('Warning','Tipe surat belum dipilih','warning')
			break;
		}
	}
	
	diffDate(){
		if(this.formSuratSakit.value.tgl_mulai!=null&&this.formSuratSakit.value.tgl_akhir!=null){
			var datediff = new Date(this.formSuratSakit.value.tgl_akhir).getTime() - new Date(this.formSuratSakit.value.tgl_mulai).getTime(); // difference 
   			let hasil=datediff / (24 * 60 * 60 * 1000)
			if(hasil>=0){
				this.formSuratSakit.patchValue(
					{
						hari:hasil+1
					}
				)
			}else{
				this.formSuratSakit.patchValue(
					{
						hari:hasil
					}
				)
			}
			
		}else{
			this.formSuratSakit.patchValue(
				{
					hari:0
				}
			)
		}
	}
	hapusSurat(id,i){
		Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, hapus saja!',
			cancelButtonText: 'Tidak, Batalkan'
		  }).then((result) => {
			if (result.value) {
				const fa = this.formDiagnosa.get('surat') as FormArray;
    			fa.removeAt(i);
			//   this.spinner.show('spinner1')
			//   this.store.dispatch(
			// 	AlatKesehtanAction.deleteInitial({ payload: { id: data.id_alat_kesehatan } })
			//   )
			//   setTimeout(() => {
			// 	this.spinner.hide('spinner1')
			//   }, 400);
			}
		  })
	}
	addAssessmentManual() {
		let value = this.namaAssessmentManual.nativeElement.value
		if (value != "") {
			let cekAda = this.listManualAssessment.value.findIndex((el, index) => {
				return el.nama_en == value
			})
			if (cekAda >= 0) {
				Swal.fire("Warning","sepertinya anda sudah menambahkan data ini",'warning')
			} else {
				let newGroup = new FormGroup({})
				newGroup.addControl('nama_en', new FormControl(value))
				this.listManualAssessment.push(newGroup)
				this.namaAssessmentManual.nativeElement.value = ""
			}
		}
	}
	hapusAssessmentManual(i: number) {
		this.listManualAssessment.removeAt(i)
	}
	
	selectedData(data: any) {

		setTimeout(() => {
			
				if (this.idSelectedPasien != data.id_antrian) {
					this.basicTimer.stop()
					this.basicTimer.reset()
					this.basicTimer.start()
					this.pasienPayload = new AntreanUmumPayload
					this.spinner.show();
					this.antreanDokterUmumService.getByIdAntrian(data.id_antrian)
						.subscribe(res => {
							this.submitted = false
							this.id_antrian=data.id_antrian
							this.id_pasien=data.id_pasien
							this.pasien.id_antrian = data.id_antrian
							this.pasien.id_pasien = data.id_pasien
							this.pasien.id_klinik = data.id_klinik
							this.pasien.nama = res.response.nama
							this.pasien.nama_panggilan = res.response.nama_panggilan
							this.pasien.full_rm = res.response.full_rm
							this.pasien.no_bpjs=res.response.no_bpjs
							this.pasien.nik=res.response.nik
							this.pasien.kode_phone=res.response.kode_phone
							this.pasien.no_hp=res.response.no_hp!=undefined?res.response.no_hp:'-'
							this.pasien.provinsi = res.response.provinsi
							this.pasien.desa=res.response.desa
							this.pasien.kabupaten = res.response.kabupaten
							this.pasien.kecamatan = res.response.kecamatan
							let alamat = res.response.alamat + ' ' + this.pasien.kecamatan + ' ' + this.pasien.kabupaten + ' ' + this.pasien.provinsi
							this.pasien.alamat = this.truncateString(String(alamat), 80)
							this.pasien.umur = res.response.tgl_lahir ? moment().diff(this.dekryp(res.response.tgl_lahir), 'years', false) + ' Tahun' : ''
							this.pasien.tgl_lahir = res.response.tgl_lahir ? moment(this.dekryp(res.response.tgl_lahir)).locale('id').format('DD-MM-YYYY') : ''
							this.pasien.tempat_lahir = res.response.tempat_lahir
							this.pasien.jenis_kelamin = res.response.jenis_kelamin
							this.pasien.golongan_darah = res.response.golongan_darah
							this.pasien.agama = res.response.agama
							this.pasien.status_perkawinan = res.response.status_perkawinanss
							this.pasien.pekerjaan = res.response.pekerjaan
							this.pasien.kewarganegaraan = res.response.kewarganegaraan
							this.pasien.no_hp = res.response.no_hp
							this.pasienJson = JSON.stringify(this.pasien)
							this.ShowTabPane(2)
					
							this.spinner.hide();
						}, err => {
							this.spinner.hide();
						})
				}
				this.idSelectedPasien = data.id_antrian
			
		}, 50);
	}

	truncateString(str, n) {
		return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
	}

	showDataTables() {
		const self = this;
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			
			// select: true,
			ajax: (dataTablesParameters: any, callback: any) => {
				Object.assign(dataTablesParameters, { type_poli: 'umum' })
				this.antreanDokterUmumService.getDataTables(dataTablesParameters)
					.subscribe((resp: any) => {
						if(resp.response.data!=undefined)
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
						})
						else
						callback({
							draw: 1,
							recordsTotal: 0,
							recordsFiltered: 0,
							data: []
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
				}, {
					orderable: false,
					data: 'nama',
					render(data: any, type: any, row: any, full: any) {
						return row.nama_panggilan + ' ' + data
					}
				}, {
					orderable: false,
					data: 'status_bpjs',
					render(data: any, type: any, row: any, full: any) {
						return data==1?'Aktif':'Tidak Aktif'
					}
				}, {
					orderable: false,
					data: 'proses_antrian'
				},
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				if(data['proses_antrian']=='sudah')
				{
					$(row).children().css('background-color','#aff1af')
				}
				
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				// Note: In newer jQuery v3 versions, `unbind` and `bind` are
				// deprecated in favor of `off` and `on`
				$('td', row).on('click', () => {
					self.selectedData(data);
				});
				return row;
			}
		}
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	ShowTabPane(nomor: number) {
		if (nomor == 1) {
			this.tabPane.pane1 = true
			this.tabPane.pane2 = false
			this.tabPane.pane3 = false
			this.tabPane.pane4 = false
		} else if (nomor == 2) {
			/** Diagnosa */
			if (this.pasien.id_pasien === undefined) {
				Swal.fire("Warning","pasien belum di pilih",'warning')
			} else {
				this.tabPane.pane1 = false
				this.tabPane.pane2 = true
				this.tabPane.pane3 = false
				this.tabPane.pane4 = false
				this.store.dispatch(AntreanUmumAction.getByIdInitial({ payload: { id: this.id_antrian, id_pasien: this.id_pasien } }))

			}
		} else if (nomor == 3) {
			/** riwayat periksa */
			if (this.pasien.id_pasien === undefined) {
				Swal.fire("Warning","pasien belum di pilih",'warning')
			} else {
				this.tabPane.pane1 = false
				this.tabPane.pane2 = false
				this.tabPane.pane3 = true
				this.tabPane.pane4 = false
			}
		} else {
			/** rekam medis */
			if (this.pasien.id_pasien === undefined) {
				Swal.fire("Warning","pasien belum di pilih",'warning')
			} else {
				this.tabPane.pane1 = false
				this.tabPane.pane2 = false
				this.tabPane.pane3 = false
				this.tabPane.pane4 = true
			}
		}
	}

}
