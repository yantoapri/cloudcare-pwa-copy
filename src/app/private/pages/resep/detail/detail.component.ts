import { Component, OnInit } from '@angular/core';
// import { ModalService } from 'src/app/shared/_modal';
// import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulRiwayatKlinikService } from 'src/app/private/modul-api/modul-laporan/riwayat-klinik'
// import { ModulResepService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-resep.service';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

	reloadTable: boolean
	getState: Observable<any>;
	dataResep: any
	constructor(
		// private ModalService: ModalService,
		// private ModulResepService: ModulResepService,
		// private router: Router,
		private money:MoneyService,
		private resep:ModulRiwayatKlinikService,
		private spinner: NgxSpinnerService,
		private activatedRoute: ActivatedRoute,
		private store: Store<fromApp.PrivateAppState>,) {
		this.getState = this.store.select('resep')
	}
	dataDetail: any
	total = 0
	urlBack=""
	totalObat=0
	ppn=0
	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.urlBack=params.page=='riwayat'?'../../../'+params.page+'/1':'../../../'+params.page
				this.spinner.show('spinner1')
				this.resep.getByID(params.id)
					.subscribe((resp: any) => {
						if (resp.metaData.response_code == "0000") {
							this.dataDetail = resp.response
							this.dataDetail.penjualan_resep_detail.map(val=>{
								this.totalObat+=parseInt(val.total_harga)-parseInt(val.diskon_rupiah)
							})
							this.total=this.totalObat+parseInt(this.dataDetail.diagnosa_dokter_umum.jt)+parseInt(this.dataDetail.diagnosa_dokter_umum.jm)
							+parseInt(this.dataDetail.diagnosa_dokter_umum.biaya_dokter)+parseInt(this.dataDetail.diagnosa_dokter_umum.bhp)+
							parseInt(this.dataDetail.diagnosa_dokter_umum.lain_lain)+parseInt(this.dataDetail.pajak_obat_rupiah)+parseInt(this.dataDetail.tindakan_medis.total_biaya_tindakan)
							this.spinner.hide('spinner1')
						}
					})
			}
		})

	}
	Money(val){
		return this.money.formatRupiah(parseInt(val))
	}
	back(){

	}
	convertDate(val){
		return val?moment(new Date(val)).format("DD/MM/YYYY"):moment(new Date()).format("DD/MM/YYYY")
	}
}
