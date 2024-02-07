import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { AntreanPasienService } from 'src/app/private/services/pasien/antrean-pasien.service';
import { AntreanPasienService } from 'src/app/private/services/pasien/antrean-pasien.service';
import { DataTableDirective } from 'angular-datatables'
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';
import { ModulResepService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-resep.service';
import { Router} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: 'app-view',
	templateUrl: './antrian.component.html',
	styleUrls: ['./antrian.component.sass']
})
export class AntrianComponent implements OnInit {

	dtOptions: DataTables.Settings = {};
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	@ViewChild('id_select_poliklinik') id_select_poliklinik: ElementRef
	listPoliklinik: Array<any> = []
	type_poli: string = ''
	poli_name: string = ''
	tableAktif: string = ''
	constructor(
		private AntreanPasienService: AntreanPasienService,
		private router: Router,
		private spinner:NgxSpinnerService ,
		private ModulResepService: ModulResepService,
		private daftarPoliklinikService: DaftarPoliklinikService,
	) {

	}
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	ngOnInit(): void {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMATAR1')!=-1?true:false
		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		
		this.dtOptions = this.showDataTables()
	}
	capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
	loadListPoliklinik() {
		this.daftarPoliklinikService.getByAkunKlinik()
			.subscribe(succ => {
				this.listPoliklinik = succ.response
			})
	}
	ButtonCari() {
		this.reLoadData()
	}
	prosesAntrean(data: any) {
		this.spinner.show('spinner1')
		this.ModulResepService.create({ "id_antrian": data.id_antrian })
			.subscribe(res => {
				if (res.metaData.response_code == "0000") {
					this.router.navigate(['resep', 'add', res.response.id_penjualan_resep,data.id_antrian,data.id_pasien,'antrian'])
					this.spinner.hide('spinner1')
				}
			})
	}

	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
	showDataTables() {
		this.spinner.show('spinner1')
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			order: [[0, 'ASC']],
			ajax: (dataTablesParameters: any, callback: any) => {
				Object.assign(dataTablesParameters, { nama: "",id_poliklinik:"" })
				this.AntreanPasienService.getDataTablesResep(dataTablesParameters)
					.subscribe((resp: any) => {
						if(resp.metaData.response_code=="0000"){
							callback({
								draw: resp.response.draw,
								recordsTotal: resp.response.recordsTotal,
								recordsFiltered: resp.response.recordsFiltered,
								data: resp.response.data
							})
						}else{
							callback({
								draw: 0,
								recordsTotal: 0,
								recordsFiltered: 0,
								data: []
							})
						}
						this.spinner.hide('spinner1')
					})
			},
			columns: [
				{
					data: 'no_antrian'
				}, {
					data: 'nama'
				}, {
					data: 'nama_sesi'
				}, {
					data: 'proses_antrian'
				}, {
					data: 'status_input_pasien',
					render(data: any, type: any, row: any, full: any) {
						if (data == 'B') {
							return 'Baru'
						} else {
							return 'Lama'
						}
					}
				}, {
					data: 'tgl_antrian',
					render(data: any, type: any, row: any, full: any) {
						return moment(data).format("DD-MM-YYYY H:m:s")
					}
				}, {
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						let disabled = row.proses_antrian == "sudah" ? 'hidden' : ''
						let disabled1 = row.proses_antrian == "sudah" ? '' : 'hidden'
						return `<button class="btn btn text-ui-primary proses-antrean-data" ` + disabled + `><i class="fas fa-sync-alt"></i> Proses Resep</button>
						<button class="btn btn-link circle-info text-ui-info detail m" ` + disabled1 + `><i class="far fa-eye"></i></button>`
					}
				}
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td .proses-antrean-data', row).on('click', () => {
					self.prosesAntrean(data);
				});
				$('td .detail', row).on('click', () => {
					self.detail(data);
				});
				return row;
			}
		}
	}

	detail(data){
		this.router.navigate(['resep/detail/' + data.id_penjualan_resep+'/antrian'])
	}
}
