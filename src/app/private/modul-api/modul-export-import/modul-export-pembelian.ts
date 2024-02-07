import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulExportPembelianService {

	urlModule: string
	urlBase: string = 'export-excel'
	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.urlModule = this.generalService.getUrlModule(Constant.url_module.export)
	}
	exportPembelianObat(): Observable<ResponseApi> {
		let user = JSON.parse(localStorage.getItem('currentUser'))
		let data = new FormData()
		data.append('x_api_key', user.key)
		data.append('Authorization', user.token)
		const url = this.urlModule + '/' + this.urlBase + '/pembelian/obat'
		return this.http.post<any>(url, data)
	}
	getUrlExportObat(): string {
		return this.urlModule + '/' + this.urlBase + '/pembelian/obat'
	}
}
