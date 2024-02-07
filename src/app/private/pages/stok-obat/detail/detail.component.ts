import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulStokService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-stok.service';
import { Router } from '@angular/router';
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
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	dtOptionsRiwayat: DataTables.Settings = {};
	isEdit: boolean
	isLoadingButton: boolean
	reloadTable: boolean
	errorMessage: any | null
	submitButton: boolean
	getState: Observable<any>;
	dataStok = []
	listBatch = []
	listRiwayat = []
	constructor(
		private spinner : NgxSpinnerService,
		private MoneyService:MoneyService,
		private ModulStokService: ModulStokService,
		private store: Store<fromApp.PrivateAppState>,
		private activatedRoute: ActivatedRoute,
		private router: Router,
	) {
		this.getState = this.store.select('stok_obat')
	}
	id_obat=null
	obat=""
	ngOnInit(): void {
		this.activatedRoute.params.subscribe(async (params: Params) => {
			if (params) {
				this.spinner.show('spinner1')
				this.loadData(params.id)
				this.id_obat=params.id
				this.obat=decodeURIComponent(params.obat)
				this.dtOptions = this.showDataTables(params.id)
				this.dtOptionsRiwayat = this.showDataTablesRiwayat(params.id)
			}
		})
	}
	showDataTables(id) {
		let self=this
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.ModulStokService.getRiwayatBatch(id, dataTablesParameters)
					.subscribe((resp: any) => {
						callback({
							draw: resp.response.draw,
							recordsTotal: resp.response.recordsTotal,
							recordsFiltered: resp.response.recordsFiltered,
							data: resp.response.data
						})
						this.spinner.hide('spinner1')
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
					data: 'tgl_faktur_unix',
					render(data: any, type: any, row: any, full: any) {
						return data!=null?moment(new Date(data)).format('DD-MM-YYYY'):'-'
					  }
				},
				{
					data: 'harga_beli',
					render(data: any, type: any, row: any, full: any) {
						return self.money(data)
					}
				},
				{
					data: 'no_batch'
				},
				{
					data: 'tanggal_ed_unix',
					render(data: any, type: any, row: any, full: any) {
						return data!=null?moment(new Date(data)).format('DD-MM-YYYY'):'-'
					  }
				},
				{
					data: 'stok_terkini'
				},
			],
			rowCallback: (row: Node, data: any, index: number) => {
				if(new Date().getTime()>=new Date(data.tanggal_ed_unix).getTime())
				{
					$(row).children().css('background-color','#ff8c8c')
				}
			}
		}
	}
	showDataTablesRiwayat(id) {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.ModulStokService.getRiwayat(id, dataTablesParameters)
					.subscribe((resp: any) => {
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
					data: 'tanggal_invoice_unix',
					render(data: any, type: any, row: any, full: any) {
						return data!=null?moment(new Date(data)).format('DD-MM-YYYY'):'-'
					  }
				},
				{
					data: 'kegiatan'
				},
				{
					data: 'nama_lengkap'
				},
				{
					data: 'no_batch'
				},
				{
					data: 'stok_masuk',
				},
				{
					data: 'stok_keluar',
				},
				{
					data: 'stok_akhir'
				},
			],

		}
	}
	editKatalog(id: any) {
		this.router.navigate(['katalog-obat/katalog/edit-buat-baru/'+this.id_obat+'/stok_detail'])
	}
	async loadData(id) {
		await this.ModulStokService.show(id)
			.subscribe((resp: any) => {
				if (resp.response) {
					this.dataStok = resp.response
				}
			})

	}
	money(data){
		return this.MoneyService.formatRupiah(parseInt(data))
	}
	toInt(itm) {
		return parseInt(itm)
	}
	toString(itm) {
		return JSON.stringify(itm)
	}
}
