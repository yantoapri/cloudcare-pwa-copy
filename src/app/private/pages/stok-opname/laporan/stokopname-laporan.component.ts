import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ModulStokOpnameObatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok-opname-obat.service';
import { ModulStokOpnameAlatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stokopname-alat.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as StokOpnameAction from 'src/app/private/states/stok-opname/stok-opname.action'
import { StokOpnameObatPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload';
import * as moment from 'moment';
import {ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
	selector: 'app-stokopname-laporan',
	templateUrl: './stokopname-laporan.component.html',
	styleUrls: ['./stokopname-laporan.component.sass']
})
export class StokOpnameLaporanComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptionsBelum: DataTables.Settings = {};
	dtOptionsSudah: DataTables.Settings = {};
	dtOptionsAlatBelum: DataTables.Settings = {};
	dtOptionsAlatSudah: DataTables.Settings = {};
	dtOptionsRiwayat: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	getStateAlat: Observable<any>;
	dataAlat: StokOpnameObatPayload = new StokOpnameObatPayload
	active = 1
	title = ""
	isAdd = false
	isEdit = false
	kemasan = []
	qty: string[] = []
	total = 0
	submitted = false
	id_riwayat_stok_opname = null
	dataBelumLength = 0
	dataSudahLength = 0
	obat: any = {}
	alat: any = {}
	totalItem = 0
	progress = 0
	success = 0
	failed = 0
	prosesFinish = 0
	allItem = []
	detail = []
	dataSesuaikan = []
	aktual_barang=0
	listBarang:any
	mulai=false
	warningBatch=""
	constructor(
		private modalService: ModalService,
		private modulStokOpname: ModulStokOpnameObatService,
		private router: Router,
		private modulStokOpnameAlat: ModulStokOpnameAlatService,
		private fb: FormBuilder,
		private validate:ValidateService,
		private spinner : NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('stok_opname')
	}
	formInput: FormGroup;
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	sub_total=[]
	stokopname:any
	total_stok=0
	satuan_terkecil=null
	listBatch=[]
	dataObatBelumDitinjau=0
	dataAlatBelumDitinjau=0
	dataMulai:any
	ngOnInit(): void {
		this.spinner.show('spinner1')
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='IVSOTS1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		

		this.dtOptionsBelum = this.showDataTables("belum")
		this.dtOptionsSudah = this.showDataTablesSudah("sudah")
		this.dtOptionsAlatBelum = this.showDataTablesAlatBelum("belum")
		this.dtOptionsAlatSudah = this.showDataTablesAlatSudah("sudah")
		// this.dtOptionsRiwayat = this.showDataTablesRiwayat()
		this.getState.subscribe((state) => {
			this.reloadTable = state.reloadTable
			if (this.reloadTable === true) {
				this.reLoadData()
			}
		})
		this.formInput = this.fb.group({
			id_obat: [],
			satuan: []
		})
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 600);
	}
	mulaiTinjau(){
		Swal.fire({
			title: 'Apa anda yakin?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, lanjutkan!',
			cancelButtonText: 'Batal',
		}).then(res=>{
			if(res.isConfirmed){
				
				this.modulStokOpname.startTinjau().subscribe((resp: any) => {
					if (resp) {
						this.id_riwayat_stok_opname = resp.response.id_riwayat_stok_opname
						if(this.id_riwayat_stok_opname==undefined||this.id_riwayat_stok_opname===null||this.id_riwayat_stok_opname==""){
							let user=""
							if(resp.response.length>0){
								resp.response.map((val,i)=>{
									user+=(i+1)+'.'+val.nama_lengkap+'\n'
								})
							}
							Swal.fire({
								icon:'info',
								title:'Info',
								html:resp.metaData.message+':<br><br> <p class="text-left">'+user+'<p>'
							}).then(res=>{
								this.router.navigate(['stok-opname/view'])
							})
						}else{
							this.dataMulai=resp.response
							this.mulai=true
						}
						
					}
		
				}, (err: any) => {
					
					if(err.response==null){
						Swal.fire("Info",err.metaData.message,"info").then(res=>{
							this.router.navigate(['stok-opname/view'])
						})
					}else{
						
							if(err.response.id_riwayat_stok_opname!=undefined){
								if(err.response.id_riwayat_stok_opname==""){
									Swal.fire("Info",err.metaData.message,"info").then(res=>{
										this.router.navigate(['stok-opname/view'])
									})
								}else{
									this.dataMulai=err.response
									this.mulai=true
									this.id_riwayat_stok_opname = err.response.id_riwayat_stok_opname
									
								}
							}else{
								let user=""
								if(err.response.length>0){
									err.response.map((val,i)=>{
										user+=(i+1)+'. '+val.nama_lengkap+'<br>'
									})
								}
								Swal.fire({
									icon:'info',
									title:'Info',
									html:err.metaData.message+':<br><br> <p class="text-left">'+user+'<p>'
								}).then(res=>{
									this.router.navigate(['stok-opname/view'])
								})
							}
						
						
					}
					
				})
			}
		})
		
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	getDate(tgl) {
		return  moment(new Date(tgl)).format('DD-MM-YYYY')
	}
	convertDate(time){
		return moment(new Date(time)).format('DD-MM-YYYY H:m:s')
	}
	tabSudah() {
		this.dtOptionsSudah = this.showDataTablesSudah("sudah")
	}
	tabAlatBelum() {
		this.dtOptionsAlatBelum = this.showDataTablesAlatBelum("belum")
	}
	tabAlatSudah() {
		this.dtOptionsAlatSudah = this.showDataTablesAlatSudah("sudah")
	}



	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(status) {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpname.listTinjau(dataTablesParameters, status)
					.subscribe((resp: any) => {
						if (status == "sudah") {
							this.dataSudahLength = resp.response.data.length
						} else {
							this.dataObatBelumDitinjau=resp.response.data.length
						}
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
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
				},
				{
					data: 'nama_obat'
				},
				{ data: 'stok_opname' },
				{ data: 'stok_gudang' },
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return `<button class="btn btn-link circle-primary text-ui-primary add" title="Input"><i class="fas fa-pen"></i></button>`;
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .add', row).on('click', () => {
					self.add(data);
				});

				return row;
			}
		}
	}

	showDataTablesAlatBelum(status) {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpnameAlat.listTinjau(dataTablesParameters, status)
					.subscribe((resp: any) => {
						if (status == "sudah") {
							this.dataSudahLength = resp.response.data.length
						} else {
							this.dataAlatBelumDitinjau=resp.response.data.length
						}
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
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
				},
				{
					data: 'nama_alat_kesehatan'
				},
				{ data: 'stok_opname' },
				{ data: 'stok_gudang' },
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return `<button class="btn btn-link circle-primary text-ui-primary addAlat" title="Input"><i class="fas fa-pen"></i></button>`;
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .addAlat', row).on('click', () => {
					self.addAlat(data);
				});

				return row;
			}
		}
	}

	showDataTablesSudah(status) {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpname.listTinjau(dataTablesParameters, status)
					.subscribe((resp: any) => {
						this.dataSudahLength = resp.response.data.length
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
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
				},
				{
					data: 'nama_obat'
				},
				{ data: 'stok_selisih_pemeriksaan' },
				{ data: 'stok_gudang' }
			]
		}
	}
	showDataTablesAlatSudah(status) {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpnameAlat.listTinjau(dataTablesParameters, status)
					.subscribe((resp: any) => {
						this.dataSudahLength = resp.response.data.length
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
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
				},
				{
					data: 'nama_alat_kesehatan'
				},
				{ data: 'stok_selisih_pemeriksaan' },
				{ data: 'stok_gudang' }
			]
		}
	}
	add(item) {
		this.title = item.nama_obat
		this.spinner.show('spinner1')
		this.modulStokOpname.showTinjau(item.id_obat)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, "error")
				} else {
					this.aktual_barang=0
					this.listBarang=[]
					this.listBatch=[]
					this.stokopname=resp.response
					this.total_stok=0
					this.stokopname.stok_opname.map(val=>{
						val.stok_opname_obats.map(value=>{
							value.stok_opname_obat_batch.map(v=>{
								let index=this.listBatch.findIndex(x=>x.no_batch==v.no_batch)
								if(index<0)
								this.listBatch.push(v)
								else
								this.listBatch[index].batch_qty+=v.batch_qty
							})
							this.aktual_barang+=value.total_stok_opname
							value.stok_opname_obat_detail=value.stok_opname_obat_detail.sort((a,b)=>a.satuan_level-b.satuan_level)
							this.satuan_terkecil=value.stok_opname_obat_detail[0].satuan.substring(0,3)
							this.satuan_terkecil=this.satuan_terkecil.toLowerCase();
							value.stok_opname_obat_detail.map((x,i)=>{
								let index=this.listBarang.findIndex(a=>a.satuan==x.satuan)
								if(index>=0){
									this.listBarang[index].jumlah_stok+=x.jumlah_stok
								}else{
									this.listBarang.push(x)
								}
							})
						})
						
					})
					this.obat = resp.response.stok_opname
					this.alat=null
					this.isAdd = true
					this.isEdit = false
					this.total = 0
					this.qty=[]
					this.total_stok=this.aktual_barang+parseInt(this.stokopname.transaksi_masuk)-parseInt(this.stokopname.transaksi_keluar)
					this.listBarang.map((val)=>{
						this.qty.push(val.jumlah_stok)
					})
					this.setTotal()
					this.open("blmDipriksa")
				}
				this.spinner.hide('spinner1')
			})
		// 
	}
	getNumber(val){
		return parseInt(val).toString()
	}
	addAlat(item) {
		this.title = item.nama_alat_kesehatan
		this.spinner.show('spinner1')
		this.modulStokOpnameAlat.showTinjau(item.id_alat_kesehatan)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, "error")
				} else {
					this.aktual_barang=0
					this.listBarang=[]
					this.listBatch=[]
					this.total_stok=0
					this.stokopname=resp.response
					if(this.stokopname.stok_opname.length>0){
						this.stokopname.stok_opname.map(val=>{
							val.stok_opname_alat_kesehatan.map(value=>{
								value.stok_opname_alat_kesehatan_batch.map(v=>{
									let index=this.listBatch.findIndex(x=>x.no_batch==v.no_batch)
									if(index<0)
									this.listBatch.push(v)
									else
									this.listBatch[index].batch_qty+=v.batch_qty
								})
								
								this.aktual_barang+=value.total_stok_opname
								value.stok_opname_alat_kesehatan_detail=value.stok_opname_alat_kesehatan_detail.sort((a,b)=>a.satuan_level-b.satuan_level)
								this.satuan_terkecil=value.stok_opname_alat_kesehatan_detail[0].satuan.substring(0,3)
								this.satuan_terkecil=this.satuan_terkecil.toLowerCase();
								value.stok_opname_alat_kesehatan_detail.map((x,i)=>{
									let index=this.listBarang.findIndex(a=>a.satuan==x.satuan)
									if(index>=0){
										this.listBarang[index].jumlah_stok+=x.jumlah_stok
									}else{
										this.listBarang.push(x)
									}
								})
							})
							
						})
					}
					
					this.alat = resp.response.stok_opname
					this.obat=null
					this.isAdd = true
					this.isEdit = false
					this.total = 0
					this.qty=[]
					
					this.total_stok=this.aktual_barang+parseInt(this.stokopname.transaksi_masuk)-parseInt(this.stokopname.transaksi_keluar)
					this.listBarang.map((val)=>{
						this.qty.push(val.jumlah_stok)
					})
					this.setTotal()
					this.open("blmDipriksaAlat")
				}
				this.spinner.hide('spinner1')
			})
		// 
	}

	checkExpired(tgl){
		return new Date().getTime()>new Date(tgl).getTime()
	}
	save(id) {

		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300);
		this.spinner.show('spinner1')
		let cek = true
		let data = []
		let batch=[]
		this.listBatch.map((val,i)=>{
			if((new Date().getTime()> new Date(val.tanggal_ed_unix).getTime())&&parseInt(val.batch_qty)>0){
				this.warningBatch="Stok Expired harus berisi 0"
					setTimeout(() => {
						this.warningBatch=""
					}, 2000);
				cek=false
			}else
			if (parseInt(val.batch_qty)>=0) {
				batch.push({
					"id_gudang_obat": val.id_gudang_obat,
					"batch_qty": parseInt(val.batch_qty)
				})
			}else{
				cek=false
			}
		})
		this.listBarang.map((val,index)=>{
			if (parseInt(this.qty[index]) >=0) {
				data.push({
					'id_obat_kemasan': val.id_obat_kemasan,
					'jumlah_stok': val.jumlah_stok,
					'jumlah_stok_audit': parseInt(this.qty[index])
				})
			}else{
				cek=false
			}
		})
		
		//sampai sini
		if (!cek) {
			this.spinner.hide('spinner1')
			return false
		} else {
			let param ={
				'id_obat': this.obat[0]?this.obat[0].stok_opname_obats[0].id_obat:'',
				'audit': [
					{
						'id_stok_opname':this.obat[0]? this.obat[0].id_stok_opname:'',
						'id_akun_staf': this.obat[0]?this.obat[0].id_akun_staf:'',
						'satuan': data,
						"batch": batch
					}
				]
			}
			
			this.store.dispatch(
				StokOpnameAction.addTinjauInitial({ payload: param, id: this.id_riwayat_stok_opname })
			)
			setTimeout(() => {
				this.spinner.hide('spinner1')
			}, 400);
			this.modalClose("blmDipriksa")
		}
	}
	saveAlat(id) {

		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300);
		this.spinner.show('spinner1')
		let cek = true
		let data = []
		let batch=[]
		this.listBatch.map((val,i)=>{
			if((new Date().getTime()> new Date(val.tanggal_ed_unix).getTime())&&parseInt(val.batch_qty)>0){
				this.warningBatch="Stok Expired harus berisi 0"
					setTimeout(() => {
						this.warningBatch=""
					}, 2000);
				cek=false
			}else
			if (parseInt(val.batch_qty)>=0) {
				batch.push({
					"id_gudang_alat_kesehatan": val.id_gudang_alat_kesehatan,
					"batch_qty": parseInt(val.batch_qty)
				})
			}else{
				cek=false
			}
		})
		this.listBarang.map((val,index)=>{
			if (parseInt(this.qty[index])>=0) {
				data.push({
					'id_alat_kesehatan_kemasan': val.id_alat_kesehatan_kemasan,
					'jumlah_stok': val.jumlah_stok,
					'jumlah_stok_audit': parseInt(this.qty[index])
				})
			}else{
				cek=false
			}
		})
		
		//sampai sini
		if (!cek) {
			this.spinner.hide('spinner1')
			return false
		} else {
			let param ={
				'id_alat_kesehatan': this.alat[0]?this.alat[0].stok_opname_alat_kesehatan[0].id_alat_kesehatan:'',
				'audit': [
					{
						'id_stok_opname': this.alat[0]?this.alat[0].id_stok_opname:'',
						'id_akun_staf': this.alat[0]?this.alat[0].id_akun_staf:'',
						'satuan': data,
						"batch": batch
					}
				]
			}
			
			this.store.dispatch(
				StokOpnameAction.addTinjauInitialAlat({ payload: param, id: this.id_riwayat_stok_opname })
			)
			setTimeout(() => {
				this.spinner.hide('spinner1')
			}, 400);
			this.modalClose("blmDipriksaAlat")
		}
	}

	async sesuaikan() {
		if(this.id_riwayat_stok_opname!=undefined&&this.id_riwayat_stok_opname!=null){
			if(this.dataObatBelumDitinjau==0&&this.dataAlatBelumDitinjau==0)
			{
				await this.modulStokOpname.getAll(this.id_riwayat_stok_opname)
					.subscribe(async (resp: any) => {
						if(resp.metaData.response_code=="0000"){
							this.modalService.open("loading")
							if (resp.response.riwayat_obat.length > 0){
								let data = []
								await resp.response.riwayat_obat.map(async (val, index) => {
									
									data.push({ "id_riwayat_stok_opname_obat": val.id_riwayat_stok_opname_obat })
									
								})
								this.dataSesuaikan['obat'] = data
							}
							if (resp.response.riwayat_alat_kesehatan.length > 0){
								let data = []
								await resp.response.riwayat_alat_kesehatan.map(async (val, index) => {
									
									data.push({ "id_riwayat_stok_opname_alat_kesehatan": val.id_riwayat_stok_opname_alat_kesehatan })
									
								})
								this.dataSesuaikan['alat'] = data
							}
							
						}
					})
					
				setTimeout(async () => {
					if (this.dataSesuaikan['obat']!=undefined|| this.dataSesuaikan['alat']!=undefined) {
						if(this.dataSesuaikan['obat'])
						await this.sesuaikanObat(this.dataSesuaikan)
						if(this.dataSesuaikan['alat'])
						await this.sesuaikanAlat(this.dataSesuaikan)
						setTimeout(() => {
							this.modalService.close("loading")
							if(this.success>0)
							this.router.navigate(['stok-opname/riwayat'])
						},3000)
					} else {
						this.modalService.close("loading")
						Swal.fire("Warning", "Belum ada data obat dan alat kesehatan yang anda inputkan", "warning")
					}
				}, 1000);
			}else{
				Swal.fire("Error","Stock Opname Obat atau Alat Kesehatan belum diselesaikan","error")
			}
			
		}else
		Swal.fire("Error","Stock opname belum diselesaikan","error")
	}
	async sesuaikanObat(dataSesuaikan){
		for (let i = 0; i < this.dataSesuaikan['obat'].length; i++) {
			await this.modulStokOpname.sesuaikan(dataSesuaikan['obat'][i], this.id_riwayat_stok_opname)
				.subscribe(async (resp: any) => {
					if (resp.metaData.response_code	== "0000") {
						this.success++
					} else {
						this.failed++
					}
					this.progress =(100/dataSesuaikan['obat'].length)*(i+1)
					this.prosesFinish++
				})
		}
	}
	async sesuaikanAlat(dataSesuaikan){
		for (let i = 0; i <dataSesuaikan['alat'].length; i++) {

			await this.modulStokOpnameAlat.sesuaikan(dataSesuaikan['alat'][i], this.id_riwayat_stok_opname)
				.subscribe(async (resp: any) => {
					if (resp.metaData.response_code == "0000") {
						this.success++
					} else {
						this.failed++
					}
					this.progress =(100/dataSesuaikan['alat'].length)*(i+1)
					this.prosesFinish++
				})

		}
	}
	finish() {
		if(this.id_riwayat_stok_opname!=undefined&&this.id_riwayat_stok_opname!=null){
			this.spinner.show('spinner1')
			this.modulStokOpname.finish(this.id_riwayat_stok_opname)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message)
				} else {
					Swal.fire({
						title: 'Data berhasil disimpan',
						icon: 'success',
						showCancelButton: true,
						allowOutsideClick: false,
						confirmButtonText: 'Tinjau hasil',
						cancelButtonText: 'Priksa kembali'
					}).then((result) => {
						if (result.value) {
							this.modulStokOpname.startTinjau()
								.subscribe((resp: any) => {
									this.router.navigate(['stok-opname/laporan/' + resp.response.id_riwayat_stok_opname])
								}, (err: any) => {
									if (err.response) {
										this.router.navigate(['stok-opname/laporan/' + err.response.id_riwayat_stok_opname])
									}
								})
						}
						setTimeout(() => {
							this.spinner.hide('spinner1')
						}, 400);
					})
				}
			})
		}else{
			Swal.fire("Error","Stock opname belum diselesaikan","error")
		}
	}

	setTotal() {
		this.total = 0
		this.sub_total=[]
		this.listBarang.map((val,i)=>{
			let value = this.qty[i] != undefined && this.qty[i] !='' ? parseInt(this.qty[i]) : 0
			this.sub_total[i]=value*parseInt(val.satuan_qty)
			this.total += this.sub_total[i]
		})
		
	}

	open(content) {
		this.modalService.open(content)
	}
	modalClose(content) {
		this.modalService.close(content)
	}

	go(path) {
		this.router.navigate([path])
	}
	
}
