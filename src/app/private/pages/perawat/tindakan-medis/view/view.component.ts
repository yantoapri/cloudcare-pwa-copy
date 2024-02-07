import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as moment from "moment";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataTableDirective } from 'angular-datatables'
import { TindakanMedisService } from 'src/app/private/services/perawat/tindakan-medis.service';
import { CdTimerComponent} from 'angular-cd-timer';
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service';
import { NgxSpinnerService } from "ngx-spinner";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { Pasien } from 'src/app/private/models/pages/dokter/Pasien';
import { TindakanMedis } from 'src/app/private/models/pages/perawat/tindakan-medis';
import { AkunService } from 'src/app/private/services/manajemen-akun/akun.service';
import {ValidateService} from 'src/app/private/services/validate/validateService'
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	@ViewChild('basicTimer', { static: true }) basicTimer: CdTimerComponent;
	tabPane: any = { pane1: true, pane2: false, pane3: false }
	dtOptions: DataTables.Settings = {};
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	@ViewChild('bodyTable') bodyTable: ElementRef
	idSelectedAntrian: string = ""
	timeStart: number = 0
	jadwalSesi: string
	tglSekarang: string = moment().locale('id').format('dddd') + ', ' + moment().locale('id').format('LL')
	pageAktive: string = ""
	kodeHalaman: string = ""
	typePoli: string = ""
	pasienJson: string = ""
	errorMessage: any
	submitted: boolean = false
	isLoadingButton: boolean = false
	pasien: Pasien = new Pasien
	tindakanMedis: TindakanMedis = new TindakanMedis
	formInput: FormGroup
	listAkunPelaksanaTindakanMedis: Array<any> = []
	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private tindakanMedisService: TindakanMedisService,
		private spinner: NgxSpinnerService,
		private jadwalSesiService: JadwalSesiService,
		private fb: FormBuilder,
		private validate:ValidateService,
		private akunService: AkunService,
	) { }
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnSetting=false
	btnAdd=false
	view=false
	ngOnInit(): void {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='AMATTU2')!=-1?true:false
		this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMATTU1')!=-1?true:false

		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			window.location.href='/'
			})
		}
		this.getJadwalSesi()
		this.loadAkunPelaksanaTindakanMedis()
		setTimeout(() => { this.basicTimer.reset() })

		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.kodeHalaman = params.kode
				this.typePoli = params.kode
				if (this.pageAktive === "") {
					this.dtOptions = this.showDataTables()
					this.pageAktive = params.kode
				} else if (this.pageAktive !== params.kode) {
					this.reLoadData()
					this.pageAktive = params.kode
				}
			}
		})

		this.formInput = this.fb.group({
			obyektif_dokter: ["", []],
			keluhan: ["", []],
			alergi: ["", []],
			catatan_khusus: ["", []],
			tindakan: ["", []],
			planning: ["", []],
			resep_obat: ["", []],
			sistole: ["", []],
			diastole: ["", []],
			suhu: ["", []],
			hr: ["", []],
			status_hr: ["", []],
			rr: ["", []],
			keterangan_rr: ["", []],
			tb: ["", []],
			bb: ["", []],
			tindakan_medis: this.fb.array([]),
			assessment: this.fb.array([])
		})
	}
	isNumber(e){
		return this.validate.Number(e)
	}
	cut(text: string) {
		return (text != undefined) ? (text.length > 70) ? text.toString().substring(0, 70) + "..." : text : ''
	}
	selectedData(data: any) {
		setTimeout(() => {
			if (this.bodyTable.nativeElement.querySelector('.selected')) {
				if (this.idSelectedAntrian != data.id_antrian) {
					this.basicTimer.stop()
					this.basicTimer.reset()
					this.basicTimer.start()
					this.spinner.show('tindakanMedisView');
					this.pasien = new Pasien
					this.tindakanMedis = new TindakanMedis
					this.tindakanMedisService.showMultiple(data.id_antrian)
						.subscribe(res => {
							let perawat = res[0]
							let diagnosaDokter = res[1]
							let pasien = res[2]
							let show = res[3]
							pasien.response.id_antrian = data.id_antrian
							this.pasien = pasien.response
							this.pasien.alamat=this.pasien.alamat!=null?this.pasien.alamat:""
							this.pasien.kecamatan = this.pasien.kecamatan!=null?this.pasien.kecamatan:""
							this.pasien.kabupaten = this.pasien.kabupaten!=null?this.pasien.kabupaten:""
							this.pasien.provinsi = this.pasien.provinsi!=null?this.pasien.provinsi:""
							let alamat = this.pasien.alamat + ' ' + this.pasien.kecamatan
								+ ' ' + this.pasien.kabupaten + ' ' + this.pasien.provinsi
							this.pasien.alamat = this.truncateString(String(alamat), 80)
							if (this.pasien.id_pasien != null) {
								this.loadKunjunganTerkhir(this.pasien.id_pasien)
							}
							this.tindakanMedis.perawat = perawat.response
							this.tindakanMedis.diagnosa_dokter = diagnosaDokter.response
							this.pasienJson = JSON.stringify(this.pasien)
							this.clearArrayTindakanMedis()
							this.clearArrayAssessment()
							this.formInput.reset()
							this.submitted = false

							this.formInput.patchValue({
								keluhan: perawat.response.keluhan,
								alergi: perawat.response.alergi,
								catatan_khusus: perawat.response.catatan_khusus,
								obyektif_dokter: diagnosaDokter.response.obyektif_dokter,
								tindakan: diagnosaDokter.response.tindakan,
								planning: diagnosaDokter.response.planning,
								resep_obat: diagnosaDokter.response.resep_obat,
								sistole: perawat.response.sistole,
								diastole: perawat.response.diastole,
								suhu: perawat.response.suhu,
								hr: perawat.response.hr,
								status_hr: perawat.response.status_hr,
								rr: perawat.response.rr,
								keterangan_rr: perawat.response.keterangan_rr,
								tb: perawat.response.tb,
								bb: perawat.response.bb,
							})
							if (diagnosaDokter.response.assessment.length > 0) {
								diagnosaDokter.response.assessment.forEach(el => {
									let control = <FormArray>this.formInput.controls.assessment;
									control.push(
										this.fb.group({
											id_assessment: [el.id_assessment],
											nama_full: [el.nama_full]
										})
									)
								});
							}
							this.addTindakanaMedis(show.response)
							this.spinner.hide('tindakanMedisView');
							this.ShowTabPane(2)
						})
				}
				this.idSelectedAntrian = data.id_antrian
			}
		}, 50)
	}

	loadKunjunganTerkhir(id_pasien: string) {
		this.tindakanMedisService.showKunjunganTerakhirPasien(id_pasien)
			.subscribe(succ => {
				this.tindakanMedis.kunjungan_terakhir = succ.response
			})
	}

	clearArrayTindakanMedis() {
		const fa = this.formInput.get('tindakan_medis') as FormArray
		fa.clear()
	}
	clearArrayAssessment() {
		const fa = this.formInput.get('assessment') as FormArray
		fa.clear()
	}
	addTindakanaMedis(res: any) {
		if (res.length > 0) {
			res.forEach(el => {
				let control = <FormArray>this.formInput.controls.tindakan_medis;
				control.push(
					this.fb.group({
						id_pelaksana_medis_tindakan: [el.id_pelaksana_medis_tindakan],
						id_tindakan_medis: [el.id_tindakan_medis],
						nama_tindakan: [el.nama_tindakan],
						keterangan: [el.keterangan],
						id_akun_pelaksana: [el.id_akun_pelaksana, [Validators.required]],
					})
				)
			});
		}
	}
	loadAkunPelaksanaTindakanMedis() {
		let param = { last_data: 0, get_data: 10, search: "" }
		this.akunService.getSelectOption(param, 'perawat')
			.subscribe(succ => {
				this.listAkunPelaksanaTindakanMedis = succ.response
			})
	}

	udpateRekamMedis() {
		this.submitted = false
		setTimeout(() => { this.submitted = true }, 200);
		if (this.formInput.invalid) {
			return
		}
		let param = this.formInput.value.tindakan_medis
		this.errorMessage = null
		this.isLoadingButton = true
		this.tindakanMedisService.update({ tindakan_medis: param })
			.subscribe(succ => {
				this.isLoadingButton = false
				Swal.fire({
					title: 'Data berhasil disimpan',
					icon: 'success',
					showCancelButton: false,
					allowOutsideClick: false,
					confirmButtonText: 'Ya, lanjutkan!',
				}).then((result) => {
					this.router.navigate(['perawat', 'tindakan-medis', this.typePoli, 'view'])
					this.reLoadData()
					this.idSelectedAntrian = ""
					this.pasien = new Pasien
					this.tindakanMedis = new TindakanMedis
					this.basicTimer.stop()
					this.basicTimer.reset()
					this.ShowTabPane(1)
				})
			}, err => {
				this.isLoadingButton = false
				this.errorMessage = err
			})
	}
	getJadwalSesi() {
		this.jadwalSesiService.getJadwalSesi()
			.subscribe(res => {
				this.jadwalSesi = res.response.nama_sesi
			})
	}
	truncateString(str, n) {
		return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
	}
	reLoadData() {
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
	ubahTanggal(tgl: string) {
		if (tgl == null || tgl == "") {
			return ""
		} else {
			return moment(new Date(tgl)).locale('id').format('DD-MMM-YYYY, HH:mm')
		}
	}
	showDataTables() {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			select: true,
			order: [],
			ajax: (dataTablesParameters: any, callback: any) => {
				Object.assign(dataTablesParameters, { type_poli: this.typePoli })
				this.tindakanMedisService.getDataTables(dataTablesParameters)
					.subscribe((resp: any) => {
						if(resp.metaData.response_code=='0000')
						{
							callback({
								draw: resp.response.draw,
								recordsTotal: resp.response.recordsTotal,
								recordsFiltered: resp.response.recordsFiltered,
								data: resp.response.data
							})
						}else{
							callback({
								draw: 1,
								recordsTotal: 1,
								recordsFiltered: 1,
								data:[]
							})
						}
					})
			},
			columns: [
				{
					orderable: false,
					searchable: false,
					render(data: any, type: any, row: any, full: any) {
						return full.row + 1 + full.settings._iDisplayStart;
					}
				}, {
					data: 'tgl_antrian',
					render(data: any, type: any, row: any, full: any) {
						return moment(new Date(data)).locale('id').format('DD MMMM YYYY, HH:mm')
					}
				}, {
					data: 'nama',
					render(data: any, type: any, row: any, full: any) {
						return row.nama_panggilan + ' ' + data
					}
				},
			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				// Unbind first in order to avoid any duplicate handler
				// (see https://github.com/l-lin/angular-datatables/issues/87)
				// Note: In newer jQuery v3 versions, `unbind` and `bind` are
				// deprecated in favor of `off` and `on`
				$('td ', row).on('click', () => {
					self.selectedData(data);
				});
				return row;
			}
		}
	}

	ShowTabPane(nomor: number) {
		if (nomor == 1) {
			this.tabPane.pane1 = true
			this.tabPane.pane2 = false
			this.tabPane.pane3 = false
		} else if (nomor == 2) {
			if (this.pasien.id_antrian === undefined) {
				alert('pasien belum di pilih')
			} else {
				this.tabPane.pane1 = false
				this.tabPane.pane2 = true
				this.tabPane.pane3 = false
			}
		} else {
			if (this.pasien.id_antrian === undefined) {
				alert('pasien belum di pilih')
			} else {
				this.tabPane.pane1 = false
				this.tabPane.pane2 = false
				this.tabPane.pane3 = true
			}
		}
	}

}
