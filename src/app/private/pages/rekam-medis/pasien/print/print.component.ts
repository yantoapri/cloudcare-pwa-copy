import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import * as moment from 'moment';
import { ModalService } from 'src/app/shared/_modal';
import { ActivatedRoute, Params } from '@angular/router';
import { AntreanDokterUmumService } from 'src/app/private/services/dokter/antrean/antrean-dokter-umum.service';
import {ModulEximRekamMedisService } from 'src/app/private/modul-api/modul-export-import/modul-exim-rekam-medis.service'
import { RekamMedis, Perawat, DokterUmum, Assessment, AkunDokter } from 'src/app/private/models/pages/dokter/umum/rekam-medis';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: 'app-print',
	templateUrl: './print.component.html',
	styleUrls: ['./print.component.sass']
})
export class PrintComponent implements OnInit {

	idPasien: string = ""
	dtOptions: DataTables.Settings = {};
	@ViewChild('input_daterange') input_daterange: ElementRef
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	@ViewChild('bodyTable') bodyTable: ElementRef
	idAntrianSelected: string = ""
	rekamMedis: RekamMedis = new RekamMedis
	hiddenDataTable: boolean = false
	bsRangeValue: Date[]
	constructor(
		private activatedRoute: ActivatedRoute,
		private antreanDokterUmumService: AntreanDokterUmumService,
		private rekamMedisPasienService: ModulEximRekamMedisService,
		private spinner: NgxSpinnerService,
		private modal:ModalService
	) { }

	minDate=new Date()
  	maxDate=new Date()
  	ngOnInit(): void {
    
		var date = new Date(), y = date.getFullYear(), m = date.getMonth();
		this.minDate = new Date(y, m, 1);
		this.maxDate= new Date(y, m + 1, 0);
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.idPasien = params.id
				this.dtOptions = this.showDataTables()
				this.hiddenDataTable = true
			}
		})

		this.bsRangeValue = [new Date(y, m, 1), new Date()]
	
		

	}
	convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
	openExport(){
		this.modal.open("modalFormContent");
	}
	closeModal(){
		this.modal.close("modalFormContent");

	}
	export(){
		this.spinner.show('spinner1')
		let currentUser:any=localStorage.getItem('currentUser')
		currentUser=currentUser!=null?JSON.parse(currentUser):null
		let param={
			"Authorization": currentUser.token,
			"x_api_key": currentUser.key,
			date_from:0,
			date_to:0
		}
			param.date_from=this.convertTime(this.bsRangeValue[0])
			param.date_to=this.convertTime(this.bsRangeValue[1])
			this.rekamMedisPasienService.exportRM(param,this.idPasien)
				.subscribe((resp: any) => {
					this.spinner.hide('spinner1')
				this.download(resp,`REKAM MEDIS.pdf`)
				this.closeModal()
			})
		
	}
	download(resp,file){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', file);
		document.body.appendChild(link);
		link.click();
	}
	selectedData(data: any) {
		setTimeout(() => {
			if (this.bodyTable.nativeElement.querySelector('.selected')) {
				if (this.idAntrianSelected != data.id_antrian) {
					this.spinner.show('spinner1');
					this.antreanDokterUmumService.getRekamMedisByIdAntrian(data.id_antrian)
						.subscribe(res => {
							this.rekamMedis = new RekamMedis
							this.spinner.hide('spinner1');
							if (res.response.dokter_umum !== null) {
								let umum = res.response.dokter_umum
								this.rekamMedis.dokter_umum = new DokterUmum
								this.rekamMedis.dokter_umum.assessment = new Array<Assessment>()
								this.rekamMedis.dokter_umum.akun_dokter = new AkunDokter
								this.rekamMedis.dokter_umum = umum
							}
							if (res.response.perawat !== null) {
								let perawat = res.response.perawat
								this.rekamMedis.perawat = new Perawat
								this.rekamMedis.perawat = perawat
							}
						}, (err: any) => {
							this.spinner.hide('spinner1');
						})
				}
			}
		}, 50);
	}

	showDataTables() {
		return {
			pageLength: 10,
			serverSide: true,
			processing: true,
			searching: false,
			order: [],
			select: true,
			ajax: (dataTablesParameters: any, callback: any) => {
				// Object.assign(dataTablesParameters, { type_poli : 'umum' })
				this.antreanDokterUmumService.getDataTablesRekamMedis(dataTablesParameters, this.idPasien)
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
					data: 'tgl_antrian',
					render(data: any, type: any, row: any, full: any) {
						return moment(data).locale('id').format('DD-MMM-YYYY, HH:mm')
					}
				},
				{
					data: 'nama_lengkap'
				},

			],
			rowCallback: (row: Node, data: any[] | Object, index: number) => {
				const self = this;
				$('td ', row).on('click', () => {
					self.selectedData(data);
				});
				return row;
			}
		}
	}


}
