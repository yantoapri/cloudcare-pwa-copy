import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ModulReturPbfService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-pbf';
import { ModulReturPenggantianService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-penggantian';
import * as fromApp from 'src/app/private/states/private-app.states'
import { ReturGudang } from 'src/app/private/models/class-payload-api/gudang-transaksi/retur-gudang-payload';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
import { ModulFakturPembelianService} from 'src/app/private/modul-api/modul-gudang-transaksi/modul-faktur-pembelian.service';
import * as moment from 'moment';
@Component({
	selector: 'app-finish',
	templateUrl: './finish.component.html',
	styleUrls: ['./finish.component.sass']
})
export class FinishComponent implements OnInit {


	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataBarang: ReturGudang = new ReturGudang
	constructor(
		private modalService: ModalService,
		private ModulReturPbfService: ModulReturPbfService,
		private MoneyService:MoneyService,
		private router:Router,
		private ModulFakturPembelianService:ModulFakturPembelianService,
		private ModulReturPenggantianService:ModulReturPenggantianService,
		private spinner : NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('retur_gudang')
	}
	submitted = false
	total_obat = 0
	total_alat = 0
	detailRetur: any = []
	tglTrima: any = ""
	tglFaktur=""
	batchObat=[]
	batchAlat=[]
	edObat=[]
	edAlat=[]
	noFaktur=""
	params_get = {
		last_data: 0,
		get_data: 10,
		search: ""
	}
	formInput: any
	listRetur=[]
	id_retur = null
	info=null
	isLastRetur=false
	isLoadingRetur=false
	ngOnInit(): void {
		
	}
	convertDate(val){
		return moment(new Date(val)).format("DD-MM-YYYY")
	}
	prosesSelect(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.listRetur=[]
			this.params_get.last_data=0
			this.isLastRetur=false
			}else{
				this.isLastRetur=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search=""
			this.listRetur=[]
			this.params_get.last_data=0
			this.isLastRetur=false
		}
		if(aksi=="last_page"){
			if(!this.isLastRetur)
			this.params_get.last_data+=10
		}
		if(!this.isLastRetur){
			this.isLoadingRetur=true
			this.ModulReturPbfService.selectOption(this.params_get)
			.subscribe((resp: any) => {
				if(resp){
					if(resp.response.length==0){
						this.isLastRetur=true
					}else{
						if(resp.response.length<10){
							resp.response.map(val=>{
								let index=this.listRetur.findIndex(x=>x.kode_invoice_full==val.kode_invoice_full)
								if(index==-1)
								this.listRetur.push(val)
							})
							this.isLastRetur=true
						}else{
							resp.response.map(val=>{
								let index=this.listRetur.findIndex(x=>x.kode_invoice_full==val.kode_invoice_full)
								if(index==-1)
								this.listRetur.push(val)
							})
						}
					}
					this.isLoadingRetur=false
				}
			})
		}
	}
	getById(id){

		this.spinner.show('spinner1')
		this.ModulReturPbfService.show(id)
		.subscribe((resp: any) => {
			this.batchObat=[]
			this.edObat=[]
			if(resp.response){
				this.detailRetur=resp.response
				this.detailRetur.gudang_retur_obat.map((val,i)=>{
					this.batchObat.push('')
					this.edObat.push('')
				})
				this.detailRetur.gudang_retur_alat_kesehatan.map((val,i)=>{
					this.batchAlat.push('')
					this.edAlat.push('')
				})
				this.spinner.hide('spinner1')
			}
			
		})
	}
	getPembelianById(id){
		this.spinner.show('spinner1')
		this.ModulFakturPembelianService.show(id)
		.subscribe((resp: any) => {
			this.info=resp.response
			this.modalService.open("modalRetur");
			this.spinner.hide('spinner1')
			
		})
	}
	close(){
		this.modalService.close("modalRetur");
	}
	setRetur(item){
		if(item!=undefined){
			this.getById(item.id_gudang_retur)
		}else{
			this.detailRetur=[]
		}
	}
	
	
	ngOnDestroy(): void {
		document.body.classList.remove('jw-modal-open');
	}

	Money(val){
		return this.MoneyService.formatRupiah(val)
	}
	onFocus(id){
		document.getElementById(id).click()
	}
	
	selesai() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200);
		
		let err=false
		if(this.tglFaktur==""||this.tglTrima==""||this.noFaktur==""){
			err=true
		}
		let data = {
			"id_gudang_retur": this.detailRetur.id_gudang_retur,
			"nomor_faktur": this.noFaktur,
			"tgl_faktur": new Date(this.tglFaktur).getTime(),
			"tgl_diterima": new Date(this.tglTrima).getTime(),
			"obat": [],
			"alat_kesehatan": []
		}
		this.detailRetur.gudang_retur_obat.map((val,i)=>{
			if(this.edObat[i]!=""&&this.batchObat[i]!=""){
				
				data.obat.push(
					{
						"id_gudang_retur_obat":val.id_gudang_retur_obat,
						"tanggal_ed": new Date(this.edObat[i]).getTime() ,
						"no_batch": this.batchObat[i]
					}
				)
			}else{
				err=true
			}
		})
		this.detailRetur.gudang_retur_alat_kesehatan.map((val,i)=>{
			if(this.edObat[i]!=""&&this.batchObat[i]!=""){
		
				data.alat_kesehatan.push({
					"id_gudang_retur_alat_kesehatan": val.id_gudang_retur_alat_kesehatan,
					"tanggal_ed": new Date(val.tanggal_ed).getTime(),
					"no_batch": val.no_batch,
				})
			}else{
				err=true
			}
		})
		if(!err){
			this.spinner.show('spinner1')

		this.ModulReturPenggantianService.add(data)
			.subscribe((resp: any) => {
				this.spinner.hide('spinner1')
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, 'error')
				} else {
					Swal.fire("Success", "Data berhasil disimpan", 'success')
					this.router.navigate(['retur/retur-pbf/penggantian'])
				}
			}, (err: any) => {
				this.spinner.hide('spinner1')
				if (err.metaData.response_code != "0000") {
					Swal.fire("Error", err.metaData.message, 'error')
				}
			})
		}
		
	}

}
