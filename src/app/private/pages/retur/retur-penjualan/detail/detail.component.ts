import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Params } from '@angular/router';
import { ModulReturService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-retur-penjualan';
import * as fromApp from 'src/app/private/states/private-app.states'
import { returPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/retur-penjualan-payload';
import { NgxSpinnerService } from "ngx-spinner";


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
  dataBarang: returPayload = new returPayload
  constructor(
    private modalService: ModalService,
    private spinner : NgxSpinnerService,
    private ModulReturService: ModulReturService,
    private activatedRoute: ActivatedRoute,
    private store: Store<fromApp.PrivateAppState>,
  ) {
    this.getState = this.store.select('retur')
  }
  total_obat=0
  total_alat=0
  detailRetur:any=[]
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params : Params) => {
      if(params) {
        this.spinner.show('spinner1')
        this.ModulReturService.show(params.id)
        .subscribe((resp: any) => {
          this.setDetail(resp.response)
        })
        setTimeout(() => {
          this.spinner.hide('spinner1')
        }, 600);
      }
    })
  }
  setDetail(data){
    setTimeout(() => {
      this.detailRetur=data
    data.retur_obat.map(val=>{
      this.total_obat+=parseInt(val.total_harga)
    })
    data.retur_alat_kesehatan.map(val=>{
      this.total_alat+=parseInt(val.total_harga)
    })
    }, 300);
  }
  ngOnDestroy(): void {
    document.body.classList.remove('jw-modal-open');
  }

  btnOpenModal() {
    this.modalService.open("modalFormContent");
  }

}
