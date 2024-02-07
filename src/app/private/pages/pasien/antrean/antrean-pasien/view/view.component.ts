import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataTableDirective } from 'angular-datatables'
import { AntreanPasienService } from 'src/app/private/services/pasien/antrean-pasien.service';
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";
import { Router } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  @ViewChild('id_select_poliklinik') id_select_poliklinik : ElementRef
  listPoliklinik : Array<any> = []
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private antreanPasienService : AntreanPasienService,
    private daftarPoliklinikService : DaftarPoliklinikService,
    private spinner : NgxSpinnerService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    this.btnAdd=this.btnDelete=this.btnEdit=item.findIndex((val)=>val.kode=='AMATAP2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='AMATAP1')!=-1?true:false
    this.spinner.show('spinner1')
    if(!this.view){
        Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
          window.location.href='/'
        })
    }
    this.dtOptions = this.showDataTables(this.btnDelete)
    this.loadListPoliklinik()
    setTimeout(() => {
      this.spinner.hide('spinner1')
    }, 600);
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
  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }
  hapusAntrian(data : any) {
    Swal.fire({
      title: 'Apakah anda yakin akan menghapus antrean ini ?',
      icon: 'warning',
      showCancelButton: true,
      allowOutsideClick: false,
      confirmButtonText: 'Ya, hapus saja!',
      cancelButtonText: 'Tidak, Batalkan'
    }).then((result) => {
      if(result.value) {
        this.spinner.show('spinner1')
        this.antreanPasienService.delete(data.id_antrian)
        .subscribe(succ => {
          this.reLoadData()
          this.spinner.hide('spinner1')
        })
      }
    })
  }
  showDataTables(del) {
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [[0, 'ASC']],
      ajax : (dataTablesParameters: any, callback: any) => {
        Object.assign(dataTablesParameters, {
          id_poliklinik : this.id_select_poliklinik.nativeElement.value
        })
        this.antreanPasienService.getDataTables(dataTablesParameters)
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
          data : 'no_antrian'
        },{
          data : 'nama'
        },{
          data: 'nama_sesi'
        },{
          data: 'proses_antrian'
        },{
          data: 'status_input_pasien',
          render(data: any, type: any, row: any, full: any) {
            if (data == 'B') {
              return 'Baru'
            } else {
              return 'Lama'
            }
          }
        },
        {data:'nama_poliklinik'},
        {
          data: 'tgl_antrian'
        }, {
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return del&&row.proses_antrian!='sudah'?`<div style="white-space: nowrap;">
                    <button class="btn btn-link circle-primary text-ui-primary hapus-antrian"><i class="far fa-trash-alt"></i></button>
                  <div>`:del&&row.proses_antrian=='sudah'?`<div style="white-space: nowrap;">
                  <button class="btn btn-link circle-primary text-ui-primary hapus-antrian" disabled><i class="far fa-trash-alt"></i></button>
                <div>`:'';
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .hapus-antrian', row).on('click', () => {
          self.hapusAntrian(data);
        });
        $('td .odontogram', row).on('click', () => {
          self.goOdontogram(data);
        });
        return row
      }
    }
  }

  goOdontogram(data){
    this.router.navigate(['pasien/antrean/antrean-pasien/odontogram/1'])
  }
}
