import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulPenjualanService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-penjualan.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormBuilder, Validators} from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as PenjualanAction from 'src/app/private/states/penjualan/penjualan.action'
import { PenjualanPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/penjualan-payload';
import { ModulObatService } from "src/app/private/modul-api/modul-master-node/modul-obat.service";
import { ModulStokService as StokObat } from "src/app/private/modul-api/modul-gudang-transaksi/modul-stok.service";
import { ModulStokService as StokAlat } from "src/app/private/modul-api/modul-gudang-transaksi/modul-stok-alat.service";
import { ModulAlatKesehatanService } from "src/app/private/modul-api/modul-master-node/modul-alat-kesehatan.service"
import { ModulMetodeBayarService } from "src/app/private/modul-api/modul-master-node/modul-metode-bayar.service"
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
import {MoneyService} from 'src/app/private/services/money/index'
import { coerceStringArray } from '@angular/cdk/coercion';
@Component({
	selector: 'add-app',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	reloadTable: boolean
	getState: Observable<any>;
	dataPenjualan: PenjualanPayload = new PenjualanPayload
	constructor(
		private ModalService: ModalService,
		private ModulPenjualanService: ModulPenjualanService,
		private router: Router,
		private validate:ValidateService,
		private fb: FormBuilder,
		private money:MoneyService,
		private store: Store<fromApp.PrivateAppState>,
		private obatService: ModulObatService,
		private alatService: ModulAlatKesehatanService,
		private activatedRoute: ActivatedRoute,
		private spinner : NgxSpinnerService,
		private StokObat :StokObat,
		private StokAlat:StokAlat,
		private metodeBayar: ModulMetodeBayarService
	) {
		this.getState = this.store.select('penjualan')
	}

	dtOptionsObat: DataTables.Settings = {};
	dtOptionsAlat: DataTables.Settings = {};
	cekBatch=null
	totalStok=0
	title=""
	isAddObat = false
	isAddAlat = false
	vbFormInputModal = false
	optionObat=[]
	optionAlat=[]
	optionMetodeBayar: any=[]
	dataBarang: any
	formBarang: any
	formBayar: any
	optionKemasan = []
	dataSatuan: any
	listObat = []
	listBarang = []
	sub_total = 0
	diskon = 0
	total = 0
	satuan_qty=0
	jenis_diskon_penjualan = "persen"
	diskon_penjualan = 0
	id_penjualan_detail = null
	id_penjualan_alat_kesehatan=null
	id_penjualan=null
	pembayaran = "kredit"
	submitted = false
	isSave = false;
	sub_total_all = 0
	indexEdit = null
	target_qty=[]
	isLastObat=false
	isLastAlat=false
	isLastBiaya=false
	isLoadingObat=false
	isLoadingAlat=false
	isLoadingBiaya=false
	params_get = {
		last_data: 0,
		get_data: 10,
		search: ""
	}
	id_obat: string = null
	id_alat_kesehatan: string = null
	listBatchObat:any
	listBatchAlat:any
	level_satuan=0
	totalBayar=0
	satuan_terkecil=""
	ngOnInit(): void {
		this.loadData()
		this.formBarang = this.fb.group({
			id_obat: "",
			id_alat_kesehatan: "",
			satuan_harga: [null, [Validators.required]],
			satuan: [null, [Validators.required]],
			satuan_qty: [null, [Validators.required]],
			jenis_diskon: [null, [Validators.required]],
			diskon_value: [0, [Validators.required]],
			obat_kemasan:null,
			alat_kesehatan_kemasan:null
		})
		this.formBayar = this.fb.group({
			jenis_pembayaran: [null, [Validators.required]],
			id_metode_bayar: "",
			jumlah_pembayaran: [null, [Validators.required]],
			pajak:[11, [Validators.required]],
		})
		// this.dtOptionsAlat = this.getBatchAlat()
	}
	Money(val){
		return this.money.formatRupiah(parseInt(val))
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	getPPN(val){
		let ppn=((this.formBayar.value.pajak/100)*parseInt(val))
		this.totalBayar=parseInt(val)+ppn
		return this.Money(ppn);
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
			this.obatService.get(this.params_get)
				.subscribe((resp: any) => {
					if(resp){
						if(resp.response.length==0){
							this.isLastObat=true
						}else{
							if(resp.response.length<10){
								
								resp.response.map(val=>{
									let index=this.optionObat.findIndex(x=>x.id_obat==val.id_obat)
									if(index==-1)
									this.optionObat.push(val)
								})
								this.isLastObat=true
							}else{
								resp.response.map(val=>{
									let index=this.optionObat.findIndex(x=>x.id_obat==val.id_obat)
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
	prosesSelectAlat(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.optionAlat=[]
			this.params_get.last_data=0
			this.isLastAlat=false
			}else{
				this.isLastAlat=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.optionAlat=[]
			this.params_get.last_data=0
			this.isLastAlat=false
		}
		if(aksi=="last_page"){
			if(!this.isLastAlat)
			this.params_get.last_data+=10
		}
		if(!this.isLastAlat){
			this.isLoadingAlat=true
			this.alatService.get(this.params_get)
			.subscribe((resp: any) => {
				if(resp){
					if(resp.response.length==0){
						this.isLastAlat=true
					}else{
						if(resp.response.length<10){
							resp.response.map(val=>{
								let index=this.optionAlat.findIndex(x=>x.id_alat_kesehatan==val.id_alat_kesehatan)
								if(index==-1)
								this.optionAlat.push(val)
							})
							this.isLastAlat=true
						}else{
							resp.response.map(val=>{
								let index=this.optionAlat.findIndex(x=>x.id_alat_kesehatan==val.id_alat_kesehatan)
								if(index==-1)
								this.optionAlat.push(val)
							})
						}
					}
					this.isLoadingAlat=false
				}
			})
		}
	}
	prosesSelectMetodeBayar(event: any, aksi: string) {
		if (aksi == 'search')
		{	
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.optionMetodeBayar=[]
			this.params_get.last_data=0
			this.isLastBiaya=false
			}else{
				this.isLastBiaya=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.optionMetodeBayar=[]
			this.params_get.last_data=0
			this.isLastBiaya=false
		}
		if(aksi=="last_page"){
			if(!this.isLastBiaya)
			this.params_get.last_data+=10
		}
		if(!this.isLastBiaya){
			this.isLoadingBiaya=true
			this.metodeBayar.get(this.params_get)
			.subscribe((resp: any) => {
				
				if(resp.response.length==0){
					this.isLastBiaya=true
				}else{
					if(resp.response.length<10){
						resp.response.map(val=>{
							this.optionMetodeBayar.push(val)
						})
						this.isLastBiaya=true
					}else{
						resp.response.map(val=>{
							this.optionMetodeBayar.push(val)
						})
					}
				}
				this.isLoadingBiaya=false
			})
		}
	}
	loadData() {

		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.spinner.show('spinner1')
				this.id_penjualan = params.id;
				this.ModulPenjualanService.show(params.id)
					.subscribe(async(resp: any) => {
						if (resp.metaData.response_code) {
							resp = resp.response
							this.jenis_diskon_penjualan = resp.jenis_diskon
							this.listObat=[]
							resp.penjualan_detail.map(val=>{
								let arr=val
								arr["diskon_value"]=val.jenis_diskon=="persen"?val.diskon_persen:val.diskon_rupiah
								this.listObat.push(arr)
							})
							this.listBarang=[]
							resp.penjualan_alat_kesehatan.map(val=>{
								let arr=val
								arr["diskon_value"]=val.jenis_diskon=="persen"?val.diskon_persen:val.diskon_rupiah
								this.listBarang.push(arr)
							})
							this.spinner.hide('spinner1')
						}
						this.spinner.hide('spinner1')
					})
			}

		})
	}
	setKemasan() {
		this.totalStok=0
		this.formBarang.patchValue({
			satuan:null
		})
		this.level_satuan=0
		let i=0
		let item=undefined
		if(this.isAddObat){
			i=this.optionObat.findIndex(x=>x.id_obat==this.id_obat)
			item=this.optionObat[i]
		}else{
			i=this.optionAlat.findIndex(x=>x.id_alat_kesehatan==this.id_alat_kesehatan)
			item=this.optionAlat[i]
		}
		
		if(item!=undefined){
			this.dataBarang = item
			this.formBarang.patchValue({ "satuan_harga": item.harga_jual })
			this.vbFormInputModal = true
			if (this.isAddObat) {
				this.formBarang.id_obat = item.id_obat
				this.dataBarang.obat_kemasan=this.dataBarang.obat_kemasan.sort((a,b) => a.kemasan_level-b.kemasan_level);
				this.listBatchObat=null
				this.satuan_terkecil=this.dataBarang.obat_kemasan[0].nama_kemasan

			} else {
				this.formBarang.id_alat_kesehatan = item.id_alat_kesehatan;
				this.dataBarang.alat_kesehatan_kemasan=this.dataBarang.alat_kesehatan_kemasan.sort((a,b) => a.kemasan_level-b.kemasan_level);
				this.listBatchAlat=null
				this.satuan_terkecil=this.dataBarang.alat_kesehatan_kemasan[0].nama_kemasan

			}	
			
		}else{
			this.id_alat_kesehatan=null
			this.id_obat=null
		}
	
	}
	
	edit(item, index, type) {
		this.indexEdit = index
		if (type == "obat") {
			this.isAddObat = true
			this.isAddAlat = false
			this.formBarang.id_obat=item.id_obat
			this.id_obat = item.id_obat
			this.title="Edit Obat"
			this.optionObat=[{
				id_obat:item.id_obat,
				nama_obat:item.nama_obat
			}]
			this.formBarang.patchValue({
				"id_alat_kesehatan": "",
				"id_obat": item.id_obat,
				"satuan": item.satuan,
				"satuan_harga": item.satuan_harga,
				"satuan_qty": item.satuan_qty,
				"jenis_diskon": item.jenis_diskon,
				"diskon_value": item.diskon_value
			})
			this.obatService.getById(item.id_obat).subscribe(res=>{
				if(res){
					this.dataBarang = res.response
					this.dataBarang.obat_kemasan=this.dataBarang.obat_kemasan.sort((a,b)=>a.kemasan_level-b.kemasan_level)
					this.dataBarang.obat_kemasan.map((val)=>{
						if(val.nama_kemasan==item.satuan){
							this.setSatuan(val)
							this.dataSatuan=val
						}
					})
					this.satuan_terkecil=this.dataBarang.obat_kemasan[0].nama_kemasan
				}
			})
			
			this.listBatchObat=null
			this.id_penjualan_detail=item.id_penjualan_detail
			
			// this.getBatchObat()
		} else {
			this.isAddObat = false
			this.isAddAlat = true
			this.title="Edit Alat Kesehatan"
			this.listBatchAlat=null
			this.formBarang.id_alat_kesehatan = item.id_alat_kesehatan
			this.id_alat_kesehatan = item.id_alat_kesehatan
			this.optionAlat=[{
				id_alat_kesehatan:item.id_alat_kesehatan,
				nama_alat_kesehatan:item.nama_alat_kesehatan
			}]
			this.formBarang.patchValue({
				"id_alat_kesehatan": item.id_alat_kesehatan,
				"id_obat": "",
				"satuan": item.satuan,
				"satuan_harga": item.satuan_harga,
				"satuan_qty": item.satuan_qty,
				"jenis_diskon": item.jenis_diskon,
				"diskon_value": item.diskon_value
			})
			this.alatService.getById(item.id_alat_kesehatan).subscribe(res=>{
				if(res){
					this.dataBarang = res.response
					this.dataBarang.alat_kesehatan_kemasan= this.dataBarang.alat_kesehatan_kemasan.sort((a,b)=>a.kemasan_level-b.kemasan_level)
					this.dataBarang.alat_kesehatan_kemasan.map((val)=>{
						if(val.nama_kemasan==item.satuan){
							this.setSatuan(val)
							this.dataSatuan=val
						}
					})
					this.satuan_terkecil=this.dataBarang.alat_kesehatan_kemasan[0].nama_kemasan

				}
			})
			this.listBatchAlat=null
			this.id_penjualan_alat_kesehatan=item.id_penjualan_alat_kesehatan
			
			
			// this.getBatchAlat()
		}

		
		setTimeout(() => {
			this.modalOpen()
		}, 600);
		this.vbFormInputModal = true
		this.submitted = false
	}
	add(type) {
		this.formBarang.reset()
		if (type == "obat") {
			this.isAddObat = true
			this.isAddAlat = false
			this.title="Add Obat";
			this.listBatchObat=null
			
		} else {
			this.listBatchAlat=null
			this.isAddObat = false
			this.isAddAlat = true
			this.title="Add Alat Kesehatan";
		}
		this.formBarang.patchValue({jenis_diskon:"persen",diskon_value:0})
		this.id_obat=null
		this.satuan_qty=0
		this.id_alat_kesehatan=null
		this.vbFormInputModal = false
		this.submitted = false
		this.indexEdit = null
		this.modalOpen()
	}
	
	async getBatchObat(){
		let jml=this.satuan_qty
		this.totalStok=0
		if(jml>0){
			this.spinner.show('spinner1')
			await this.StokObat.getBatch({'id_obat':this.id_obat,'jumlah':jml})
			.subscribe(async(resp: any) => {
				this.listBatchObat= resp.response
				this.listBatchObat.map((val)=>{
					this.totalStok+=val.jumlah
				})
				this.spinner.hide('spinner1')
			})
		}
		
	}
	async getBatchAlat(){
		let jml=this.satuan_qty
		if(jml>0){
			this.spinner.show('spinner1')
			this.totalStok=0;
			await this.StokAlat.getBatch({'id_alat_kesehatan':this.id_alat_kesehatan,'jumlah':jml})
			.subscribe(async(resp: any) => {
				this.listBatchAlat= resp.response
				this.listBatchAlat.map((val)=>{
					this.totalStok+=val.jumlah
				})
				this.spinner.hide('spinner1')
			})
		}
	}
	async cekBatchObat(id,jml){
	}
	async cekBatchAlat(id,jml){
		let res=null
		await this.StokAlat.getBatch({'id_alat_kesehatan':id,'jumlah':jml})
		.subscribe(async(resp: any) => {
			this.cekBatch=resp.metaData.response_code=='0000'?resp.response.data:null
		})
		return res
	}
	modalOpen() {
		this.ModalService.open("modalFormContent");
	}
	modalClose() {
		this.ModalService.close("modalFormContent");
	}
	modalBayarOpen() {
		this.ModalService.open("modalBayar");
	}
	modalBayarClose() {
		this.ModalService.close("modalBayar");
	}
	setSatuan_qty(data){
		if(data){
			this.satuan_qty=1
			data.map(val=>{
				if(val.kemasan_level<=this.level_satuan){
					this.satuan_qty*=val.total_qty
				}
			})
			this.satuan_qty*=this.formBarang.value.satuan_qty
		}
	}
	
	setSatuan(item) {
		if(item){
			this.level_satuan=item.kemasan_level;
			if(this.level_satuan==1){
				this.satuan_qty=item.target_qty*this.formBarang.value.satuan_qty
			}else{
				if(this.isAddObat){
					this.setSatuan_qty(this.dataBarang.obat_kemasan)
				}else{
					this.setSatuan_qty(this.dataBarang.alat_kesehatan_kemasan)
				}
			}
			
			if(this.isAddObat){
				this.getBatchObat()
			}
			if(this.isAddAlat){
				this.getBatchAlat()
			}
		}
	}
	bayar() {
		this.submitted = false
		let total = 0
		this.listBarang.forEach(val => {
			total += this.getSub(val.jenis_diskon,val.total_qty, val.satuan_harga, val.diskon_value)
		})
		this.listObat.forEach(val => {
			total += this.getSub(val.jenis_diskon,val.total_qty, val.satuan_harga, val.diskon_value)
		})
		this.formBayar.patchValue({ "jenis_pembayaran":'',"id_metode_bayar":null,"jumlah_pembayaran": total })
		this.modalBayarOpen()
	}
	submitBayar() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300)
		if (this.formBayar.invalid||(this.formBayar.value.jenis_pembayaran=="transfer"&& this.formBayar.value.id_metode_bayar==null)) {
			return false
		}
		Swal.fire(
			{
				title: 'Apa anda yakin?',
				icon: 'warning',
				showCancelButton: true,
				allowOutsideClick: false,
				confirmButtonText: 'Ya, lanjutkan!',
				cancelButtonText: 'Batal',
			}
		).then((result) => {
			if (result.isConfirmed) {
				this.spinner.show('spinner1')
				let data=this.formBayar.value
				data.jumlah_pembayaran=this.totalBayar
				this.ModulPenjualanService.update(this.id_penjualan,data,)
					.subscribe(async(resp: any) => {
						if(resp.metaData.response_code=="0000"){
							setTimeout(() => {
							this.spinner.hide('spinner1')
						}, 400);
						this.modalBayarClose()
						this.router.navigate(['penjualan/penjualan-kasir/struk/' + this.id_penjualan])
						}else{
							Swal.fire("Error",resp.metaData.message,'error')
						}
				},err=>{
					Swal.fire("Error",err.metaData.message,'error')
				})
			} else {
				this.modalBayarClose()
			}
		})

	}
	async submitBarang() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300)
		if (this.formBarang.invalid) {
			return false
		}
		if(this.satuan_qty<=this.totalStok){
			
			this.spinner.show('spinner1')
			if (this.isAddObat) {
				let data={
					"satuan_harga": this.formBarang.value.satuan_harga,
					"satuan": this.formBarang.value.satuan,
					"satuan_qty": this.formBarang.value.satuan_qty,
					"jenis_diskon": this.formBarang.value.jenis_diskon,
					"diskon_value":this.formBarang.value.diskon_value,
					"id_obat":this.dataBarang.id_obat,
					"nama_obat":this.dataBarang.nama_obat,
					"obat_kemasan":this.dataBarang.obat_kemasan,
					"kemasan_konversi":this.dataSatuan?.kemasan_konversi,
					"target_kemasan":this.formBarang.value.satuan_qty,
					"sub_total":this.getSub(this.formBarang.value.jenis_diskon,
						 this.formBarang.value.total_qty, this.formBarang.value.satuan_harga,
						  this.formBarang.value.diskon_value)
				}
					
				if (this.indexEdit == null){
					this.ModulPenjualanService.addObat(data, this.id_penjualan)
					.subscribe((res) => {
						if(res.metaData.response_code=="0000"){
							this.loadData()
							this.modalClose()
							this.spinner.hide('spinner1')
						}else{
							Swal.fire(
								{
									title:"Error",
									text: res.metaData.message,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
					},error=>{
						if(error.response.length==0)
						{
							Swal.fire(
							{
								title:"Error",
								text: error.metaData.message,
								icon: 'error',
								showCancelButton: false,
								allowOutsideClick: false,
								confirmButtonText: 'OK',
							}
							)
						}
						else{
							let msg=""
							error.response.map(val=>{
								msg+=val.message+' \n\n'
							})
							Swal.fire(
								{
									title:"Error",
									text: msg,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
					})
				}else{
					let dataUpdate={
						"id_obat": data.id_obat,
						"satuan": data.satuan,
						"satuan_qty": data.satuan_qty,
						"jenis_diskon": data.jenis_diskon,
						"diskon_value": data.diskon_value
					}
					this.ModulPenjualanService.updateObat(dataUpdate, this.id_penjualan_detail)
					.subscribe((res) => {
						if(res.metaData.response_code=="0000"){
							this.loadData()
							this.listBatchObat=[]
							this.modalClose()
							this.spinner.hide('spinner1')
						}else{
							this.spinner.hide('spinner1')
							Swal.fire(
								{
									title:"Error",
									text: res.metaData.message,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
					},error=>{
						this.spinner.hide('spinner1')
						if(error.response.length==0)
						{
							Swal.fire(
							{
								title:"Error",
								text: error.metaData.message,
								icon: 'error',
								showCancelButton: false,
								allowOutsideClick: false,
								confirmButtonText: 'OK',
							}
							)
						}
						else{
							let msg=""
							error.response.map(val=>{
								msg+=val.message+' \n\n'
							})
							Swal.fire(
								{
									title:"Error",
									text: msg,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
					})
				}
			
					
			} else {
				let data={
					"satuan_harga": this.formBarang.value.satuan_harga,
					"satuan": this.formBarang.value.satuan,
					"satuan_qty": this.formBarang.value.satuan_qty,
					"jenis_diskon": this.formBarang.value.jenis_diskon,
					"diskon_value":this.formBarang.value.diskon_value,
					"id_alat_kesehatan":this.dataBarang.id_alat_kesehatan,
					"nama_alat_kesehatan":this.dataBarang.nama_alat_kesehatan,
					"alat_kesehatan_kemasan":this.dataBarang.alat_kesehatan_kemasan,
					"kemasan_konversi":this.dataSatuan?.kemasan_konversi,
					"target_kemasan":this.formBarang.value.satuan_qty,
					"sub_total":this.getSub(this.formBarang.value.jenis_diskon,
						 this.formBarang.value.total_qty, this.formBarang.value.satuan_harga,
						  this.formBarang.value.diskon_value)
				}
				if (this.indexEdit == null){
					this.ModulPenjualanService.addAlat(data, this.id_penjualan)
					.subscribe((res) => {
						if(res.metaData.response_code=="0000"){
							this.loadData()
							this.modalClose()
							this.spinner.hide('spinner1')
						}
						else{
							this.spinner.hide('spinner1')
							Swal.fire(
								{
									title:"Error",
									text: res.metaData.message,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
					},error=>{
						this.spinner.hide('spinner1')
						if(error.response.length==0)
						{
							Swal.fire(
							{
								title:"Error",
								text: error.metaData.message,
								icon: 'error',
								showCancelButton: false,
								allowOutsideClick: false,
								confirmButtonText: 'OK',
							}
							)
						}
						else{
							let msg=""
							error.response.map(val=>{
								msg+=val.message+' \n\n'
							})
							Swal.fire(
								{
									title:"Error",
									text: msg,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
					})
				}else{
					let dataUpdate={
						"id_alat_kesehatan": data.id_alat_kesehatan,
						"satuan": data.satuan,
						"satuan_qty": data.satuan_qty,
						"jenis_diskon": data.jenis_diskon,
						"diskon_value": data.diskon_value
					}
					this.ModulPenjualanService.updateAlat(dataUpdate, this.id_penjualan_alat_kesehatan)
					.subscribe((res) => {
						if(res.metaData.response_code="0000"){
							this.loadData()
							this.listBatchAlat=[]
							this.modalClose()
							this.spinner.hide('spinner1')
						}else{
							this.spinner.hide('spinner1')
							Swal.fire(
								{
									title:"Error",
									text: res.metaData.message,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
						
					},error=>{
						this.spinner.hide('spinner1')
						if(error.response.length==0)
						{
							Swal.fire(
							{
								title:"Error",
								text: error.metaData.message,
								icon: 'error',
								showCancelButton: false,
								allowOutsideClick: false,
								confirmButtonText: 'OK',
							}
							)
						}
						else{
							let msg=""
							error.response.map(val=>{
								msg+=val.message+' \n\n'
							})
							Swal.fire(
								{
									title:"Error",
									text: msg,
									icon: 'error',
									showCancelButton: false,
									allowOutsideClick: false,
									confirmButtonText: 'OK',
								}
							)
						}
					})

				}
			
			}
		
			this.indexEdit = null
			
		}
	}
	hapus(item, index, type) {
		Swal.fire(
			{
				title: 'Apa anda yakin?',
				icon: 'warning',
				showCancelButton: true,
				allowOutsideClick: false,
				confirmButtonText: 'Ya, lanjutkan!',
				cancelButtonText: 'Batal',
			}
		).then((result) => {
			if (result.isConfirmed) {
				this.spinner.show('spinner1')
				if (type == "obat") {
					this.listObat = this.listObat.filter(item => item !== this.listObat[index])
					if (this.id_penjualan != null) {
						this.store.dispatch(PenjualanAction.deleteObatInitial({ id: item.id_penjualan_detail
						}))
						setTimeout(() => {
							this.spinner.hide('spinner1')
						}, 400);
					}
				} else {
					this.listBarang = this.listBarang.filter(item => item !== this.listBarang[index])
					if (this.id_penjualan != null) {
						this.store.dispatch(PenjualanAction.deleteAlatInitial({ id: item.id_penjualan_alat_kesehatan
						}))
						setTimeout(() => {
							this.spinner.hide('spinner1')
						}, 400);
					}
				}
			}

		})


	}



	toString(str) {
		return JSON.stringify(str)
	}
	getSub(jenis, jml, harga, diskon) {
		let res = 0
		if (jenis == "persen") {
			res = (jml * harga) - ((jml * harga) * (diskon / 100))
		} else {
			res = (jml * harga) - diskon
		}
		return res;
	}
	getDiskon(jenis, jml, harga, diskon) {
		let res = 0
		if (jenis == "persen") {
			res = (jml * harga) * (diskon / 100)
		} else {
			res = (jml * harga) - diskon
		}
		return res;
	}
	
	hitungTotal() {
		let total, diskon = 0

		if (this.jenis_diskon_penjualan != undefined) {
			this.diskon_penjualan = (this.diskon_penjualan != undefined) ? this.diskon_penjualan : 0

			if (this.jenis_diskon_penjualan == "persen") {
				total = this.sub_total_all - (this.sub_total_all * (this.diskon_penjualan / 100))
				diskon = this.sub_total_all * (this.diskon_penjualan / 100)
			} else {
				total = this.sub_total_all - this.diskon_penjualan
				diskon = this.diskon_penjualan
			}
		} else {
			total = this.sub_total_all;
		}
		this.total = total
		this.diskon = diskon;
	}
	setJenisDiskon(e) {
		this.jenis_diskon_penjualan = e.target.value
		this.hitungTotal()
	}
	setPembayaran(e) {
		this.pembayaran = e.target.value
	}
	setDiskon(e) {
		this.diskon_penjualan = e.target.value
		this.hitungTotal()
	}
	hitungSub() {
		let sub = 0;
		this.listObat.forEach(val => {
			sub += val
		});
		this.listBarang.forEach(val => {
			sub += val
		});
		this.sub_total_all = sub
	}
}
