import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators,} from "@angular/forms";
import * as fromApp from 'src/app/private/states/private-app.states'
import * as FakturPembelianAction from 'src/app/private/states/faktur-pembelian/faktur-pembelian.action'
// import { fakturPayload, obatPayload, AlatKesehatanPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/pembelian-payload';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
// supplier
// import { SupplierPayload } from "src/app/private/models/class-payload-api/master-data/supplier-payload";
// import * as SupplierActions from 'src/app/private/states/master-data/supplier/supplier.actions'
import { ModulSupplierService } from "src/app/private/modul-api/modul-master-node/modul-supplier.service";
import { ModulObatService } from "src/app/private/modul-api/modul-master-node/modul-obat.service";
import { ModulAlatKesehatanService } from "src/app/private/modul-api/modul-master-node/modul-alat-kesehatan.service"
// import { NgbButtonLabel } from '@ng-bootstrap/ng-bootstrap';
import {MoneyService} from 'src/app/private/services/money/index'
import {ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.sass']
})
export class AddComponent implements OnInit {
	optionsCur :any
	formInput: any
	formBarang: any
	formObat: any
	formAlatKesehatan: FormGroup;
	vbInfoObat: boolean = false
	vbFormInputModal: boolean = false
	vbNotifdataFakturObatKosong: boolean = false
	vbNotifdataFakturAlatKosong: boolean = false
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	submitted = false
	savefaktur = false
	optionSupplier=[]
	optionObat=[]
	optionAlatKesehatan=[]
	isAddObat = false
	selectDataObat: any
	selectDataAlat: any
	isAddAlatKesehatan = false
	indexEdit = null
	listBarang = []
	listObat = []
	sub_total = 0
	total_faktur = 0
	id_obat=null
	kemasan:any
	id_alat_kesehatan=null
	ppn:any=0
	params_get = {
		last_data: 0,
		get_data: 10,
		search: ""
	}
	isLastPBF=false
	isLastObat=false
	isLastAlat=false
	isLoadingPBF=false
	isLoadingObat=false
	isLoadingAlat=false
	constructor(
		private modalService: ModalService,
		private spinner : NgxSpinnerService,
		private fb: FormBuilder,
		private validate:ValidateService,
		private money:MoneyService,
		private store: Store<fromApp.PrivateAppState>,
		private modulSupplierService: ModulSupplierService,
		private obatService: ModulObatService,
		private alatKesehatanService: ModulAlatKesehatanService,
	) {
		this.getState = this.store.select('faktur_pembelian')
	}

	vbNotifdataFakturKosong: boolean = true


	ngOnInit(): void {
		this.optionsCur=this.money.currency()
		this.formBarang = this.fb.group({
			satuan: [null, [Validators.required]],
			target_kemasan: [null, ""],
			satuan_qty: [1, [Validators.required]],
			satuan_harga: [0, [Validators.required]],
			jenis_diskon: ["persen", [Validators.required]],
			diskon_persen: "",
			diskon_value: [0, [Validators.required]],
			tanggal_ed: [null, [Validators.required]],
			diskon_rupiah: "",
			no_batch: [null, [Validators.required]],
		})
		this.formInput = this.fb.group({
			id_supplier: [null, [Validators.required]],
			nomor_faktur: [null, [Validators.required]],
			tgl_faktur: [null, [Validators.required]],
			tgl_diterima: [null, [Validators.required]],
			pembayaran: [null, [Validators.required]],
			jatuh_tempo: [null, [Validators.required]],
			ppn: [null, [Validators.required]],
			ppn_nilai: [0, []],
			detail: [],
			alat_kesehatan: []
		})
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	onFocus(id){
		document.getElementById(id).click()
	}
	Money(val){
		return this.money.formatRupiah(val)
	}
	
	
	prosesSelectPBF(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
				this.optionSupplier=[]
				this.params_get.last_data=0
				this.isLastPBF=false
			}else{
				this.isLastPBF=true
			}
			
		}
		if(aksi=="open"||aksi=='clear'){
			this.params_get.search = ""
			this.optionSupplier=[]
			this.params_get.last_data=0
			this.isLastPBF=false
		}
		if(aksi=="last_page"){
			if(!this.isLastPBF)
			this.params_get.last_data+=10
		}
		if(!this.isLastPBF){
			this.isLoadingPBF=true
			this.modulSupplierService.get(this.params_get)
			.subscribe((resp: any) => {
				if(resp){
					if(resp.response.length==0){
						this.isLastPBF=true
					}else{
						if(resp.response.length<10){
							resp.response.map(val=>{
								let i=this.optionSupplier.findIndex(x=>x.id_supplier==val.id_supplier)
								if(i==-1)
								this.optionSupplier.push(val)
							})
							this.isLastPBF=true
						}else{
							resp.response.map(val=>{
								let i=this.optionSupplier.findIndex(x=>x.id_supplier==val.id_supplier)
								if(i==-1)
								this.optionSupplier.push(val)
							})
						}
					}
					this.isLoadingPBF=false
				}
			})
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
			this.params_get.search = ""
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
								let i=this.optionObat.findIndex(x=>x.id_obat==val.id_obat)
								if(i==-1)
								this.optionObat.push(val)
							})
							this.isLastObat=true
						}else{
							resp.response.map(val=>{
								let i=this.optionObat.findIndex(x=>x.id_obat==val.id_obat)
								if(i==-1)
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
			this.optionAlatKesehatan=[]
			this.params_get.last_data=0
			this.isLastAlat=false
			}else{
				this.isLastAlat=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.isLastAlat=false
			this.params_get.last_data=0
			this.optionAlatKesehatan=[]
		}
		if(aksi=="last_page"){
			if(!this.isLastAlat)
			this.params_get.last_data+=10
		}
		if(!this.isLastAlat){
			this.isLoadingAlat=true
			this.alatKesehatanService.get(this.params_get)
			.subscribe((resp: any) => {
				if(resp){
					if(resp.response.length==0){
						this.isLastAlat=true
					}else{
						if(resp.response.length<10){
							resp.response.map(val=>{
								let i=this.optionAlatKesehatan.findIndex(x=>x.id_alat_kesehatan==val.id_alat_kesehatan)
								if(i==-1)
								this.optionAlatKesehatan.push(val)
							})
							this.isLastAlat=true
						}else{
							resp.response.map(val=>{
								let i=this.optionAlatKesehatan.findIndex(x=>x.id_alat_kesehatan==val.id_alat_kesehatan)
								if(i==-1)
								this.optionAlatKesehatan.push(val)
							})
						}
					}
					this.isLoadingAlat=false
				}
			})
		}
	}

	setEdit(i, item, x) {
		this.indexEdit = i
		let data = []
		if (x == 1) {
			let key = Object.keys(this.formBarang.value)
			key.forEach((val) => {
				if(val!='satuan')
				data[val] = item[val]
				else
				{
					data[val]=item.obat.nama_kemasan
				}
			})
			this.selectDataObat = item.obat
			this.isAddObat = true
			this.isAddAlatKesehatan = false
			this.id_obat=item.obat.id_obat
		} else {
			let key = Object.keys(this.formBarang.value)
			key.forEach((val) => {
				if(val!='satuan')
				data[val] = item[val]
				else
				{
					data[val]=item.alat.nama_kemasan
				}
			})
			this.selectDataAlat = item.alat
			this.isAddObat = false
			this.isAddAlatKesehatan = true
			this.id_alat_kesehatan=item.alat.id_alat_kesehatan
		}

		this.formBarang.setValue(data)
		this.submitted = false
		this.vbFormInputModal = true
		this.vbInfoObat = true
		this.modalService.open("modalFormContent");
	}
	deleteItem(i, x) {
		let sub=0
		if (x == 1) {
			sub = this.listObat[i].sub_total
			this.listObat.splice(i, 1);
		} else {
			sub= this.listBarang[i].sub_total
			this.listBarang.splice(i, 1);
		}
		this.sub_total-=((this.formInput.value.ppn_nilai/100)*Number(sub))
		this.setTotal()
	}
	setPPN(val){
		if(val.target.value=='sudah')
		this.formInput.patchValue({ppn_nilai:0})
		else
		this.formInput.patchValue({ppn_nilai:11})

		this.setTotal()
	}
	setTotal(){
		if(this.formInput.value.ppn_nilai>=0){
			let persen =Number(this.formInput.value.ppn_nilai)/100
			this.ppn=persen*Number(this.sub_total)
			this.total_faktur=this.sub_total+this.ppn
			
		}else{
			this.ppn=0
			this.sub_total=0
			this.total_faktur=0
		}
	}
	btnPilihSizeObat() {
		this.vbFormInputModal = true
		this.vbInfoObat = false
	}
	convertDate(date) {
		return moment(date).format('DD-MM-YYYY')
	}
	convertDateYMD(date) {
		return moment(date).format('YYYY-MM-DD')
	}
	getSatuanTerkecil(type,data,qty){
		if(type==1){
			return qty+' '+data.obat.nama_kemasan
		}else
		if(type==2){
			return qty+' '+data.alat.nama_kemasan
		}
	}
	async btnSimpanFormModal() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300)
		if (this.formBarang.invalid) {
			return false
		}
		const data = this.formBarang.value
		
		data.diskon_rupiah = (data.jenis_diskon == "rupiah") ? "1" : "0"
		data.diskon_persen = (data.jenis_diskon == "persen") ? "0" : "1"
		
		if (data.jenis_diskon == "persen") {
			data.sub_total = (data.satuan_harga*data.satuan_qty) - ((data.satuan_harga*data.satuan_qty) * (data.diskon_value / 100))
		} else {
			data.sub_total = (data.satuan_harga*data.satuan_qty) - data.diskon_value
		}
		this.setTotal()
		// this.total_faktur=this.sub_total-((this.formInput.value.ppn_nilai/100)*this.sub_total)
		if (this.indexEdit == null) {
			if (this.isAddObat) {
				data.obat = this.selectDataObat
				let index =-1
				let dataObat=this.listObat
				dataObat.map((val,i)=>{
					if(val.obat.id_obat==data.obat.id_obat&&val.satuan==data.satuan && val.no_batch==data.no_batch){
						index=i
					}
				})
				if (index >= 0) {
					Swal.fire('Warning','Duplicated Data','warning')
				} else {
					this.listObat.push(data)
							setTimeout(() => {
								this.modalClose()
								this.getSubTotalFaktur()
								this.submitted = false
								this.formBarang.reset()
							}, 500);
				}
				
			} else {
				data.alat = this.selectDataAlat
				let index =-1
				this.listBarang.map((val,i)=>{
					if(val.alat.id_alat_kesehatan==data.alat.id_alat_kesehatan && val.satuan==data.satuan && val.no_batch==data.no_batch){
						index=i
					}
				})
				if (index >= 0) {
					Swal.fire('Warning','Duplicated Data','warning')
				}else{
					this.listBarang.push(data)
					setTimeout(() => {
						this.modalClose()
						this.getSubTotalFaktur()
						this.submitted = false
						this.formBarang.reset()
					}, 500);
				}
			}
		} else {
			if (this.isAddObat) {
				data.obat = this.selectDataObat
				let index=-1
				this.listObat.map((val,i)=>{
					if(i!=this.indexEdit&&val.obat.id_obat==data.obat.id_obat&&val.satuan==data.satuan && val.no_batch==data.no_batch){
						index=i
					}
				})
				if(index>=0){
					Swal.fire('Warning','Duplicated Data','warning')
				}else{
					this.listObat[this.indexEdit] = data
					setTimeout(() => {
						this.modalClose()
						this.getSubTotalFaktur()
						this.submitted = false
						this.formBarang.reset()
					}, 500);
				}
			} else {
				data.alat = this.selectDataAlat
				let index =-1
				this.listBarang.map((val,i)=>{
					if(i!=this.indexEdit&&val.alat.id_alat_kesehatan==data.alat.id_alat_kesehatan && val.satuan==data.satuan && val.no_batch==data.no_batch){
						index=i
					}
				})
				if(index>=0){
					Swal.fire('Warning','Duplicated Data','warning')
				}else{
					this.listBarang[this.indexEdit] = data
					setTimeout(() => {
						this.modalClose()
						this.getSubTotalFaktur()
						this.submitted = false
						this.formBarang.reset()
					}, 500);
				}
			}
		}
		
		
	}
	getSubTotalFaktur(){
		this.total_faktur=0
		this.sub_total=0
		this.listObat.map(val=>{
			this.sub_total+=Number(val.sub_total)
		})
		this.listBarang.map(val=>{
			this.sub_total+=Number(val.sub_total)
		})
		this.setTotal()
	}
	btnSave() {
		this.savefaktur = false
		setTimeout(() => {
			this.savefaktur = true
			return false
		}, 300)
		if (this.formInput.invalid) {
			return false
		}
		this.spinner.show('spinner1')
		let data = this.formInput.value;
		data.detail = []
		this.listObat.forEach((val) => {
			data.detail.push({
				"id_obat": val.obat.id_obat,
				"satuan": val.satuan,
				"satuan_qty": val.satuan_qty,
				"kemasan_konversi": "",
				"satuan_harga": val.satuan_harga,
				"jenis_diskon": val.jenis_diskon,
				"diskon_value": val.diskon_value,
				"tanggal_ed": new Date(val.tanggal_ed).getTime(),
				"no_batch": val.no_batch,
				"keterangan": ""
			})
		})
		data.alat_kesehatan = []
		this.listBarang.forEach((val) => {
			data.alat_kesehatan.push({
				"id_alat_kesehatan": val.alat.id_alat_kesehatan,
				"kemasan_konversi": "",
				"satuan": val.satuan,
				"satuan_qty": val.satuan_qty,
				"satuan_harga": val.satuan_harga,
				"jenis_diskon": val.jenis_diskon,
				"diskon_value": val.diskon_value,
				"tanggal_ed": new Date(val.tanggal_ed).getTime(),
				"no_batch": val.no_batch,
				"keterangan": ""
			})
		})
		data.tgl_faktur = new Date(data.tgl_faktur).getTime()
		data.tgl_diterima = new Date(data.tgl_diterima).getTime()
		data.jatuh_tempo = new Date(data.jatuh_tempo).getTime()
		data.ppn_nilai=data.ppn=='sudah'?0:data.ppn_nilai
		this.store.dispatch(FakturPembelianAction.addInitial({ payload: data }))
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
		this.savefaktur = false
	}
	btnKembaliCariObat() {
		this.vbFormInputModal = false
		this.vbInfoObat = true
	}
	btnClickTambah(i) {
		if (i == 1) {
			this.isAddObat = true
			this.id_obat=null
			this.isAddAlatKesehatan = false
		} else {
			this.isAddObat = false
			this.id_alat_kesehatan=null
			this.isAddAlatKesehatan = true
		}
		this.formBarang.patchValue({
			satuan: null,
			satuan_qty: null,
			satuan_harga: null,
			jenis_diskon: "persen",
			diskon_persen: "",
			diskon_value: 0,
			tanggal_ed: null,
			diskon_rupiah: 0,
			no_batch:""
		})
		this.indexEdit=null
		this.submitted = false
		this.vbFormInputModal = false
		this.vbInfoObat = false
		this.modalService.open("modalFormContent");
	}
	setKemasan(val,i){
		this.kemasan=val
		this.formBarang.patchValue({"target_kemasan":val.nama_kemasan_singkatan})
		if(i){
		this.selectDataObat['nama_kemasan']=this.kemasan.nama_kemasan
		}else{
		this.selectDataAlat['nama_kemasan']=this.kemasan.nama_kemasan
		}
	}
	
	selectData(i) {
		if (i == 1) {
			let index=this.optionObat.findIndex(x=>x.id_obat==this.id_obat)
			this.selectDataObat = this.optionObat[index]
			this.selectDataObat.obat_kemasan=this.selectDataObat.obat_kemasan.sort((a,b) => a.kemasan_level-b.kemasan_level);
		} else {
			let index=this.optionAlatKesehatan.findIndex(x=>x.id_alat_kesehatan==this.id_alat_kesehatan)
			this.selectDataAlat = this.optionAlatKesehatan[index]
			this.selectDataAlat.alat_kesehatan_kemasan=this.selectDataAlat.alat_kesehatan_kemasan.sort((a,b) => a.kemasan_level-b.kemasan_level);
		}
		this.vbFormInputModal = true
		this.vbInfoObat = false
	}
	modalClose() {
		this.modalService.close("modalFormContent");
	}

}
