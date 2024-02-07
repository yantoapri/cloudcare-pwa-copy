import { Component, OnInit } from '@angular/core';
import { InformasiKlinikService } from 'src/app/private/services/manajemen-klinik/informasi-klinik.service';
import { ActivatedRoute, Params} from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NgxSpinnerService } from "ngx-spinner";
@Component({
	selector: 'app-view',
	templateUrl: './view.component.html',
	styleUrls: ['./view.component.sass']
})
export class ViewComponent implements OnInit {

	infoKlinik: any
	id=null
	constructor(
		private informasiKlinikService: InformasiKlinikService,
		private activatedRoute: ActivatedRoute,
		private spinner : NgxSpinnerService,
	) { }
	btnDetail=false
	btnDelete=false
	btnEdit=false
	btnAdd=false
	view=false
	ngOnInit(): void {
		let item=JSON.parse(localStorage.getItem('currentUser'))
		item=item.menu_right
		this.btnEdit=item.findIndex((val)=>val.kode=='MGMKDK3')!=-1?true:false
		this.view=item.findIndex((val)=>val.kode=='MGMKDK1')!=-1?true:false
		if(!this.view){
			Swal.fire("Warning","Anda tidak mempunyai akses halaman ini",'warning').then(()=>{
			  window.location.href='/'
			})
		  }
		this.activatedRoute.params.subscribe((params: Params) => {
			if(params.id!=undefined){
				this.id=params.id
				this.getByID(params.id)
			}else{
				this.loadInfo()
			}
		})
	}

	loadInfo() {
		this.spinner.show('spinner1')
		this.informasiKlinikService.show()
			.subscribe(res => {
				this.infoKlinik = res.response
				this.id=this.infoKlinik.id_klinik
				this.spinner.hide('spinner1')
			})
	}
	getByID(id){
		this.spinner.show('spinner1')
		this.informasiKlinikService.getById(id)
			.subscribe(res => {
				this.infoKlinik = res.response
				this.spinner.hide('spinner1')
			})
	}

}
