import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataPasienService } from 'src/app/private/services/pasien/data-pasien.service';
import { DataTableDirective } from 'angular-datatables'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { AESService } from 'src/app/private/services/AES/aes'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, {static: false}) datatableElement : any = DataTableDirective
  @ViewChild('input_no_rm') input_no_rm: ElementRef
  @ViewChild('input_nama') input_nama: ElementRef
  @ViewChild('input_alamat') input_alamat: ElementRef
  @ViewChild('input_no_hp') input_no_hp: ElementRef
  @ViewChild('input_nik') input_nik: ElementRef
  btnDetail=false
  btnDelete=false
  btnEdit=false
  btnSetting=false
  btnAdd=false
  view=false
  constructor(
    private dataPasienService : DataPasienService,
    private router : Router,
    private auth:AuthService,
    private aes:AESService
    // private Swal:Swal
  ) { }
  keyGen:any
  ngOnInit(): void {
    this.keyGen=this.aes.getKeyLogin(this.auth.currentUserValue)
    let item=JSON.parse(localStorage.getItem('currentUser'))
    item=item.menu_right
    // this.btnAdd,this.btnDelete,this.btnEdit=item.findIndex((val)=>val.kode=='MGPJJS2')!=-1?true:false
    this.btnDetail=this.view=item.findIndex((val)=>val.kode=='RMPS01')!=-1?true:false

    // if(!this.view){
    //     Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
    //       window.location.href='/'
    //     })
    // }
    this.dtOptions = this.showDataTables(this.btnDetail)
  }
  dekryp(val){
    try{
        return this.aes.decrypt(val,this.keyGen.key,this.keyGen.iv,256)
    }
    catch(err){
        return val
    }
  }
  detailData(data : any) {
    this.router.navigate(['rekam-medis', 'pasien', 'detail', data.id_pasien])
  }

  reLoadData() {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

  showDataTables(detail) {
    let self=this
    return {
      pageLength: 10,
      serverSide: true,
      processing: true,
      order : [],
      ajax : (dataTablesParameters: any, callback: any) => {
        Object.assign(dataTablesParameters, {
          no_rm : this.input_no_rm.nativeElement.value,
          nama : this.input_nama.nativeElement.value,
          alamat : "",//this.input_alamat.nativeElement.value
          no_hp : "",//this.input_no_hp.nativeElement.value
          nik:"" //this.input_nik.nativeElement.value
        })
        this.dataPasienService.getDataTables(dataTablesParameters)
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
        },{
          data : 'full_rm'
        },{
          data : 'no_bpjs'
        },{
          data : 'nama'
        },{
          data : 'alamat',
          render(data: any, type: any, row: any, full: any) {
            return self.dekryp(data)
          }
          
        },{
          orderable: false,
          searchable: false,
          render(data: any, type: any, row: any, full: any) {
            return detail?`<div style="white-space: nowrap;">
                  <button class="btn btn-link circle-primary text-ui-primary detail-data"><i class="far fa-eye"></i></button>
                  <div>`:''
          }
        }
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        $('td .detail-data', row).on('click', () => {
          self.detailData(data);
        });
      }
    }
  }

}
