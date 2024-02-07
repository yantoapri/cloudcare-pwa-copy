import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'


@Injectable({
	providedIn: 'root'
})
export class JadwalStafService {

	URL_MODULE: string
	urlBaseName: string = 'jadwal-staff'

	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.master)
	}

	getDataTables(param: any) {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-datatables'
		return this.http.post<ResponseApi>(url, param)
	}
	getCalender(tahun: any, bulan: any) {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-kalender?tahun=' + tahun + '&bulan=' + bulan
		return this.http.get<ResponseApi>(url)
	}
	insert(param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName
		return this.http.post<ResponseApi>(url, param)
	}

	addGenerate(param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '-generate'
		return this.http.post<ResponseApi>(url, param)
	}

	update(id: any, param: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/' + id
		return this.http.put<ResponseApi>(url, param)
	}

	show(id: any): Observable<ResponseApi> {
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-byid/' + id
		return this.http.get<ResponseApi>(url)
	}

	delete(id: any, param: any): Observable<ResponseApi> {
		const options = {
			headers: {
				'Content-Type': 'application/json',
			},
			body: param,
		};
		const url = this.URL_MODULE + '/' + this.urlBaseName + '/' + id
		return this.http.delete<ResponseApi>(url, options)
	}

}
