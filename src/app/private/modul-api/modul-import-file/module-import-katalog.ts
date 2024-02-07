import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulImportKatalogService {

	urlModule: string
	urlBase: string = 'katalog-barang'
	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulImportFile)
	}

	importObat(param: any): Observable<ResponseApi> {
		let data: FormData = new FormData()
		data.append('file', param)

		const url = this.urlModule + '/' + this.urlBase + '/obat'
		return this.http.post<ResponseApi>(url, data, {
			reportProgress: true,
			responseType: 'json',

		})
	}

	importAlat(param: any): Observable<ResponseApi> {
		let data: FormData = new FormData()
		data.append('file', param)

		const url = this.urlModule + '/' + this.urlBase + '/alat-kesehatan'
		return this.http.post<ResponseApi>(url, data, {
			reportProgress: true,
			responseType: 'json',

		})
	}


}
