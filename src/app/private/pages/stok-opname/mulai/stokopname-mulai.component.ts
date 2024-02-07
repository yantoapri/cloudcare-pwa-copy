import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup} from "@angular/forms";
import { ModulStokOpnameObatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok-opname-obat.service';
import { ModulStokOpnameAlatService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stokopname-alat.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ModulStokService as StokObat } from "src/app/private/modul-api/modul-gudang-transaksi/modul-stok.service";
import { ModulStokService as StokAlat } from "src/app/private/modul-api/modul-gudang-transaksi/modul-stok-alat.service";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ModulObatService } from 'src/app/private/modul-api/modul-master-node/modul-obat.service';
import { ModulAlatKesehatanService } from 'src/app/private/modul-api/modul-master-node/modul-alat-kesehatan.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as StokOpnameAction from 'src/app/private/states/stok-opname/stok-opname.action'
import { StokOpnameObatPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload';
import {ValidateService} from 'src/app/private/services/validate/validateService'
import * as moment from 'moment';
@Component({
	selector: 'app-stokopname-mulai',
	templateUrl: './stokopname-mulai.component.html',
	styleUrls: ['./stokopname-mulai.component.sass']
})
export class StokopnameMulaiComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptionsBelum: DataTables.Settings = {};
	dtOptionsSudah: DataTables.Settings = {};
	dtOptionsAlatBelum: DataTables.Settings = {};
	dtOptionsAlatSudah: DataTables.Settings = {};
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
	id_stok_opname = null
	dataBelumLength = 0
	dataSudahLength = 0
	obat: any = null
	alat: any = null
	dataBatchAlat:any
	dataBatchObat:any
	no_batch:any
	sub_total=[]
	stokTerkini=0
	showBatch=false
	listBatch=[]
	batch=[]
	stokopname_batch=[]
	params_get = {
		last_data: 0,
		get_data: 10,
		search: "",
		show: "all"
	}
	isLastObat=false
	isLastAlat=false
	constructor(
		private modalService: ModalService,
		private modulStokOpname: ModulStokOpnameObatService,
		private modulStokOpnameAlat: ModulStokOpnameAlatService,
		private modulAlat: ModulAlatKesehatanService,
		private router: Router,
		private spinner : NgxSpinnerService,
		private Modulobat: ModulObatService,
		private fb: FormBuilder,

		private validate:ValidateService,
		private StokObat:StokObat,
		private StokAlat:StokAlat,
		private store: Store<fromApp.PrivateAppState>,
		private activatedRoute: ActivatedRoute,
	) {
		this.getState = this.store.select('stok_opname')
	}
	warningBatch=""
	formInput: FormGroup;
	succes=false
	status=0
	isLoadingObat=false
	isLoadingAlat=false
	ngOnInit(): void {
		this.spinner.show('spinner1')
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.id_stok_opname = params.id
				this.status=params.status
			}
		})
		this.dtOptionsBelum = this.showDataTables("belum")
		this.dtOptionsSudah = this.showDataTablesSudah("sudah")
		this.dtOptionsAlatBelum = this.showDataTablesAlatBelum("belum")
		this.dtOptionsAlatSudah = this.showDataTablesAlatSudah("sudah")
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
		}, 700);

		this.getState.subscribe((state) => {
			if(state.reloadTable&&state.errorMessage==null){
				if(this.obat!=null){
					this.spinner.hide('spinner1')
					this.modalClose("blmDipriksa")
					this.obat=null
				}else
				if(this.alat!=null){
					this.spinner.hide('spinner1')
					this.modalClose("blmDipriksaAlat")
					this.alat==null
				}
			}else{
				this.spinner.hide('spinner1')
			}
		})
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	tampilBatch(item){
		this.showBatch=true
			this.spinner.show('spinner1')
			if(item.id_obat!=undefined){
				this.StokObat.getBatchStockOpname(item)
				.subscribe((resp: any) => {
					this.listBatch = resp.response
					this.listBatch.map((val,index)=>{
						this.batch[index]=val.jumlah

					})
					this.spinner.hide('spinner1')
				},(err:any)=>{
					if(err.response.length>0){
						let msg=""
						err.response.map(val=>{
							msg+=val.field+" "+val.message+"\n"
						})
						Swal.fire('Error',msg,"error")
					}else{
						Swal.fire('Error',err.metaData.message,"error")
					}
				})
			}else{
				this.StokAlat.getBatchStockOpname(item)
				.subscribe((resp: any) => {
					this.listBatch = resp.response
					this.listBatch.map((val,index)=>{
						this.batch[index]=val.jumlah

					})
					this.spinner.hide('spinner1')
				})
			}
		
	}
	convertDate(val){
		return moment(new Date(val)).format('DD-MM-YYYY')
	}
	tabSudah() {
		this.dtOptionsSudah = this.showDataTablesSudah("sudah")
	}
	tabBlmAlat() {
		this.dtOptionsAlatBelum = this.showDataTablesAlatBelum("belum")
	}
	tabSudahAlat() {
		this.dtOptionsAlatSudah = this.showDataTablesAlatSudah("sudah")
	}
	prosesSelectBatchAlat(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.dataBatchAlat=[]
			this.params_get.last_data=0
			this.isLastAlat=false
			}else{
				this.isLastAlat=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.dataBatchAlat=[]
			this.params_get.last_data=0
			this.isLastAlat=false
		}
		if(aksi=="last_page"){
			if(!this.isLastAlat)
			this.params_get.last_data+=10
		}
		if(!this.isLastAlat){
			this.isLoadingAlat=true
			this.StokAlat.getSelectBatchStockOpname(this.alat.id_alat_kesehatan,this.params_get)
			.subscribe((resp: any) => {
				if(resp.response>0){
					if(resp.response.length<10){
						this.listBatch.map((val)=>{
							let i=this.dataBatchAlat.findIndex(x=>x.no_batch==val.no_batch)
							if(!i){
								this.dataBatchAlat.push(val)
							}
						})
						this.isLastAlat=true
					}else{
						this.listBatch.map((val)=>{
							let i=this.dataBatchAlat.findIndex(x=>x.no_batch==val.no_batch)
							if(!i){
								this.dataBatchAlat.push(val)
							}
						})
					}
					
				}else{
					this.isLastAlat=false
				}
				this.isLoadingAlat=false
			})
		}
	}
	prosesSelectBatchObat(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.dataBatchObat=[]
			this.params_get.last_data=0
			this.isLastObat=false
			}else{
				this.isLastObat=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.dataBatchObat=[]
			this.params_get.last_data=0
			this.isLastObat=false
		}
		if(aksi=="last_page"){
			if(!this.isLastObat)
			this.params_get.last_data+=10
		}
		if(!this.isLastObat){
			this.isLoadingObat=true
			this.StokObat.getSelectBatchStockOpname(this.obat.id_obat,this.params_get)
			.subscribe((resp: any) => {
				if(resp.response.length==0){
					this.isLastObat=true
				}else{
					if(resp.response.length<10){
						this.listBatch.map((val)=>{
							let i=this.dataBatchObat.findIndex(x=>x.no_batch==val.no_batch)
							this.dataBatchObat.splice(i,1)
						})
						this.isLastObat=true
					}else{
						this.listBatch.map((val)=>{
							let i=this.dataBatchObat.findIndex(x=>x.no_batch==val.no_batch)
							this.dataBatchObat.splice(i,1)
						})
					}
				}
				this.isLoadingObat=false
			})
		}
	}
	setBatch(item){
		if(item)
		this.listBatch.push({'id_gudang_obat':item.id_gudang_obat,'no_batch':item.no_batch,'stok_awal':item.stok_awal,'jumlah':item.jumlah,'tanggal_ed_unix':item.tanggal_ed_unix,'stok':item.stok_terkini,'search':true})
	}
	setBatchAlat(item){
		if(item)
		this.listBatch.push({'id_gudang_alat_kesehatan':item.id_gudang_alat_kesehatan,'no_batch':item.no_batch,'stok_awal':item.stok_awal,'jumlah':item.jumlah,'tanggal_ed_unix':item.tanggal_ed_unix,'stok':item.stok_terkini,'search':true})
	}
	setBatch2(item){
		if(item)
		this.listBatch.push({'id_gudang_obat':item.id_gudang_obat,'no_batch':item?.no_batch,'stok_awal':item?.stok_awal,'jumlah':item?.jumlah_stok,'tanggal_ed_unix':item?.tanggal_ed_unix,'stok':item.stok_terkini,'search':true})
	}
	setBatchAlat2(item){
		if(item)
		this.listBatch.push({'id_gudang_alat_kesehatan':item.id_gudang_alat_kesehatan,'no_batch':item?.no_batch,'stok_awal':item?.stok_awal,'jumlah':item?.jumlah_stok,'tanggal_ed_unix':item?.tanggal_ed_unix,'stok':item.stok_terkini,'search':true})
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(status) {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpname.listDatatables(dataTablesParameters, status,this.id_stok_opname)
					.subscribe((resp: any) => {
						if (status == "sudah") {
							this.dataSudahLength = resp.response.data.length
						} else {
							this.dataBelumLength = resp.response.data.length
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
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						if(self.status==0)
						return `<button class="btn btn-sm btn-info add"><i class="fas fa-pen"></i> Input</button>`;
						else
						return `<button class="btn btn-sm btn-info add" disabled><i class="fas fa-pen"></i> Input</button>`;
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

	showDataTablesSudah(status) {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpname.listDatatables(dataTablesParameters, status,this.id_stok_opname)
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
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						if(self.status==0)
						return `<button class="btn btn-sm btn-info edit"><i class="fas fa-pen"></i> Edit</button>`;
						else
						return `<button class="btn btn-sm btn-info edit" disabled><i class="fas fa-pen"></i> Edit</button>`;
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .edit', row).on('click', () => {
					self.edit(data);
				});

				return row;
			}
		}
	}

	showDataTablesAlatBelum(status) {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpnameAlat.listDatatables(dataTablesParameters, status,this.id_stok_opname)
					.subscribe((resp: any) => {
						if (status == "sudah") {
							this.dataSudahLength = resp.response.data.length
						} else {
							this.dataBelumLength = resp.response.data.length
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
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						if(self.status==0)
						return `<button class="btn btn-sm btn-info addAlat"><i class="fas fa-pen"></i> Input</button>`;
						else
						return `<button class="btn btn-sm btn-info addAlat" disabled><i class="fas fa-pen"></i> Input</button>`;
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

	showDataTablesAlatSudah(status) {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.modulStokOpnameAlat.listDatatables(dataTablesParameters, status,this.id_stok_opname)
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
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						if(self.status==0)
						return `<button class="btn btn-sm btn-info editAlat"><i class="fas fa-pen"></i> Edit</button>`;
						else
						return `<button class="btn btn-sm btn-info editAlat" disabled><i class="fas fa-pen"></i> Edit</button>`
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .editAlat', row).on('click', () => {
					self.editAlat(data);
				});

				return row;
			}
		}
	}
	add(item) {
		this.submitted=false
		this.showBatch=false
		this.spinner.show('spinner1')
		this.reset()
		this.Modulobat.show(item.id_obat)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, "error")
				} else {
					this.title = resp.response.nama_obat
					this.obat = resp.response
					this.alat=null
					this.no_batch=null
					this.isAdd = true
					this.isEdit = false
					this.total = 0
					this.qty=[]
					this.sub_total=[]
					this.obat.obat_kemasan.map((val)=>{
						this.qty.push("0")
						this.sub_total.push(0)
					})
					this.open("blmDipriksa")
				}
				this.spinner.hide('spinner1')
			})
		// 
	}
	remove(i){
		this.listBatch.splice(i,1)
		this.batch.splice(i,1)
	}
	addAlat(item) {
		this.showBatch=false
		this.submitted=false
		this.spinner.show('spinner1')
		this.reset()
		this.modulAlat.show(item.id_alat_kesehatan)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, "error")
				} else {
					this.title = resp.response.nama_alat_kesehatan
					this.alat = resp.response
					this.obat=null
					this.no_batch=null
					this.isAdd = true
					this.isEdit = false
					this.total = 0
					this.qty=[]
					this.sub_total=[]
					this.alat.alat_kesehatan_kemasan.map((val)=>{
						this.qty.push("0")
						this.sub_total.push(0)
					})
					this.open("blmDipriksaAlat")
				}
				this.spinner.hide('spinner1')
			})
		// 
	}

	reset(){
		this.obat=null
		this.alat =null
		this.no_batch=null
		this.isAdd = false
		this.isEdit = false
		this.total = 0
		this.qty=[]
		this.showBatch=false
		this.dataBatchAlat=[]
		this.dataBatchObat=[]
		this.listBatch=[]
		this.batch=[]
	}

	save(id) {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300);
		let cekQty=true
		this.qty.map((val)=>{
			if(val==''){
				cekQty=false
			}
		})
		if(cekQty){
			let data = []
			let cekStok=false
			this.spinner.show('spinner1')
			this.obat.obat_kemasan.map((val, index) => {
				if (parseInt(this.qty[index])>=0) {
					data.push({
						'id_obat_kemasan': val.id_obat_kemasan,
						'jumlah_stok': this.qty[index]
					})
				}else{
					cekStok=true
				}

			})
			this.warningBatch=""
			let data_batch=[]
			let qtyBatch=0
			this.listBatch.map((val,index)=>{
				if((new Date().getTime()> new Date(val.tanggal_ed_unix).getTime())&&parseInt(this.batch[index])>0){
					this.warningBatch="Stok Expired harus berisi 0"
					setTimeout(() => {
						this.warningBatch=""
					}, 2000);
					cekStok=true
				}else
				if(parseInt(this.batch[index])<0){
					cekStok=true
				}else
				{
					data_batch.push({
						"id_gudang_obat": val.id_gudang_obat,
						"jumlah_stok": parseInt(this.batch[index])
					})
				}
				
			})
			if (data.length < 0||cekStok) {
				this.spinner.hide('spinner1')
				return false
			} else {
				let param = { 'id_obat': id, 'satuan': data,'batch':data_batch }
				this.store.dispatch(
					StokOpnameAction.addInitial({ payload: param, id: this.id_stok_opname })
				)
				
				
			}
		}
	}
	saveAlat(id) {

		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300);
		let cekQty=true
		this.qty.map((val)=>{
			if(val==""){
				cekQty=false
			}
		})
		if(cekQty){
			this.spinner.show('spinner1')
			let cek = false
			let data = []
			this.alat.alat_kesehatan_kemasan.map((val, index) => {
				if (parseInt(this.qty[index])>=0) {
					data.push({
						'id_alat_kesehatan_kemasan': val.id_alat_kesehatan_kemasan,
						'jumlah_stok':parseInt( this.qty[index])
					})
				}else{
					console.log('err qty')
					cek=true
				}

			})
			let data_batch=[]
			this.warningBatch=""
			let qtyBatch=0
			this.listBatch.map((val,index)=>{
				if((new Date().getTime()> new Date(val.tanggal_ed_unix).getTime())&&parseInt(this.batch[index])>0){
					this.warningBatch="Stok Expired harus berisi 0"
					setTimeout(() => {
						this.warningBatch=""
					}, 2000);
					cek=true
				}else
				if(parseInt(this.batch[index])<0){
					cek=true
				}else
				{
					data_batch.push({
						"id_gudang_alat_kesehatan": val.id_gudang_alat_kesehatan,
						"jumlah_stok": this.batch[index]
					})
				}
			})
			if (data.length < 0 || cek) {
				this.spinner.hide('spinner1')
				return false
			} else {
				let param = { 'id_alat_kesehatan': id, 'satuan': data,'batch':data_batch }
				this.store.dispatch(
					StokOpnameAction.addInitialAlat({ payload: param, id: this.id_stok_opname })
				)
				
			}
		}
	}
	update(id) {

		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300);
		
		let cek = false
		let data = []
		let qtyBatch=0
		this.obat.stok_opname_obat_detail.map((val, index) => {
			if (parseInt(this.qty[index])>=0) {
				data.push({
					'id_stok_opname_obat_detail': val.id_stok_opname_obat_detail,
					'id_obat_kemasan': val.id_obat_kemasan,
					'jumlah_stok': parseInt(this.qty[index])
				})
			}else{
				console.log('error stok')
				cek=true
			}

		})
		let data_batch=[]
		this.listBatch.map((val,index)=>{
			if((new Date().getTime()> new Date(val.tanggal_ed_unix).getTime())&&parseInt(this.batch[index])>0){
				this.warningBatch="Stok Expired harus berisi 0"
				setTimeout(() => {
					this.warningBatch=""
				}, 2000);
				cek=true
			}else
			if(parseInt(this.batch[index])<0){
				cek=true
			}else
			if(parseInt(this.batch[index])>=0){
				data_batch.push({
					"id_stok_opname_obat_batch":this.stokopname_batch[index]?this.stokopname_batch[index]:'',
					"id_gudang_obat": val.id_gudang_obat,
					"jumlah_stok": parseInt(this.batch[index])
				})
			}else{
				console.log('error batch')
				cek=true
			}
			
		})
		if (data.length > 0 && !cek) {
			this.spinner.show('spinner1')
			let param = { 'id_obat': this.obat.id_obat, 'satuan': data,'batch':data_batch  }
			this.store.dispatch(
				StokOpnameAction.updateInitial({ payload: param, id: this.obat.id_stok_opname_obat })
			)
			
		}
	}
	parseNum(val){
		return parseInt(val)>=0?parseInt(val):-1
	}
	updateAlat(id) {

		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300);
		
		let cek = false
		let data = []
		let qtyBatch=0
		this.alat.stok_opname_alat_kesehatan_detail.map((val, index) => {
			if (parseInt(this.qty[index])>=0) {
				data.push({
					'id_stok_opname_alat_kesehatan_detail': val.id_stok_opname_alat_kesehatan_detail,
					'id_alat_kesehatan_kemasan': val.id_alat_kesehatan_kemasan,
					'jumlah_stok': parseInt(this.qty[index])
				})
			}else{
				cek=true
			}

		})
		let data_batch=[]
		this.listBatch.map((val,index)=>{
			if((new Date().getTime()> new Date(val.tanggal_ed_unix).getTime())&&parseInt(this.batch[index])>0){
				this.warningBatch="Stok Expired harus berisi 0"
				setTimeout(() => {
					this.warningBatch=""
				}, 2000);
				cek=true
			}else
			if(parseInt(this.batch[index])<0){
				cek=true
			}else
			if (parseInt(this.batch[index])>=0) {
				
				data_batch.push({
					"id_stok_opname_alat_kesehatan_batch":this.stokopname_batch[index]?this.stokopname_batch[index]:'',
					"id_gudang_alat_kesehatan": val.id_gudang_alat_kesehatan,
					"jumlah_stok": parseInt(this.batch[index])
				})
			}else{
				cek=true
			}
		})
		if (data.length > 0 && !cek){
			this.spinner.show('spinner1')
			let param = { 'id_alat_kesehatan': this.alat.id_alat_kesehatan, 'satuan': data,'batch':data_batch }
			this.store.dispatch(
				StokOpnameAction.updateInitialAlat({ payload: param, id: this.alat.id_stok_opname_alat_kesehatan })
			)
		
		}
	}
	edit(item) {
		
		this.showBatch=false
		this.submitted=false
		this.spinner.show('spinner1')
		this.reset()
		this.modulStokOpname.show(item.id_stok_opname_obat)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, "error")
				} else {
					this.title = resp.response.nama_obat
					this.obat = resp.response
					this.stokopname_batch=[]
					this.listBatch=[]
					this.sub_total=[]
					this.obat.stok_opname_obat_detail.map((val, index) => {
						this.qty[index] = val.jumlah_stok
						this.sub_total.push(val.jumlah_stok*val.satuan_qty)
						this.total +=this.sub_total[index]
						
					})
					this.obat.stok_opname_obat_batch.map((val,index)=>{
						this.stokopname_batch.push(val.id_stok_opname_obat_batch)
						this.setBatch2(val)
						this.batch[index]=val.batch_qty
					})
					this.stokopname_batch.push()
					this.isEdit = true
					this.isAdd = false
					this.showBatch=true
					// this.setTotalObat(2)
					this.open("blmDipriksa")
				}
				this.spinner.hide('spinner1')
			})

	}
	json(val){
		return JSON.stringify(val)
	}
	checkExpired(tgl){
		return new Date().getTime()>new Date(tgl).getTime()
	}
	editAlat(item) {
		this.showBatch=false
		this.submitted=false
		this.spinner.show('spinner1')
		this.reset()
		this.modulStokOpnameAlat.show(item.id_stok_opname_alat_kesehatan)
			.subscribe((resp: any) => {
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, "error")
				} else {
					this.title = resp.response.nama_alat_kesehatan
					this.alat = resp.response
					this.sub_total=[]
					this.alat.stok_opname_alat_kesehatan_detail.map((val, index) => {
						this.qty[index] = val.jumlah_stok
						this.sub_total.push(val.jumlah_stok*val.satuan_qty)
						this.total += this.sub_total[index]
					})
					this.stokopname_batch=[]
					this.listBatch=[]
					this.alat.stok_opname_alat_kesehatan_batch.map((val,index)=>{
						this.stokopname_batch.push(val.id_stok_opname_alat_kesehatan_batch)
						this.setBatchAlat2(val)
						this.batch[index]=val.batch_qty
					})
					this.showBatch=true
					this.isEdit = true
					this.isAdd = false
					this.open("blmDipriksaAlat")
				}
				this.spinner.hide('spinner1')
			})

	}
	finish() {
		Swal.fire({
			title: 'Apa anda yakin?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, lanjutkan!',
			cancelButtonText: 'Batal',
		}).then(res=>{
			if(res.isConfirmed){
				this.spinner.show('spinner1')
				this.modulStokOpname.finish(this.id_stok_opname)
					.subscribe((resp: any) => {
						this.spinner.hide('spinner1')
						if (resp.metaData.response_code != "0000") {
							Swal.fire("Error", resp.metaData.message,'error')
						} else {
							Swal.fire({
								title: 'Data berhasil disimpan',
								icon: 'success',
								showCancelButton: false,
								allowOutsideClick: false,
								confirmButtonText: 'OK',
							}).then((result) => {
								this.router.navigate(['stok-opname/riwayat'])
							})
						}
					},err=>{
						if(err.metaData!=undefined){
							if(typeof err.response=='string'){
								Swal.fire("Error", err.response,'error')
							}else
							Swal.fire("Error", err.metaData.message,'error')
						}else
						if(err.response!=undefined){
							Swal.fire("Error", err.response,'error')
						}
						
					})
			}
		})
	}
	setTotalObat(x) {
		this.total = 0
		this.sub_total=[]
		this.showBatch=true
		let qtyObat=x==1?this.obat.obat_kemasan:this.obat.stok_opname_obat_detail
		qtyObat.map((val,i) => {
			
			let value = this.qty[i] != undefined && this.qty[i] !='' ? parseInt(this.qty[i]) : 0
			this.sub_total[i]=x==2?value*parseInt(val.satuan_qty):value*parseInt(val.total_qty)
			this.total += this.sub_total[i]
		})
	}
	setTotalAlat(x) {
		this.total = 0
		this.showBatch=true
		let qtyAlat=x==1?this.alat.alat_kesehatan_kemasan:this.alat.stok_opname_alat_kesehatan_detail;
		qtyAlat.map((val,i) => {
			let value = this.qty[i] != undefined && this.qty[i] !='' ? parseInt(this.qty[i]) : 0
			this.sub_total[i]=x==2?value*parseInt(val.satuan_qty):value*parseInt(val.total_qty)
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
