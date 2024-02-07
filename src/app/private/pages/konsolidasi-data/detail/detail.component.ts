import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulKonsolidasiDataService } from 'src/app/private/modul-api/modul-rekam-medis/modul-konsolidasi-data.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
// import { Store } from '@ngrx/store';
// import * as fromApp from 'src/app/private/states/private-app.states'
@Component({
	selector: 'app-view',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {
	fromMerge = []
	@ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective
	dtOptions: DataTables.Settings = {};
	reloadTable: boolean
	getState: Observable<any>;
	dataDetail = null
	constructor(
		private router: Router,
		private modalService: ModalService,
		private modulKonsolidasi: ModulKonsolidasiDataService,
		// private store: Store<fromApp.PrivateAppState>,
		private activatedRoute: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.modulKonsolidasi.show(params.id)
					.subscribe((resp: any) => {
						if (resp.metaData.response_code == "0000") {
							console.log(resp.response)
							this.dataDetail = resp.response
						}else{
							Swal.fire("Error",resp.metaData.message,'error').then(()=>{
								this.router.navigate(['konsolidasi-data', 'riwayat'])
							})
						}
					})

			}
		})
	}

	tglConvert(data) {
		let tgl = new Date(data)
		let m = (tgl.getMonth() + 1 > 10) ? tgl.getMonth() + 1 : "0" + (tgl.getMonth() + 1)
		let d = (tgl.getDate() > 10) ? tgl.getDate() : "0" + tgl.getDate()
		return d + "/" + m + "/" + tgl.getFullYear()
	}


	modalClose() {
		this.modalService.close("modalFormContent")
	}
	modalOpen() {
		this.modalService.open("modalFormContent")
	}
}
