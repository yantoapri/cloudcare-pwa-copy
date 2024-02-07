import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulBiayaService } from 'src/app/private/modul-api/modul-master-node/modul-biaya.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ModulResepService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-resep.service';
import { ModulObatService } from 'src/app/private/modul-api/modul-master-node/modul-obat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder,Validators } from "@angular/forms";
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import {ValidateService} from 'src/app/private/services/validate/validateService'
import { AntreanDokterUmumService } from 'src/app/private/services/dokter/antrean/antrean-dokter-umum.service';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as ResepAction from 'src/app/private/states/resep/resep.action'
import { ObatPayload} from 'src/app/private/models/class-payload-api/gudang-transaksi/resep-payload';
import { ModulMetodeBayarService } from "src/app/private/modul-api/modul-master-node/modul-metode-bayar.service"
import {DataPasienService} from 'src/app/private/services/pasien/data-pasien.service'
import {MoneyService} from 'src/app/private/services/money/index'
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { AESService } from 'src/app/private/services/AES/aes'
import { ModulStokService as StokObat } from "src/app/private/modul-api/modul-gudang-transaksi/modul-stok.service";

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	dtOptionsBiaya: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataResep: ObatPayload = new ObatPayload
	constructor(
		private ModalService: ModalService,
		private ModulResepService: ModulResepService,
		private StokObat:StokObat,
		private spinner : NgxSpinnerService,
		private ModulBiayaService: ModulBiayaService,
		private activatedRoute: ActivatedRoute,
		private ModulMetodeBayarService: ModulMetodeBayarService,
		private ModulObatService: ModulObatService,
		private DataPasienService:DataPasienService,
		private antreanDokterUmumService: AntreanDokterUmumService,
		private fb: FormBuilder,
		private validate:ValidateService,
		private money:MoneyService,
		private auth:AuthService,
		private aes:AESService,
		private store: Store<fromApp.PrivateAppState>,) {
		this.getState = this.store.select('resep')
	}
	totalStok=0
	dataAdd = []
	dataObat: any = []
	signa_jml: number = 0
	signa_hari: number = 0
	kemasan:any
	diskon: number = 0
	jenis_diskon: any = "persen"
	satuan_qty = 0
	submitted = false
	id_resep = ""
	id_obat=null
	optionObat=[]
	title = ""
	isEdit = false
	formDiagnosa:any
	formDiagnosaBiaya:any
	jenis_pembayaran: string = 'tunai'
	id_metode_bayar: string = ''
	jumlah_pembayaran: number = 0
	params_get = {
		last_data: 0,
		get_data: 10,
		search: "",

	}
	maxJml=0
	stok=0
	params_listtable = {
		"draw": 1,
		"columns": [
			{
				"data": 0,
				"name": "",
				"searchable": true,
				"orderable": false,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": "nameuser",
				"name": "",
				"searchable": true,
				"orderable": true,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": "nama",
				"name": "",
				"searchable": true,
				"orderable": true,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": "jk",
				"name": "",
				"searchable": false,
				"orderable": false,
				"search": {
					"value": "",
					"regex": false
				}
			},
			{
				"data": 4,
				"name": "",
				"searchable": true,
				"orderable": true,
				"search": {
					"value": "",
					"regex": false
				}
			}
		],
		"order": [],
		"start": 0,
		"length": 10,
		"search": {
			"value": "",
			"regex": false
		},
		"nama": ""
	}
	biayaLain: any = {}
	biaya: string = ""
	optionMetodeBayar: any
	loadingBiaya: boolean
	listBiaya: any[] = []
	optionBiaya: any[] = []
	formTambah:any
	tabPane={pane1:true,pane2:false}
	resep_obat:any
	riwayat:any
	optionsCur:any
	totalObat=0
	totalAll=0
	totalPajak=0
	biaya_tindakan=0
	urlBack=""
	kemasan_level=0
	keyGen:any
	isLastObat=false
	isLastBiaya=false
	isLoadingObat=false
	ngOnInit(): void {
		this.keyGen=this.aes.getKeyLogin(this.auth.currentUserValue)
		this.optionsCur=this.money.currency()
		this.formTambah = this.fb.group({
			no_rm : ["", []],
			jenis_kelamin : ["", [Validators.required]],
			nik : ["", [Validators.required]],
			tgl_lahir : ["", [Validators.required]],
			nama : ["", [Validators.required]],
			no_bpjs : ["", []],
			golongan_darah : ["", []],
			no_hp : ["", [Validators.required]],
			kode_phone:[''],
			nama_panggilan : ["SDR", []],
			tempat_lahir : ["", []],
			agama : ["", []],
			status_perkawinan : ["", []],
			pekerjaan : ["", []],
			kewarganegaraan : ["", []],
			status_bpjs : ["0", []],
			jenis_alamat: ["ktp", []],
			kecamatan : ["", []],
			desa : ["", []],
			provinsi : ["", []],
			kabupaten : ["", []],
			alamat : ["", []],
			alamat_ktp : ["", [Validators.required]],
			alamat_domisili : ["", []],
		  })
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
			biaya_dokter: ["", []],
			tindakan_medis: this.fb.array([])
		})

		this.formDiagnosaBiaya = this.fb.group({
			jm: ["0", []],
			jt: ["0", []],
			bhp: ["0", []],
			biaya_tindakan: ["0", []],
			lain_lain: ["0", []],
			biaya_dokter: ["0", []],
			pajak:["11", []],
		})
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.urlBack='../../../../../'+params.page
				this.id_resep = params.id
				this.spinner.show('spinner1')
				this.getPasien(params.id_pasien)
				this.getAntrian(params.id_antrian)
				this.showObat(params.id)
			}
		})
		
		this.ModulMetodeBayarService.get(this.params_get)
			.subscribe((resp: any) => {
				this.optionMetodeBayar = resp.response
			})
		this.getState.subscribe((resp: any) => {
			if(resp){
				if(resp.ObatPayload!=null){
					this.spinner.show('spinner1')
					this.showObat(this.id_resep)
					this.modalClose()
					this.submitted = false
				}
			}
		})
	}
	convertDate(val){
		return moment(val).format('DD-MM-YYYY')
	}
	Money(val){
		return this.money.formatRupiah(val)
	}
	setNull(e){
		e.target.value=e.target.value==""?0:e.target.value
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	dekryp(val){
		try{
			return this.aes.decrypt(val,this.keyGen.key,this.keyGen.iv,256)
		}
		catch(err){
			return val
		}
	}
	inputChange(){
		this.totalAll=parseInt(this.formDiagnosaBiaya.value.jt)+parseInt(this.formDiagnosaBiaya.value.bhp)+
		parseInt(this.formDiagnosaBiaya.value.biaya_dokter)+parseInt(this.formDiagnosaBiaya.value.jm)+
		parseInt(this.formDiagnosaBiaya.value.lain_lain)+parseInt(this.formDiagnosaBiaya.value.biaya_tindakan)
		this.totalPajak=this.totalObat*(this.formDiagnosaBiaya.value.pajak/100)
		this.totalAll+=this.totalPajak+this.totalObat
	}
	getNumber(val){
		return parseInt(val).toString()
	}
	getPasien(id_pasien){
		this.spinner.show('spinner1')
		this.DataPasienService.show(id_pasien).subscribe(res => {
			if(res.metaData.response_code=='0000'){
				this.formTambah.patchValue({
					no_rm : res.response.full_rm,
					jenis_kelamin : res.response.jenis_kelamin,
					no_bpjs : res.response.no_bpjs,
					golongan_darah : res.response.golongan_darah ? res.response.golongan_darah : "",
					nik : res.response.nik,
					no_hp : res.response.no_hp,
					kode_phone:res.response.kode_phone,
					nama_panggilan : res.response.nama_panggilan,
					tempat_lahir : res.response.tempat_lahir,
					tgl_lahir : res.response.tgl_lahir ? moment(this.dekryp(res.response.tgl_lahir)).format("MM/DD/YYYY") : null,
					agama : res.response.agama ? res.response.agama : "",
					status_perkawinan : res.response.status_perkawinan ? res.response.status_perkawinan : "",
					pekerjaan : res.response.pekerjaan ? res.response.pekerjaan : "",
					kewarganegaraan : res.response.kewarganegaraan ? res.response.kewarganegaraan : "",
					nama : res.response.nama,
					status_bpjs : res.response.status_bpjs ? res.response.status_bpjs : "0",
					jenis_alamat : res.response.jenis_alamat,
					kecamatan : res.response.jenis_alamat=='ktp'?res.response.alamat.ktp.district:res.response.alamat.domisili.district,
					desa : res.response.jenis_alamat=='ktp'?res.response.alamat.ktp.village:res.response.alamat.domisili.village,
					provinsi : res.response.jenis_alamat=='ktp'?res.response.alamat.ktp.province:res.response.alamat.domisili.province,
					kabupaten :res.response.jenis_alamat=='ktp'?res.response.alamat.ktp.regency:res.response.alamat.domisili.regency,
					alamat:res.response.jenis_alamat=='ktp'?res.response.alamat.ktp.alamat:res.response.alamat.domisili.alamat
				  })
				  this.spinner.hide('spinner1')
			}
		})
		
	}
	getAntrian(id_antrian){
		this.spinner.show('spinner1')
		this.antreanDokterUmumService.getByIdAntrian(id_antrian)
		.subscribe(res => {
			if(res.metaData.response_code=='0000'){
				this.formDiagnosa.patchValue({
					tindakan: res.response.tindakan,
					alergi: res.response.alergi,
				})
				this.antreanDokterUmumService.showDiagnosa(id_antrian).subscribe(resp => {
					if(resp.metaData.response_code=='0000'){
						this.formDiagnosaBiaya.patchValue({
							jm: resp.response.jm,
							jt: resp.response.jt,
							bhp: resp.response.bhp,
							lain_lain: resp.response.lain_lain,
							biaya_dokter: resp.response.biaya_dokter,
						})
						this.formDiagnosaBiaya.patchValue({
							biaya_tindakan:resp.response.total_biaya_tindakan
						})
						this.totalAll=0
						this.riwayat=resp.response
						this.totalAll=parseInt(this.riwayat.jt)+parseInt(this.riwayat.bhp)+parseInt(this.riwayat.biaya_dokter)+
						parseInt(this.riwayat.jm)+parseInt(this.riwayat.lain_lain)+parseInt(this.formDiagnosaBiaya.value.biaya_tindakan)
						this.resep_obat=resp.response.resep_obat
						this.totalPajak=this.totalObat*(this.formDiagnosaBiaya.value.pajak/100)
						this.totalAll+=this.totalPajak+this.totalObat
					}
					this.spinner.hide('spinner1')
				})
				
			}
		})
	}
	ShowTabPane(nomor: number) {
		if (nomor == 1) {
			this.tabPane.pane1 = true
			this.tabPane.pane2 = false
		}else{
			this.tabPane.pane1 = false
			this.tabPane.pane2 = true
		}
	}
	prosesSelectObat(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.optionObat=[]
			this.params_get.last_data=0
			this.isLastObat=false
			}else{
				this.isLastObat=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.optionObat=[]
			this.params_get.last_data=0
			this.isLastObat=false
		}
		if(aksi=="last_page"){
			if(!this.isLastObat)
			this.params_get.last_data+=10
		}
		if(!this.isLastObat){
			this.isLoadingObat=true
			this.ModulObatService.get(this.params_get)
			.subscribe((resp: any) => {
				if(resp){
					if(resp.response.length==0){
						this.isLastObat=true
					}else{
						if(resp.response.length<10){
							resp.response.map(val=>{
								let index=this.optionObat.findIndex(x=>x.id_obat==val.obat)
								if(index==-1)
								this.optionObat.push(val)
							})
							this.isLastObat=true
						}else{
							resp.response.map(val=>{
								let index=this.optionObat.findIndex(x=>x.id_obat==val.obat)
								if(index==-1)
								this.optionObat.push(val)
							})
						}
					}
					this.isLoadingObat=false
				}
			})
		}
	}
	

	setObat() {
		if(this.id_obat){
			let i= this.optionObat.findIndex(x=>x.id_obat==this.id_obat)
			let item=this.optionObat[i]
			let kemasan=item.obat_kemasan.sort((a,b)=>a.kemasan_level-b.kemasan_level)
			item.nama_kemasan=kemasan
			this.dataObat = item
			this.stok=item.stok
			this.maxJml=0
			this.satuan_qty=0
			this.kemasan=null
			this.totalStok=0
		}else{
			this.maxJml=0
			this.satuan_qty=0
			this.kemasan=null
			this.totalStok=0
		}
	}
	setMaxJml(e){
		if(e){
			
			this.kemasan_level=e.kemasan_level
			let totalQty=1
			this.totalStok=0
			this.dataObat.obat_kemasan.map(val=>{
				if(val.kemasan_level<=e.kemasan_level){
					totalQty=val.total_qty
				}
			})
			this.totalStok=this.satuan_qty*totalQty
			let jml=this.totalStok==0?this.satuan_qty:this.totalStok
			this.maxJml=0
			if(jml>0){
				this.spinner.show('spinner1')
				this.StokObat.getBatch({'id_obat':this.id_obat,'jumlah':jml})
				.subscribe(async(resp: any) => {
					resp.response.map((val)=>{
						this.maxJml+=val.jumlah
					})
					this.spinner.hide('spinner1')
				})
			}
		}
	}
	async getBatchObat(){
		if(this.kemasan_level>0){
			let totalQty=1
			this.totalStok=0
			this.dataObat.obat_kemasan.map(val=>{
				if(val.kemasan_level<=this.kemasan_level){
					totalQty=val.total_qty
				}
			})
			this.totalStok=this.satuan_qty*totalQty
		}
		let jml=this.totalStok==0?this.satuan_qty:this.totalStok
		this.maxJml=0
		if(jml>0){
			this.spinner.show('spinner1')
			await this.StokObat.getBatch({'id_obat':this.id_obat,'jumlah':jml})
			.subscribe(async(resp: any) => {
				resp.response.map((val)=>{
					this.maxJml+=val.jumlah
				})
				this.spinner.hide('spinner1')
			})
		}
		
	}
	
	setMaxJml2(){
		let totalQty=1
		this.dataObat.obat_kemasan.map(val=>{
			if(val.kemasan_level<=this.kemasan_level){
				totalQty=val.total_qty
			}
		})
		this.maxJml=this.satuan_qty*totalQty
	}
	add(){
		this.id_obat=null
		this.satuan_qty=0
		this.signa_jml=0
		this.signa_hari=0
		this.kemasan_level=0
		this.jenis_diskon='persen'
		this.diskon=0
		this.kemasan=null
		this.isEdit = false
		this.title="Add Resep"
		this.maxJml=0
		this.modalOpen()
	}
	edit(item) {
		this.title = "Edit Resep"
		item.obat.obat_kemasan=item.obat.obat_kemasan.sort((a,b) => (a.kemasan_level> b.kemasan_level) ? 1 : ((b.kemasan_level > a.kemasan_level) ? -1 : 0))
		let index=item.obat.obat_kemasan.map(e=>e.nama_kemasan).indexOf(item.satuan)
		this.kemasan = item.obat.obat_kemasan[index]
		this.dataObat = {
			'id_obat': item.id_obat,
			'nama_obat':item.nama_obat,
			'harga_jual': item.obat.harga_jual,
			'obat_kemasan': item.obat.obat_kemasan,
			'id_resep_obat_detail': item.id_penjualan_resep_detail
		}
		this.ModulObatService.show(item.id_obat)
		.subscribe((resp: any) => {
			if(resp.metaData.response_code=="0000"){
				this.stok=resp.response.stok
			}
		})
		this.optionObat=[{'id_obat': item.id_obat,
		'nama_obat':item.nama_obat,}]
		this.id_obat=item.id_obat
		this.satuan_qty = item.satuan_qty
		this.maxJml=this.satuan_qty*item.total_qty
		this.signa_jml = item.signa_jumlah
		this.signa_hari = item.signa_hari
		this.jenis_diskon = item.jenis_diskon
		this.diskon = (item.jenis_diskon == "persen") ? item.diskon_persen : item.diskon_rupiah
		this.isEdit = true
		this.submitted=false
		this.modalOpen()
	}
	hapus(id,subtotal) {
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
					ResepAction.deleteInitial({ payload: { id: id } })
				)
				this.totalObat-=parseInt(subtotal)
				this.totalAll=parseInt(this.formDiagnosaBiaya.value.jt)+parseInt(this.formDiagnosaBiaya.value.bhp)+
				parseInt(this.formDiagnosaBiaya.value.biaya_dokter)+parseInt(this.formDiagnosaBiaya.value.jm)+
				parseInt(this.formDiagnosaBiaya.value.lain_lain)+parseInt(this.formDiagnosaBiaya.value.biaya_tindakan)
				this.totalPajak=this.totalObat*(this.formDiagnosaBiaya.value.pajak/100)
				this.totalAll+=this.totalPajak+this.totalObat
				setTimeout(() => {
					this.showObat(this.id_resep)
					this.spinner.hide('spinner1')
				}, 600);
			}
		})
	}
	simpanResep() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 400);
		let data = {
			"id_obat": this.dataObat.id_obat,
			"satuan": this.kemasan.nama_kemasan,
			"satuan_qty": this.satuan_qty,
			"jenis_diskon": this.jenis_diskon,
			"diskon_value": this.diskon,
			"signa_jumlah": this.signa_jml,
			"signa_hari": this.signa_hari
		}
		if (data.satuan == null || data.satuan_qty == null||data.satuan_qty <=0||this.maxJml<this.totalStok|| data.diskon_value == null || data.jenis_diskon == "" || data.signa_jumlah == null || data.signa_hari == null) {
			return false
		}
		this.listBiaya.map(val=>{
			if(val.nilai_biaya<=0){
				return false
			}
		})
		if (!this.isEdit){
			
			let cek=false
			this.dataAdd.map((val)=>{
				if(val.id_obat==data.id_obat)
				cek =true
			})
			if(cek){
				Swal.fire("Warning","Data sudah ada!","warning");
			}else
			{
				this.spinner.show('spinner1')
				this.store.dispatch(ResepAction.addInitial({ "payload": data, "id": this.id_resep }))
			}
			
		}
		else{
			this.spinner.show('spinner1')
			this.store.dispatch(ResepAction.updateInitial({ "payload": data, "id": this.dataObat.id_resep_obat_detail }))
		}
	
	}
	finish() {
		let total = 0
		this.dataAdd.forEach(val => {
			total += parseInt(val.total_harga)
		})
		this.jumlah_pembayaran = this.totalAll
		this.modalBayarOpen()
	}
	bayar() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 400);
		this.spinner.show('spinner1')
		let cekBiaya = true
		let biaya = []
		let total_biaya_lain = 0
	
		if (this.jenis_pembayaran == '' || this.jumlah_pembayaran == 0 || !cekBiaya) {
			if (this.jumlah_pembayaran == 0) Swal.fire("Warning", "Resep masih kosong", "warning")
			if (!cekBiaya) Swal.fire("Warning", "Nilai biaya lain tida boleh kosong", "warning")
			return false
		}
		let data = {
			"jenis_pembayaran": this.jenis_pembayaran,
			"id_metode_bayar": this.id_metode_bayar,
			"jumlah_pembayaran": this.jumlah_pembayaran,
			"biaya_lain": biaya,
			"total_biaya_lain": total_biaya_lain,
			"time_input":new Date().getTime(),
			"jt":this.formDiagnosaBiaya.value.jt,
			"biaya_tindakan_medis":this.formDiagnosaBiaya.value.biaya_tindakan,
			"jm":this.formDiagnosaBiaya.value.jm,
			"bhp":this.formDiagnosaBiaya.value.bhp,
			"biaya_dokter":this.formDiagnosaBiaya.value.biaya_dokter,
			"lain_lain":this.formDiagnosaBiaya.value.lain_lain,
			"pajak_obat":this.formDiagnosaBiaya.value.pajak
		}
		this.store.dispatch(ResepAction.finishInitial({ "payload": data, "id": this.id_resep }))
		this.modalBayarClose()
	}
	modalClose() {
		this.ModalService.close("modalFormContent")
		this.submitted = false
	}
	modalOpen() {
		this.submitted = false
		this.ModalService.open("modalFormContent")

	}
	modalBayarClose() {
		this.submitted = false
		this.ModalService.close("modalBayar")
	}
	modalBayarOpen() {
		this.submitted = false
		this.ModalService.open("modalBayar")
	}
	showObat(id) {
		this.ModulResepService.showObat(id)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code == "0000") {
					this.dataAdd = resp.response
					this.totalObat=0
					let fewQty=1
					let index=1
					if(this.dataAdd.length>0){
						this.dataAdd.map((val,i)=>{
							fewQty=1
							index=val.obat.obat_kemasan.findIndex(x=>x.nama_kemasan==val.satuan)
							val.obat.obat_kemasan.map(value=>{
								if(value.kemasan_level<val.obat.obat_kemasan[index].kemasan_level){
									fewQty=fewQty*value.total_qty
								}
							})
							this.dataAdd[i].subtotal=(parseInt(val.satuan_harga)*(val.total_qty*fewQty))-parseInt(val.diskon_rupiah)
							this.totalObat+=this.dataAdd[i].subtotal
						})
						this.totalAll=parseInt(this.formDiagnosaBiaya.value.jt)+parseInt(this.formDiagnosaBiaya.value.bhp)
						+parseInt(this.formDiagnosaBiaya.value.biaya_dokter)+parseInt(this.formDiagnosaBiaya.value.jm)+
						parseInt(this.formDiagnosaBiaya.value.lain_lain)+parseInt(this.formDiagnosaBiaya.value.biaya_tindakan)
						this.totalPajak=this.totalObat*(this.formDiagnosaBiaya.value.pajak/100)
						this.totalAll+=this.totalPajak+this.totalObat
					}
					this.spinner.hide('spinner1')
				}else{
					this.dataAdd =[]
					this.spinner.hide('spinner1')
				}
			})
	}
	prosesSelectBiaya(event: any, aksi: string) {
		
		let param = this.params_listtable
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.optionBiaya=[]
			this.params_get.last_data=0
			this.isLastBiaya=false
			}else{
				this.isLastBiaya=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.optionBiaya=[]
			this.params_get.last_data=0
			this.isLastBiaya=false
		}
		
		if(aksi=="last_page"){
			if(!this.isLastBiaya)
			this.params_get.last_data+=10
		}
		
		if(!this.isLastBiaya){
			this.loadingBiaya = true
			this.ModulBiayaService.listDatatables(param)
			.subscribe((resp: any) => {
				this.loadingBiaya = false

				if(resp){
					if(resp.response.length==0){
						this.listBiaya=resp.response
					}else{
						resp.response.map(val=>{
							let index=this.listBiaya.findIndex(x=>x.id_biaya==val.id_biaya)
							if(index<0){
								this.listBiaya.push(val)
							}
						})
					}
				}
			})
		}
	}
	addBiaya() {
		this.totalStok=0
		this.maxJml=0
		let cek = this.listBiaya.findIndex(x => x.id_biaya == this.biayaLain.id_biaya)
		if (cek < 0) {
			this.listBiaya.push({
				"id_biaya": this.biayaLain.id_biaya,
				"nama_biaya": this.biayaLain.nama_biaya,
				"nilai_biaya": 0
			})
		} else {
			Swal.fire("Warning", "Data sudah ada, coba pilih data yang lain!", "warning")
		}
	}
	onChange(e) {
		this.biayaLain = e
	}

}