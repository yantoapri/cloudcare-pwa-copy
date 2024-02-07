import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulRiwayatKlinikService } from 'src/app/private/modul-api/modul-laporan/riwayat-klinik'
import { JadwalSesiService } from 'src/app/private/modul-api/modul-master/modul-jadwal-sesi.service'
import { ModulInvoiceExportService } from 'src/app/private/modul-api/modul-laporan/laporan-invoice-export'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as ResepAction from 'src/app/private/states/resep/resep.action'
import { ObatPayload, FinishPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/resep-payload';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from 'moment';
import { ActivatedRoute, Params } from '@angular/router';
import { ModulResepService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-resep.service';
import {MoneyService} from 'src/app/private/services/money/index'
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataResep: ObatPayload = new ObatPayload
	Resep: FinishPayload = new FinishPayload
	constructor(
		private ModalService: ModalService,
		private resep: ModulRiwayatKlinikService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private resepService:ModulResepService,
		private money:MoneyService,
		private invoice:ModulInvoiceExportService,
		private sesiService:JadwalSesiService,
		private spinner:NgxSpinnerService,
		private store: Store<fromApp.PrivateAppState>,) {
		this.getState = this.store.select('resep')
	}
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	params_get = {
		last_data: 0,
		get_data: 10,
		search: "",

	}
	pasien=""
	tgl=[new  Date(),new Date()]
	sesi=null
	optionPasien=[]
	optionSesi=[]
	minDate=new Date()
	maxDate=new Date()
	currentSesi:any
	isLastSesi=false
	ngOnInit() {
		var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.minDate = new Date(y, m, 1);
		this.maxDate= new Date(y, m + 1, 0);
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		// this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='AMATTD2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMATAR1')!=-1?true:false
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params.back==undefined) {
				localStorage.removeItem('search_riwayat_resep')
			}
		})
		let search:any=localStorage.getItem('search_riwayat_resep')
		if(search!=null)
		{
			search=JSON.parse(search)
			this.tgl=[new Date(search.date_from),new Date(search.date_to)]
			
			this.sesi=search.sesi?.id_jadwal_sesi
			this.optionSesi=[search.sesi]
			this.pasien=search.jenis_pasien
			
		}else{
			
			this.tgl=[new Date(y, m, 1),new Date()]
		}
		

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		
		this.dtOptions = this.showDataTables(this.btnDetail)
		this.getState.subscribe((state) => {
			this.reloadTable = state.reloadTable
			if (this.reloadTable === true) {
				this.reLoadData()
			}
		})
	}
	detail(data: any) {
		this.router.navigate(['resep/detail/' + data.id_penjualan_resep+'/riwayat'])
	}


	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	prosesSelectSesi(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.optionSesi=[]
			this.params_get.last_data=0
			this.isLastSesi=false
			}else{
				this.isLastSesi=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.optionSesi=[]
			this.params_get.last_data=0
			this.isLastSesi=false
			this.params_get.search=""
		}
		if(aksi=="last_page"){
			if(!this.isLastSesi)
			this.params_get.last_data+=10
		}
		this.sesiService.getSelectOption(this.params_get)
			.subscribe((resp: any) => {
				if(resp){
					if(resp.response.length==0){
						this.isLastSesi=true
					}else{
						if(resp.response.length<10){
							resp.response.map(val=>{
								let index=this.optionSesi.findIndex(x=>x.id_jadwal_sesi==val.id_jadwal_sesi)
								if(index==-1)
								this.optionSesi.push(val)
							})
							this.isLastSesi=true
						}else{
							resp.response.map(val=>{
								let index=this.optionSesi.findIndex(x=>x.id_jadwal_sesi==val.id_jadwal_sesi)
								if(index==-1)
								this.optionSesi.push(val)
							})
						}
					}
				}
			})
	}
	download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Kwitansi Resep.pdf`);
		document.body.appendChild(link);
		link.click();
	}
	cetak(data){
		this.spinner.show('spinner1')
		this.invoice.exportPdf(data.id_penjualan_resep).subscribe((resp: any) => {
			this.spinner.hide('spinner1')
			this.download(resp)
		})
	}
	setSesi(e){
		this.currentSesi=e
	}
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
	showDataTables(det) {
		let self=this
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.resep.getDatatables(dataTablesParameters)
				dataTablesParameters.date_from=new Date(this.convertTime(this.tgl[0])).getTime()
				dataTablesParameters.date_to=new Date(this.convertTime(this.tgl[1])).getTime()
    			dataTablesParameters.id_jadwal_sesi=this.sesi
    			dataTablesParameters.jenis_pasien=this.pasien
				localStorage.setItem('search_riwayat_resep',JSON.stringify(
					{
						date_from:new Date(this.convertTime(this.tgl[0])).getTime(),
						date_to:new Date(this.convertTime(this.tgl[1])).getTime(),
						sesi:this.currentSesi,
						jenis_pasien:this.pasien
					}
				))
				this.resep.getDatatables(dataTablesParameters).subscribe((resp: any) => {
						this.spinner.hide('spinner1')
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
					data: 'tgl_antrian_unix',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).format("DD-MM-YYYY")
					}
				},
				{
					data: 'proses_antrian',
				},
				{
					data: 'kode_invoice_full'
				},
				{
					data: 'nama'
				},
				{
					data: 'tipe_pasien'
				},
				{
					data: 'nama_sesi'
				},
				{
					data: 'total_bayar',
					render(data: any, type: any, row: any, full: any) {
						return self.money.formatRupiah(parseInt(data))
					}
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						let add=row.proses_antrian=='sudah'?'hidden':''
						let finis=row.proses_antrian=='sudah'?'':'hidden'
						return det?`<button class="btn btn-link circle-primary text-ui-primary add" ${add}><i class="far fa-edit"></i></button>
						<button class="btn btn-link circle-info text-ui-info detail" ${finis}><i class="far fa-eye"></i></button>
						<button class="btn btn-link circle-danger text-ui-danger cetak" ${finis}><i class="fa fa-print"></i></button>`:'';
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .detail', row).on('click', () => {
					self.detail(data);
				});
				$('td .add', row).on('click', () => {
					self.add(data);
				});
				$('td .cetak', row).on('click', () => {
					self.cetak(data);
				});

				return row;
			}
		}
	}
	add(data){
		this.spinner.show('spinner1')
		this.resepService.create({ "id_antrian": data.id_antrian })
			.subscribe(res => {
				if (res.metaData.response_code == "0000") {
					this.router.navigate(['resep/add/'+res.response.id_penjualan_resep+'/'+data.id_antrian+'/'+data.id_pasien+'/riwayat'])
					this.spinner.hide('spinner1')
				}
			})
	}
	hapus(data) {
		Swal.fire({
			title: 'Apakah anda yakin akan menghapus data ini ?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, hapus saja!',
			cancelButtonText: 'Tidak, Batalkan'
		}).then((result) => {
			if (result.value) {
				this.store.dispatch(
					ResepAction.cancelInitial({ payload: { id: data.id_penjualan_resep } })
				)

			}
		})
	}
	ngOnDestroy(): void {
		document.body.classList.remove('jw-modal-open');
	}

	btnOpenModal() {
		this.ModalService.open("modalFormContent");
	}

	modalClose() {
		this.ModalService.close("modalFormContent")

	}

}
