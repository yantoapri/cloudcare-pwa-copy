import { Component, ViewChild, OnInit } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { NgxSpinnerService } from "ngx-spinner";
import {ModulInventoryExportService} from 'src/app/private/modul-api/modul-laporan/laporan-inventory-export'
import {ModulInventoryService} from 'src/app/private/modul-api/modul-laporan/laporan-inventory'
import * as moment from 'moment';
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewAlatComponent implements OnInit {
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptionsED1: DataTables.Settings = {};
	dtOptionsED2: DataTables.Settings = {};
	dtOptionsED3: DataTables.Settings = {};
	dtOptionsED4: DataTables.Settings = {};
	dtOptionsED5: DataTables.Settings = {};
	dtOptionsED6: DataTables.Settings = {};
	dtOptionsED7: DataTables.Settings = {};
	dtOptionsED8: DataTables.Settings = {};
	
	constructor(
		private inventory:ModulInventoryService,
		private spinner:NgxSpinnerService,
		private inventoryExport:ModulInventoryExportService,
		private money:MoneyService
	) { }
	param:any
	currentUser:any=localStorage.getItem('currentUser')
	ngOnInit(): void {
		this.currentUser=this.currentUser!=null?JSON.parse(this.currentUser):null
		this.param={
			"Authorization": this.currentUser.token,
			"x_api_key": this.currentUser.key,
			"search": {
				"value": "",
				"regex": false
			},
			"transaksi_jenis": "masuk",
			"start":"",
			"end":"",
			"expired_in":0
		}
		this.spinner.show('spinner1')
		this.dtOptionsED1 = this.showDataTablesED1()
		this.dtOptionsED2 = this.showDataTablesED2()
		this.dtOptionsED3 = this.showDataTablesED3()
		this.dtOptionsED4 = this.showDataTablesED4()
		this.dtOptionsED5 = this.showDataTablesED5()
		this.dtOptionsED6 = this.showDataTablesED6()
		this.dtOptionsED7 = this.showDataTablesED7()
		this.dtOptionsED8 = this.showDataTablesED8()
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 1200);
	}
	
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
	download(resp,name){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `${name}.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
	exportEd1(){
		this.spinner.show('spinner1')
		this.param.expired_in=3
		this.inventoryExport.exportEdAlat(this.param)
			.subscribe((resp: any) => {
			this.download(resp,'Barang ED dalam 3 bulan')
			this.spinner.hide('spinner1')
		})
	}
	exportEd2(){
		this.spinner.show('spinner1')
		this.param.expired_in=6
		this.inventoryExport.exportEdAlat(this.param)
			.subscribe((resp: any) => {
				this.download(resp,'Barang ED dalam 6 bulan')
				this.spinner.hide('spinner1')	
		})
	}
	
	exportEd3(){
		this.spinner.show('spinner1')
		this.param.expired_in=12
		this.inventoryExport.exportEdAlat(this.param)
			.subscribe((resp: any) => {
				this.download(resp,'Barang ED dalam 1 tahun')
				this.spinner.hide('spinner1')		
		})
	}

	export4(i){
		this.spinner.show('spinner1')
		switch (i) {
			case 1:
				this.inventoryExport.exportAlatBlmTerjual(this.param)
					.subscribe((resp: any) => {
						this.download(resp,'Barang ED belum terjual')
						this.spinner.hide('spinner1')		
				})
				break;
			case 2:
				this.inventoryExport.exportAlatTerlaris(this.param)
					.subscribe((resp: any) => {
						this.download(resp,'50 barang terlaris 30 hari terakhir')
						this.spinner.hide('spinner1')		
				})
				
				break;
			case 3:
				this.inventoryExport.exportAlatPembelianTerbanyak(this.param)
					.subscribe((resp: any) => {
						this.download(resp,'50 barang pembelian terbanyak 30 hari terakhir')
						this.spinner.hide('spinner1')		
				})
				
				break;
			case 4:
				this.inventoryExport.exportAlatInventor(this.param)
					.subscribe((resp: any) => {
						this.download(resp,'50 barang nilai inventor tertinggi')
						this.spinner.hide('spinner1')		
				})
				break;
			case 5:
				this.inventoryExport.exportAlatTdkTerjual(this.param)
					.subscribe((resp: any) => {
						this.download(resp,'Barang tidak pernah dijual 3 bulan ini')
						this.spinner.hide('spinner1')		
				})
				break;
			default:
				break;
		}
	}
	showDataTablesED1() {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.expired_in=3
				this.inventory.getEdAlat(dataTablesParameters)
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
					data: 'nama_barang',
				},
				{
					data: 'stok_terkini'
				},
				{
					data: 'no_batch',
				},
				{
					data: 'tanggal_ed_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format("DD-MM-YYYY")
					}
				}
			],

		}
	}
	showDataTablesED2() {

		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.expired_in=6
				this.inventory.getEdAlat(dataTablesParameters)
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
					data: 'nama_barang',
				},
				{
					data: 'stok_terkini'
				},
				{
					data: 'no_batch',
				},
				{
					data: 'tanggal_ed_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format("DD-MM-YYYY")
					}
				}
			],

		}
	}
	showDataTablesED3() {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.expired_in=12
				this.inventory.getEdAlat(dataTablesParameters)
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
					data: 'nama_barang',
				},
				{
					data: 'stok_terkini'
				},
				{
					data: 'no_batch',
				},
				{
					data: 'tanggal_ed_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format("DD-MM-YYYY")
					}
				}
			],

		}
	}
	showDataTablesED4() {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.inventory.getAlatBlmTerjual(dataTablesParameters)
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
					data: 'nama_barang',
				},
				{
					data: 'jumlah'
				},
				{
					data: 'no_batch',
				},
				{
					data: 'tanggal_ed_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format("DD-MM-YYYY")
					}
				}

			],

		}
	}
	showDataTablesED5() {
		let self=this
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			lengthMenu: [ 10, 25, 50],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.inventory.getAlatTerlaris(dataTablesParameters)
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
					data: 'nama_alat_kesehatan',
				},
				{
					data: 'qty_penjualan'
				},
				{
					data:'kemasan_terkecil'
				},
				{
					data:'total_penjualan',
					render(data: any, type: any, row: any, full: any) {

						let val=data.substring(0,data.indexOf('.'))
						return self.money.formatRupiah(val)
					}
				},

			],

		}
	}
	showDataTablesED6() {
		let self=this
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			lengthMenu: [ 10, 25, 50],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.inventory.getAlatPembelian(dataTablesParameters)
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
					data: 'nama_alat_kesehatan',
				},
				{
					data: 'qty_pembelian'
				},
				{
					data:'total_pembelian',
					render(data: any, type: any, row: any, full: any) {
						let val=data.substring(0,data.indexOf('.'))
						return self.money.formatRupiah(val)
					}
				},

			],

		}
	}
	showDataTablesED7() {
		let self=this
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			lengthMenu: [ 10, 25, 50],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.inventory.getAlatInvetory(dataTablesParameters)
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
					data: 'nama_alat_kesehatan',
				},
				{
					data: 'total_stok'
				},
				{
					data:'total_pembelian',
					render(data: any, type: any, row: any, full: any) {
						let val=data.substring(0,data.indexOf('.'))
						return self.money.formatRupiah(val)
					}
				},
			],

		}
	}
	showDataTablesED8() {
		let self=this
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			lengthMenu: [ 10, 25, 50],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.inventory.getAlatTdkTerjual(dataTablesParameters)
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
					data: 'nama_alat_kesehatan',
				},
				{
					data: 'stok'
				},
			
				{
					data: 'harga_jual',
					render(data: any, type: any, row: any, full: any) {
						let val=data.substring(0,data.indexOf('.'))
						return self.money.formatRupiah(val)
					}
				}
			],

		}
	}

}
