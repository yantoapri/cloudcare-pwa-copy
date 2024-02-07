import { Component, OnInit,ViewChild } from '@angular/core';
import {ModulLaporanService} from 'src/app/private/modul-api/modul-laporan/laporan-kunjungan'
import {ModulLaporanExportService} from 'src/app/private/modul-api/modul-laporan/laporan-kunjungan-export'
import { DataTableDirective } from 'angular-datatables'
import { FormBuilder,Validators} from "@angular/forms";
import * as moment from 'moment';
import { JadwalSesiService } from 'src/app/private/services/master-data/ruang-dan-jadwal/jadwal-sesi.service'
import { DaftarPoliklinikService } from 'src/app/private/services/manajemen-klinik/daftar-poliklinik.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { AESService } from 'src/app/private/services/AES/aes'
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {
  tabPane : any = {
    pane1: true,
    pane2: false,
  }
  
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
  constructor(
    private laporan:ModulLaporanService,
    private auth:AuthService,
    private aes:AESService,
    private laporanExport:ModulLaporanExportService,
    private fb: FormBuilder,
    private spinner:NgxSpinnerService,
    private DaftarPoliklinikService:DaftarPoliklinikService,
    private JadwalSesiService:JadwalSesiService,
  ) { }
  search=false
  formInput: any
  listPoliklinik=[]
  listSesi=[]
  tableShow=true
  paramJadwalSesi = { last_data: 0, get_data: 10, search: "" }
  loadingListJadwalSesi: boolean = false

params:any
currentUser:any=localStorage.getItem('currentUser')
minDate=new Date()
maxDate=new Date()
keyGen:any
idPasien=null
pasienJson:any
pasien:any
isLastSesi=false
ngOnInit(): void {
  this.keyGen=this.aes.getKeyLogin(this.auth.currentUserValue)
  var date = new Date(), y = date.getFullYear(), m = date.getMonth(),d=date.getDate();
		this.maxDate= new Date(y, m, d);
  this.currentUser=this.currentUser!=null?JSON.parse(this.currentUser):null
  this.params={
    "Authorization": this.currentUser.token,
    "x_api_key": this.currentUser.key,
    "search": {
      "value": "",
      "regex": false
    },
    "transaksi_jenis": "masuk",
    "start":"",
    "end":"",
    "expired_in":0
  }
    this.formInput = this.fb.group({
			date_from: [[new Date(y, m, 1), new Date()], [Validators.required]],
      jenis_pasien: ["all", [Validators.required]],
      sesi: ["all", [Validators.required]],
      id_poliklinik: ["all", []],
    })
    this.spinner.show('spinner1')
    this.DaftarPoliklinikService.getByAkunKlinik().subscribe((resp: any) => {
      if(resp.metaData.response_code=="0000"){
        this.listPoliklinik=resp.response
        this.spinner.hide('spinner1')
      }
    })
   
    this.dtOptions=this.showDataTables()
  }
  dekryp(val){
		try{
			return this.aes.decrypt(val,this.keyGen.key,this.keyGen.iv,256)
		}
		catch(err){
			return val
		}
	}
  download(resp){
		const url = window.URL.createObjectURL(new Blob([resp],{type:"application/ms-excel"}));
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', `Laporan Kunjungan Klinik.xlsx`);
		document.body.appendChild(link);
		link.click();
	}
  convertTime(tgl){
		let time= moment(new Date(tgl)).format("YYYY-MM-DD")+' 00:00:00'
		return new Date(time).getTime()
	}
  export(){
    this.spinner.show('spinner1')
    this.search=true
    if(this.formInput.invalid){
      return false
    }
          this.params.date_from=this.convertTime(this.formInput.value.date_from[0])
          this.params.date_to=this.convertTime(this.formInput.value.date_from[1])
          this.params.jenis_pasien=this.formInput.value.jenis_pasien
          this.params.sesi=this.formInput.value.sesi
          this.params.id_poliklinik=this.formInput.value.id_poliklinik
          this.laporanExport.exportKlinik(this.params)
          .subscribe((resp: any) => {
            this.download(resp)
            this.spinner.hide('spinner1')
          },(err) => {
            Swal.fire("Error",err.metaData.message,"error");
          })

  }
  reLoadData() {
    this.DaftarPoliklinikService.getByAkunKlinik().subscribe((resp: any) => {
      if(resp.metaData.response_code=="0000"){
        this.listPoliklinik=resp.response
      }
    })
		this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
			dtInstance.ajax.reload();
		});
	}
  searchAction(){
    this.reLoadData()
  }
  getAge(dateString) {
    var today = new Date();
	let dateDekrip=this.dekryp(dateString)
    var birthDate = new Date(dateDekrip!=''?dateDekrip:dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
	}
  showDataTables() {
    let self=this
    this.spinner.show('spinner1')
      return {
        pageLength: 10,
        serverSide: true,
        processing: true,
        order: [],
        ajax: (dataTablesParameters: any, callback: any) => {
          dataTablesParameters.date_from=new Date(this.convertTime(this.formInput.value.date_from[0])).getTime()
          dataTablesParameters.date_to=new Date(this.convertTime(this.formInput.value.date_from[1])).getTime()
          dataTablesParameters.jenis_pasien=this.formInput.value.jenis_pasien
          dataTablesParameters.sesi=this.formInput.value.sesi
          dataTablesParameters.id_poliklinik=this.formInput.value.id_poliklinik
          this.laporan.getKlinik(dataTablesParameters)
          .subscribe((resp: any) => {
            callback({
              draw: resp.response.draw,
              recordsTotal: resp.response.recordsTotal,
              recordsFiltered: resp.response.recordsFiltered,
              data: resp.response.data
            })
            this.spinner.hide('spinner1')
          },(err) => {
            Swal.fire("Error",err.metaData.message,"error");
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
            data: 'full_rm',
            orderable: false,
          },
          {
            data: 'no_bpjs',
            orderable: false,
          }, {
            data: 'nama',
            orderable: false,
          }, {
            data: 'jenis_kelamin',
            orderable: false,
          }, {
            data: 'tgl_lahir',
            orderable: false,
            render(data: any, type: any, row: any, full: any) {
              return self.getAge(data)
            }
          }, {
            data: 'alamat',
            orderable: false,
            render(data: any, type: any, row: any, full: any) {
              let alamat=self.dekryp(data)
              return alamat!=''?alamat:data
            }
          }, {
            data: 'tgl_kunjungan',
            orderable: false,
            render(data: any, type: any, row: any, full: any) {
              // return moment(data).format("DD-MM-YYYY")
              return moment(data).format("DD-MM-YYYY")
            }
          }
        ],
        rowCallback: (row: Node, data: any[] | Object, index: number) => {
        
          $('td', row).on('click', () => {
            self.selectedData(data);
          });
          return row;
        }
      
      }
    
	}
  selectedData(data: any) {
		setTimeout(() => {
			
				if (this.idPasien != data.id_pasien) {
          this.pasienJson = JSON.stringify(data)
          this.idPasien = data.id_antrian
          this.ShowTabPane(2)
          
				}
        
			
		}, 50);
	}
  truncateString(str, n) {
		return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
	}
  
  ShowTabPane(nomor : number) {
    if (nomor == 1) {
      this.tabPane.pane1 = true
      this.tabPane.pane2 = false
      this.tabPane.pane3 = false
    } else if (nomor == 2) {
      this.tabPane.pane1 = false
      this.tabPane.pane2 = true
      this.tabPane.pane3 = false
    }
  }

  prosesSelectJadwalSesi(event: any, aksi: string) {
		if (aksi == 'search')
		{
			this.paramJadwalSesi.search = event.term
      if(this.paramJadwalSesi.search==""||this.paramJadwalSesi.search.length>=3){
        this.listSesi=[]
        this.paramJadwalSesi.last_data=0
        this.isLastSesi=false
      }else{
        this.isLastSesi=false
      }
			
		}
		if(aksi=="open"||aksi=="clear"){
			this.paramJadwalSesi.search = ""
			this.paramJadwalSesi.last_data=0
      this.listSesi=[]
			this.isLastSesi=false
    }
		if(aksi=="last_page"){
			if(!this.isLastSesi)
			this.paramJadwalSesi.last_data+=10
		}
		
		if(!this.isLastSesi){
		this.loadingListJadwalSesi = true
		this.JadwalSesiService.prosesSelectJadwalSesi(this.paramJadwalSesi, aksi)
			.subscribe(res => {
				this.loadingListJadwalSesi = false
          if(res){
            this.isLastSesi=true
          }else{
            if(res.response.length<10){
              if(aksi=="search")this.listSesi=[]
              res.response.forEach(el => {
                let i=this.listSesi.findIndex(x=>x.id_jadwal_sesi==el.id_jadwal_sesi)
                if(i==-1)
                this.listSesi.push({
                  id_jadwal_sesi: el.id_jadwal_sesi,
                  nama_sesi: el.nama_sesi
                    + ' ('
                    + moment(this.parseTime(el.jam_buka)).format("HH:mm")
                    + ' - '
                    + moment(this.parseTime(el.jam_tutup)).format("HH:mm")
                    + ')'
                })
              });
              this.isLastSesi=true
            }else{
              res.response.forEach(el => {
                let i=this.listSesi.findIndex(x=>x.id_jadwal_sesi==el.id_jadwal_sesi)
                if(i==-1)
                this.listSesi.push({
                  id_jadwal_sesi: el.id_jadwal_sesi,
                  nama_sesi: el.nama_sesi
                    + ' ('
                    + moment(this.parseTime(el.jam_buka)).format("HH:mm")
                    + ' - '
                    + moment(this.parseTime(el.jam_tutup)).format("HH:mm")
                    + ')'
                })
              });
            }
          }
				
			}, err => {
				this.loadingListJadwalSesi = false
			})
    }
	}
  parseTime(t: any) {
		var d = new Date();
		var time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/);
		d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0));
		d.setMinutes(parseInt(time[2]) || 0);
		return d;
	}
}
