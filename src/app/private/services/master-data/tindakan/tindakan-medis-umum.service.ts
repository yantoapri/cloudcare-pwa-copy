import { Injectable } from '@angular/core';
import { GeneralService } from '../../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'

@Injectable({
	providedIn: 'root'
})
export class TindakanMedisUmumService {

	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.master)
		// this.URL_MODULE = this.getUrlModule(Constant.url_module.master)
	}
	URL_MODULE: string
	urlBaseName: string = 'tindakan-medis'

	getDataTables(param: any) {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-datatables'
		return this.http.post<ResponseApi>(url, param)
	}
	getAll() {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-all'
		return this.http.get<ResponseApi>(url)
	}
	insert(param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/create'
		return this.http.post<ResponseApi>(url, param)
	}
	update(id: any, param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/update/' + id
		return this.http.put<ResponseApi>(url, param)
	}
	show(id: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-byid/' + id
		return this.http.get<ResponseApi>(url)
	}

	delete(id: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/delete/' + id
		return this.http.delete<ResponseApi>(url)
	}

	getSelectOption(param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-select-option'
		return this.http.post<ResponseApi>(url, param)
	}

	prosesSelectOption(param: ParamSelectOption, action: string) {
		let params = this.paramOption(param, action)
		return this.getSelectOption(params)
	}

	paramOption(param: ParamSelectOption, action: string): ParamSelectOption {
		return param
	}

}

export interface ParamSelectOption {
	search: string | null | undefined
	last_data: 0 | number
	get_data: 10 | number
}

