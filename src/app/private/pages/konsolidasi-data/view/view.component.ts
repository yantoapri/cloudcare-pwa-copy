import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulKonsolidasiDataService } from 'src/app/private/modul-api/modul-rekam-medis/modul-konsolidasi-data.service';
import { DataPasienService } from 'src/app/private/services/pasien/data-pasien.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Store } from '@ngrx/store';
import * as KonsolidasiActions from 'src/app/private/states/konsolidasi-data/konsolidasi-data.action'
import * as fromApp from 'src/app/private/states/private-app.states'
import { NgxSpinnerService } from "ngx-spinner";
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
	params = {
		"last_data": 0,
		"get_data": 10,
		"search": ""
	}
	constructor(
		private DataPasienService: DataPasienService,
		private spinner : NgxSpinnerService,
		private modulKonsolidasi: ModulKonsolidasiDataService,
		private store: Store<fromApp.PrivateAppState>,
	) { }
	loadingPasien: boolean=false
	listPasien: any[] = []
	toMerge:any=null
	fromMerge:any=null
	submitted = false
	idAntrianFrom = ""
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	isLastPasien=false
	ngOnInit(): void {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='RMMDKS2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='RMMDKS1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}

	}
	
	prosesSelectPasien(event: any, aksi: string) {
		
		let param = this.params
		if (aksi == 'search')
		{
			this.params.search = event.term
			if(this.params.search==""||this.params.search.length>=3){
			this.listPasien=[]
			this.params.last_data=0
			this.isLastPasien=false
			}else{
				this.isLastPasien=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params.last_data=0
			this.listPasien=[]
			this.isLastPasien=false
			this.params.search=""
		  }
		if(aksi=="last_page"){
			if(!this.isLastPasien)
			this.params.last_data+=10
		}
		
		if(!this.isLastPasien){
			this.loadingPasien = true
			this.DataPasienService.getSelectOption(this.params)
				.subscribe((resp: any) => {
					this.loadingPasien = false
					if(resp){
						if(resp.response.length==0){
							this.isLastPasien=true
						}else{
							if(resp.response.length<10){
								if(aksi=="search")this.listPasien=[]
								resp.response.map(val=>{
									let i=this.listPasien.findIndex(x=>x.id_pasien==val.id_pasien)
									if(i==-1)
									this.listPasien.push(val)
								})
								this.isLastPasien=true
							}else{
								resp.response.map(val=>{
									let i=this.listPasien.findIndex(x=>x.id_pasien==val.id_pasien)
									if(i==-1)
									this.listPasien.push(val)
								})
							}
						}
					}
				})
		}
	}
	cari() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 300);
		if (this.fromMerge==null|| this.toMerge==null) {
			return false
		}
		this.dtOptions = this.showDataTables(this.fromMerge, this.toMerge,this.btnEdit)
	}
	
	check(i, id) {
		let res = false
		if (i == 1) {
			res = this.toMerge == id ? true : false
		} else {
			res = this.fromMerge == id ? true : false
		}
		return res
	}
	merge(data: any) {
		Swal.fire({
			title: 'Apa anda yakin?',
			icon: 'warning',
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Ya, lanjutkan!',
		}).then((result) => {
			if (result) {
				let param = {
					"id_pasien_from": this.fromMerge,
					"id_pasien_target": this.toMerge
				}
				this.store.dispatch(KonsolidasiActions.addInitial({ payload: param, id: data.id_antrian }))
				this.cari()
			}
		})

	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables(idFrom, idTo,merge) {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				dataTablesParameters.id_pasien_from = idFrom
				dataTablesParameters.id_pasien_target = idTo
				this.modulKonsolidasi.listDatatables(dataTablesParameters)
					.subscribe((resp: any) => {
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
					data: 'tgl_antrian',
					render(data: any, type: any, row: any, full: any) {
						let tgl = new Date(data)
						let m = (tgl.getMonth() + 1 > 10) ? tgl.getMonth() + 1 : "0" + (tgl.getMonth() + 1)
						let d = (tgl.getDate() > 10) ? tgl.getDate() : "0" + tgl.getDate()
						return d + "/" + m + "/" + tgl.getFullYear()
					}
				},
				{
					data: "nama_sesi"
				},
				{
					data: "no_antrian"
				},
				{
					data: "status_antrian"
				},
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return merge?`<button class="btn btn-link circle-primary text-ui-primary merge" title="Merge"><i calss="fas fa-file-export"></i></button>`:'';
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .merge', row).on('click', () => {
					self.merge(data);
				});

				return row;
			}
		}
	}
}
