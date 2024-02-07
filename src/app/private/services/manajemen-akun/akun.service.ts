import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/private/services/general.service'
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { Constant } from 'src/app/config/constant'

@Injectable({
	providedIn: 'root'
})
export class AkunService {

	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
	}
	URL_MODULE: any

	showDataTable(param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/akun/get-datatables'
		return this.http.post<ResponseApi>(url, param)
	}
	insert(param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/akun'
		return this.http.post<ResponseApi>(url, param)
	}
	update(id: string, param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/akun/' + id
		return this.http.put<ResponseApi>(url, param)
	}

	delete(id: string, status: number): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/akun/set-aktif-nonaktif/' + id
		return this.http.put<ResponseApi>(url, { status_akun: status })
	}

	show(id: string): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/akun/get-byid/' + id
		return this.http.get<ResponseApi>(url)
	}
	getSelectOption(param: any, type: string): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/akun/get-select-option-klinik?data=' + type
		return this.http.post<ResponseApi>(url, param)
	}

	prosesSelectAkun(param: ParamSelectOption, action: string, type: string): Observable<ResponseApi> {
		return this.getSelectOption(param, type)
	}
	/**
	paramOption(param : ParamSelectOption, action :string) : ParamSelectOption {
	  if (action == 'open') {
		param.search = ""
		param.get_data = 10
	  } else if (action == 'last_page') {
		param.get_data = param.get_data + 10
	  } else if (action == 'search') {
		param.get_data = 10
	  }
	  return param
	}
	 */
}

export interface ParamSelectOption {
	search: string | null | undefined
	last_data: 0 | number
	get_data: 10 | number
}
