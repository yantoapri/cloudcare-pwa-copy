import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { ModulReturPbfService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-pbf';
import * as fromApp from 'src/app/private/states/private-app.states'
import { ReturGudang } from 'src/app/private/models/class-payload-api/gudang-transaksi/retur-gudang-payload';
import { NgxSpinnerService } from "ngx-spinner";
import {MoneyService} from 'src/app/private/services/money/index'

@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {


	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataBarang: ReturGudang = new ReturGudang
	constructor(
		private modalService: ModalService,
		private ModulReturPbfService: ModulReturPbfService,
		private MoneyService:MoneyService,
		private activatedRoute: ActivatedRoute,
		private spinner : NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,
	) {
		this.getState = this.store.select('retur_gudang')
	}
	total_obat = 0
	total_alat = 0
	detailRetur: any = []
	tglTrima: any = ""
	id_retur = null
	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.spinner.show('spinner1')
				this.ModulReturPbfService.show(params.id)
					.subscribe((resp: any) => {
						this.spinner.hide('spinner1')
						this.setDetail(resp.response, params.id)
					})
			}
		})
	}
	setDetail(data, id) {
		setTimeout(() => {
			this.id_retur = id
			this.detailRetur = data
			data.gudang_retur_obat.map(val => {
				this.total_obat += (parseInt(val.satuan_qty)*parseInt(val.satuan_harga))-parseInt(val.diskon_rupiah)
			})
			data.gudang_retur_alat_kesehatan.map(val => {
				this.total_alat += (parseInt(val.satuan_qty)*parseInt(val.satuan_harga))-parseInt(val.diskon_rupiah)
			})
		}, 300);
	}
	ngOnDestroy(): void {
		document.body.classList.remove('jw-modal-open');
	}

	btnOpenModal() {
		this.modalService.open("modalFormContent");
	}
	Money(val){
		return this.MoneyService.formatRupiah(val)
	}
	selesai() {
		this.spinner.show('spinner1')
		let data = {
			"tgl_diterima": this.tglTrima,
			"obat": [],
			"alat_kesehatan": []
		}

		this.detailRetur.gudang_retur_obat.map(val => {
			data.obat.push(
				{
					"id_gudang_retur_obat": val.id_gudang_retur_obat,
					"tanggal_ed": val.tanggal_ed,
					"no_batch": val.no_batch,
					"keterangan": val.keterangan
				}
			)
		})
		this.detailRetur.gudang_retur_alat_kesehatan.map(val => {
			data.alat_kesehatan.push(
				{
					"id_gudang_retur_alat_kesehatan": val.id_gudang_retur_alat_kesehatan,
					"tanggal_ed": val.tanggal_ed,
					"no_batch": val.no_batch,
					"keterangan": val.keterangan
				}
			)
		})

		this.ModulReturPbfService.update(this.id_retur, data)
			.subscribe((resp: any) => {
				this.spinner.hide('spinner1')
				if (resp.metaData.response_code != "0000") {
					Swal.fire("Error", resp.metaData.message, 'error')
				} else {
					Swal.fire("Success", "Data berhasil disimpan", 'success')
				}
			}, (err: any) => {
				this.spinner.hide('spinner1')
				if (err.metaData.response_code != "0000") {
					let msg = ""
					err.response.map(val => {
						msg += val.field + " " + val.message
					})
					Swal.fire("Error", msg, 'error')
				}
			})
	}

}
