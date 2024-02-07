import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { AntreanDokterUmumService } from 'src/app/private/services/dokter/antrean/antrean-dokter-umum.service';
import * as moment from 'moment';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-riwayat-periksa',
  templateUrl: './riwayat-periksa.component.html',
  styleUrls: ['./riwayat-periksa.component.sass']
})
export class RiwayatPeriksaComponent implements OnInit {

  @ViewChild('bodyTable') bodyTable : ElementRef
  @Input() PasienProperty : string
  @Input() open : boolean
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  hiddenDataTable: boolean = false
  idPasien: string = ""
  idPasienDump : string = ""
  idAntrianSelected : string = ""
  constructor(
    private antreanDokterUmumService : AntreanDokterUmumService
  ) { }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.open){
      let cekValue = this.PasienProperty
      if(cekValue !== undefined) {
        let pasien =  JSON.parse(cekValue)
        this.idPasien = pasien.id_pasien
      }
      if(this.idPasienDump == "") {
        if(this.idPasien != "" && this.idPasien != undefined) {
          this.hiddenDataTable = true
          this.dtOptions = this.showDataTables()
          this.idPasienDump = this.idPasien
        }
      } else if (this.idPasienDump != "" ) {
        this.reLoadData()
      }
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
      select: true,
      ajax : (dataTablesParameters: any, callback: any) => {
        // Object.assign(dataTablesParameters, { type_poli : 'umum' })
        this.antreanDokterUmumService.getDataTablesListPerawat(dataTablesParameters, this.idPasien )
        .subscribe((resp : any) => {
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
          orderable: false,
          data: 'tgl_antrian_unix',
          render(data: any, type: any, row: any, full: any) {
            return moment(new Date(data)).format('DD-MMM-YYYY, HH:mm')
          }
        },{
          orderable: false,
          data: 'alergi'
        },{
          orderable: false,
          data: 'hambatan'
        },{
          orderable: false,
          data:'keluhan'
        },{
          orderable: false,
          data: 'sistole'
        }, {
          orderable: false,
          data: 'diastole'
        },{
          orderable: false,
          data: 'hr'
        }, {
          orderable: false,
          data: 'r'
        }, {
          orderable: false,
          data: 'tb'
        },{
          orderable: false,
          data: 'bb'
        }
      ]
    }
  }

}
