import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulKonsolidasiDataService {

	urlModule: string
	urlBase: string = 'konsolidasi-data'
	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.urlModule = this.generalService.getUrlModule(Constant.url_module.rekamMedis)
	}

	show(id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-antrian-byid/' + id
		return this.http.get<ResponseApi>(url)
	}
	listDatatables(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/datatable-list-konsolidasi'
		return this.http.post<ResponseApi>(url, payload)
	}
	listDatatablesRiwayat(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/datatable-riwayat-konsolidasi'
		return this.http.post<ResponseApi>(url, payload)
	}
	add(payload: any, id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/merge-antrian/' + id
		return this.http.post<ResponseApi>(url, payload)
	}
	// update(id: string, payload: any) {
	// 	const url = this.urlModule + '/' + this.urlBase + '/update-retur/' + id
	// 	return this.http.put<ResponseApi>(url, payload)
	// }
	// delete(id: string) {
	// 	const url = this.urlModule + '/' + this.urlBase + '/delete/' + id
	// 	return this.http.delete<ResponseApi>(url)
	// }

}
