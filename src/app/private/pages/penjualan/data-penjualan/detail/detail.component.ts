import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModulPenjualanService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-penjualan.service';
import * as moment from 'moment';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
import { PenjualanPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/penjualan-payload';
@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

	reloadTable: boolean
	getState: Observable<any>;
	dataPenjualan: PenjualanPayload = new PenjualanPayload
	constructor(
		private ModulPenjualanService: ModulPenjualanService,
		private money:MoneyService,
		private spinner : NgxSpinnerService,
		private activatedRoute: ActivatedRoute,
		private store: Store<fromApp.PrivateAppState>,) {
		this.getState = this.store.select('penjualan')
	}
	dataDetail: any
	total = 0
	totalDiskon=0
	session:any
	klinik=""
	ppn=0
	ppnPercent=0
	ngOnInit(): void {
		$("#contentPrint").hide()
		this.session=localStorage.getItem('currentUser')
		this.session=this.session?JSON.parse(this.session):null
		this.spinner.show('spinner1')
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				let listKlinik = JSON.parse(localStorage.getItem('currentUser'))
				listKlinik = listKlinik.plant
				listKlinik.map((val) => {
					if (val.status == 1) {
						this.klinik = val
					}
				})
				this.ModulPenjualanService.show(params.id)
					.subscribe((resp: any) => {
						setTimeout(() => {
							this.spinner.hide('spinner1')
							this.dataDetail = resp.response
							this.dataDetail.penjualan_detail.map(val=>{
								this.totalDiskon+=Number(val.diskon_rupiah)
							})
							this.dataDetail.penjualan_alat_kesehatan.map(val=>{
								this.totalDiskon+=Number(val.diskon_rupiah)
							})
							this.ppnPercent=this.dataDetail.pajak_barang!=undefined?this.dataDetail.pajak_barang:11
							this.ppn=(this.ppnPercent/100)*parseInt(this.dataDetail.total_bayar)
							this.total=parseInt(this.dataDetail.total_bayar)+this.ppn
						}, 400)
					})
			}
		})

	}
	print() {
		let a = $("#contentPrint").show().html()
		$("body").html(a)
		document.title=`Farmasi [${this.convertDate(this.dataDetail.created_at_unix)}]`
		window.print()
		location.reload()
	}
	convertDate(val){
		return moment(new Date(val)).format("DD-MM-YYYY")
	}
	
	Money(val){
		return val!=""?this.money.formatRupiah(parseInt(val)):"-"
	}
}
