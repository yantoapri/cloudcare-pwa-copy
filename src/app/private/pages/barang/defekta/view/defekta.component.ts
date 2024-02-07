import { Component, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ModalService } from 'src/app/shared/_modal';
import { FormGroup} from "@angular/forms";
import { defektaAlatPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/defekta-payload';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ModulDefektaAlatService } from 'src/app/private/modul-api/modul-master-node/modul-defekta-alat.service';
import * as fromApp from 'src/app/private/states/private-app.states'
import * as DefektaActions from 'src/app/private/states/alat-kesehatan/defekta/defekta.action'
import { ModulSupplierService } from "src/app/private/modul-api/modul-master-node/modul-supplier.service";
import { ModulAlatKesehatanService } from "src/app/private/modul-api/modul-master-node/modul-alat-kesehatan.service";
import { NgxSpinnerService } from "ngx-spinner";
import {ValidateService} from 'src/app/private/services/validate/validateService'
import { CurrencyMaskInputMode } from 'ngx-currency';
@Component({
	selector: 'app-defekta',
	templateUrl: './defekta.component.html',
	styleUrls: ['./defekta.component.sass']
})
export class DefektaComponent implements OnInit {
	dataChecked: any = []
	btnAction = false;
	submitted: boolean = false
	formInput: FormGroup;
	arrData = [{ "title": "Amoxin 500 mg" }, { "title": "Amoxin 500 mg" }]
	constructor(
		private spinner : NgxSpinnerService,
		private validate:ValidateService,
		private ModulAlatKesehatanService: ModulAlatKesehatanService,
		private modalService: ModalService,
		private store: Store<fromApp.PrivateAppState>,
		private ModulDefektaAlatService: ModulDefektaAlatService,
		private modulSupplierService: ModulSupplierService,
	) { }
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	jumlah: number[] = []
	pbf: any=null
	satuan: string[] = []
	diskon: number[] = []
	jenis_diskon: string[] = []
	harga: string[] = []
	optionKemasan: string[] = []
	optionPbf: any=[]
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataBarang: defektaAlatPayload = new defektaAlatPayload
	checked = false
	defaultData = []
	params_get = {
		last_data: 0,
		get_data: 10,
		search: ""
	}
	optionsCur = {
		align: "left",
		allowNegative: true,
		allowZero: true,
		decimal: ",",
		precision: 2,
		prefix: "Rp ",
		suffix: "",
		thousands: ".",
		nullable: true,
		min: null,
		max: null,
		inputMode: CurrencyMaskInputMode.NATURAL,
	  };
	isLastPBF=false
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	isLoading=false
	ngOnInit(): void {
		this.spinner.show('spinner1')
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		// this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='IVKLAK2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='IVDFAK1')!=-1?true:false

		if(!this.view){
			Swal.fire("warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		this.getState = this.store.select('defekta_alat')
		this.dtOptions = this.showDataTables()
		this.getState.subscribe((state) => {
			if (state != undefined) {
				this.reloadTable = state.reloadTable
				if (this.reloadTable === true) {
					this.reLoadData()
				}
			}
		})
		setTimeout(() => {
			this.spinner.hide('spinner1')
		}, 400);
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	prosesSelectPBF(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.params_get.search = event.term
			if(this.params_get.search==""||this.params_get.search.length>=3){
			this.optionPbf=[]
			this.params_get.last_data=0
			this.isLastPBF=false
			}else{
			this.isLastPBF=true
			}
		}
		if(aksi=="open"||aksi=="clear"){
			this.params_get.search = ""
			this.optionPbf=[]
			this.params_get.last_data=0
			this.isLastPBF=false
		  }
		if(aksi=="last_page"){
			if(!this.isLastPBF)
			this.params_get.last_data+=10
		}
		if(!this.isLastPBF){
			this.isLoading=true
			this.modulSupplierService.get(this.params_get)
			.subscribe((resp: any) => {
				if(resp){
					if(resp.response.length==0){
						this.isLastPBF=true
					}else{
						if(resp.response.length<10){
							resp.response.map(val=>{
								let i=this.optionPbf.findIndex(x=>x.id_supplier==val.id_supplier)
								if(i==-1)
								this.optionPbf.push(val)
							})
							this.isLastPBF=true
						}else{
							resp.response.map(val=>{
								let i=this.optionPbf.findIndex(x=>x.id_supplier==val.id_supplier)
								if(i==-1)
								this.optionPbf.push(val)
							})
						}
						this.isLoading=false
					}
				}
			})
		}
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}

	showDataTables() {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				this.ModulDefektaAlatService.listDatatables(dataTablesParameters)
					.subscribe((resp: any) => {
						this.defaultData = resp.response.data;
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
						let no = full.row + 1 + full.settings._iDisplayStar
						return '<input type="checkbox" name="checkbox' + no + '" class="checkbox option-checkbox mr-2" />'
					}
				},
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
					data: 'status_beli_defekta',
					render(data: any, type: any, row: any, full: any) {
						let status = (data == null || data == "belum") ? 'Belum' : '<i class="fas fa-check-circle success"></i> Sudah <a href="javascript:void(0);" class="text-warning ubah btn-link"><i class="fas fa-pen"></i></a>'
						return status;
					}
				},
				{
					data: 'stok'
				},
				{
					data: 'stok',
					render(data: any, type: any, row: any, full: any) {
						return 0;
					}
				},
				{
					data: 'stok',
					render(data: any, type: any, row: any, full: any) {
						return 0;
					}
				},
				{
					data: 'stok',
					render(data: any, type: any, row: any, full: any) {
						return 0;
					}
				},

			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .option-checkbox', row).on('click', () => {
					self.checkBoxClick(data);
				});
				$('td .ubah', row).on('click', () => {
					self.ubah(data);
				});
				return row;
			}
		}
	}
	checkedAll(e) {
		if (e.target.checked) {
			this.dataChecked = this.defaultData
			$('td .option-checkbox').prop('checked', true);
		} else {
			this.dataChecked = []
			$('td .option-checkbox').prop('checked', false);
		}
	}
	checkBoxClick(e) {
		const index = this.dataChecked.findIndex(x => x === e);
		$("input[name='all']").prop('checked', false)
		if (index == -1) {
			this.dataChecked.push(e);
		} else {
			this.dataChecked.splice(index, 1);
		}
		if (this.dataChecked.length > 0) {
			this.btnAction = true;
		} else {
			this.btnAction = false;
		}
	}
	ubah(item) {
		Swal.fire({
			title: 'Apa anda yakin?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: 'Ya, lanjutkan!',
		}).then((result) => {
			if (result) {
				this.spinner.show('spinner1')
				let data = { "alat_kesehatan": [{ "id_alat_kesehatan": item.id_alat_kesehatan }] }
				this.store.dispatch(
					DefektaActions.updateInitial({ payload: data })
				)
				setTimeout(() => {
					this.spinner.hide('spinner1')
				}, 400);
				this.reLoadData()
			}
		})

	}
	open(content) {
		this.modalService.open(content)
	}
	modalClose(content) {
		this.modalService.close(content)
	}
	blmDiperiksa() {
		if (this.dataChecked.length <= 0) {
			Swal.fire("Warning", "Please checked option", "warning");
		} else {
			Swal.fire({
				title: 'Apa anda yakin?',
				icon: 'question',
				showCancelButton: true,
				confirmButtonText: 'Ya, lanjutkan!',
			}).then((result) => {
				if (result) {
					this.spinner.show('spinner1')
					let data = { "alat_kesehatan": [] }
					this.dataChecked.forEach(val => {
						data.alat_kesehatan.push({ "id_alat_kesehatan": val.id_alat_kesehatan })
					});
					this.store.dispatch(
						DefektaActions.updateInitial({ payload: data })
					)
					setTimeout(() => {
						this.spinner.hide('spinner1')
					}, 400);
					this.dataChecked = []
					this.reLoadData()
					$('td .option-checkbox').prop('checked', false);
				}
			})
		}

	}
	simpan() {
		this.submitted = false
		setTimeout(() => {
			this.submitted = true
		}, 400);
		let data = this.getValue()
		if (data != null) {
			this.spinner.show('spinner1')
			this.store.dispatch(
				DefektaActions.addInitial({ payload: data })
			)
			setTimeout(() => {
				this.spinner.hide('spinner1')
			}, 400);
			this.dataChecked = []
			$('td .option-checkbox').prop('checked', false);
			this.modalClose("sudahOrder")
			this.reLoadData()
		}
	}
	getValue() {
		let empty = false
		let data = { "id_supplier": this.pbf, "alat_kesehatan": [] }
		if (this.pbf == undefined) empty = true
		this.dataChecked.map((it: any, index: number) => {
			if (this.jumlah[index] == undefined||this.jumlah[index] <=0 || this.satuan[index] == "" || this.harga[index] == undefined || this.diskon[index] == undefined || this.jenis_diskon[index] == undefined) {
				empty = true
			} else {
				data.alat_kesehatan.push({
					"id_alat_kesehatan": it.id_alat_kesehatan,
					"satuan": this.satuan[index],
					"satuan_qty": this.jumlah[index],
					"satuan_harga": this.harga[index],
					"jenis_diskon": this.jenis_diskon[index],
					"diskon_value": this.diskon[index]
				})
			}
		})
		return empty ? null : data
	}
	async sdhDiperiksa() {
		if (this.dataChecked.length <= 0) {
			Swal.fire("Warning", "Please checked option", "warning");
		} else {
			this.spinner.show('spinner1')
			this.jenis_diskon=[]
			this.diskon=[]
			this.jumlah=[]
			this.pbf=null
			await this.dataChecked.map(async (it: any, index: number) => {
				await this.ModulAlatKesehatanService.getById(it.id_alat_kesehatan)
					.subscribe((resp: any) => {
						this.harga.push(resp.response.harga_pokok)
						this.optionKemasan[index] = resp.response
						this.satuan.push(it.kemasan_terkecil_singkatan)
						this.diskon.push(0)
						this.jumlah.push(0)
						this.jenis_diskon.push("persen")
					})
			})

			setTimeout(() => {
				this.spinner.hide('spinner1')
				this.open('sudahOrder')
			}, 200 * this.dataChecked.length);

		}
	}
}
