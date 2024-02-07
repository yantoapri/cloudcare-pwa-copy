import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/_modal';
// import { DataTableDirective } from 'angular-datatables'
import { Observable } from 'rxjs';
import { ModulResepService } from 'src/app/private/modul-api/modul-gudang-transaksi/modul-resep.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
// import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/private/states/private-app.states'
// import * as ResepAction from 'src/app/private/states/resep/resep.action'
@Component({
	selector: 'app-detail',
	templateUrl: './detail.component.html',
	styleUrls: ['./detail.component.sass']
})
export class DetailComponent implements OnInit {

	reloadTable: boolean
	getState: Observable<any>;
	dataResep: any
	constructor(
		private ModalService: ModalService,
		private ModulResepService: ModulResepService,
		// private router: Router,
		private activatedRoute: ActivatedRoute,
		private store: Store<fromApp.PrivateAppState>,) {
		this.getState = this.store.select('resep')
	}
	dataDetail: any
	total = 0
	base_url = window.location.origin
	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params: Params) => {
			if (params) {
				this.ModulResepService.show(params.id)
					.subscribe((resp: any) => {
						if (resp.metaData.response_code == "0000") {
							this.dataDetail = resp.response
						}
					})
			}
		})

	}
	prosesEresep() {
		Swal.fire({
			html: "<p class='text-center'><img src='/assets/images/cetak.png' class='img img-resposive'/><br><h4><b>Cetak E-resep?</b</h4></p>",
			showCancelButton: true,
			allowOutsideClick: false,
			confirmButtonText: 'Cetak',
			cancelButtonText: 'Tidak'
		}).then((result) => {
			if (result.isConfirmed) {
				var html = $("#modalEresep").html()
				var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
				winPrint.document.write("<link href='/styles.scss'/>" + html);
				winPrint.document.close();
				winPrint.focus();
				winPrint.print();
				winPrint.close();
			}
		})
	}
	modalClose() {
		this.ModalService.close("modalFormContent")
	}
	modalOpen() {
		this.ModalService.open("modalFormContent")
	}

}
