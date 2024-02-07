import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulStokOpnameObatService {

	urlModule: string
	urlBase: string = 'stok-opname'
	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.urlModule = this.generalService.getUrlModule(Constant.url_module.gudangTransaksi)
	}

	show(id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-opname-obat/' + id
		return this.http.get<ResponseApi>(url)
	}
	showTinjau(id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-byid-obat/' + id
		return this.http.get<ResponseApi>(url)
	}
	getAll(id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/showall-tinjau-produk-byid-riwayat/' + id
		return this.http.get<ResponseApi>(url)
	}
	listRiwayat(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/list-datatable-riwayat'
		return this.http.post<ResponseApi>(url, payload)
	}
	listDatatables(payload: any, status: string,id:any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-datatable-obat/'+id+"/" + status
		return this.http.post<ResponseApi>(url, payload)
	}
	listTinjau(payload: any, status: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-datatable-tinjau-obat/' + status
		return this.http.post<ResponseApi>(url, payload)
	}
	add(payload: any, id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/add-opname-obat/' + id
		return this.http.post<ResponseApi>(url, payload)
	}

	addTinjau(payload: any, id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/add-tinjau-obat/' + id
		return this.http.post<ResponseApi>(url, payload)
	}

	sesuaikan(payload: any, id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/proses-penyesuaian-stok-obat/' + id
		return this.http.post<ResponseApi>(url, payload)
	}

	start(): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/mulai-stok-opname'
		return this.http.post<ResponseApi>(url, {})
	}
	startTinjau(): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/mulai-tinjau-opname'
		return this.http.post<ResponseApi>(url, {})
	}
	update(id: string, payload: any) {
		const url = this.urlModule + '/' + this.urlBase + '/update-opname-obat/' + id
		return this.http.put<ResponseApi>(url, payload)
	}
	// updateTinjau(id: string, payload: any) {
	// 	const url = this.urlModule + '/' + this.urlBase + '/update-tinjau-obat/' + id
	// 	return this.http.put<ResponseApi>(url, payload)
	// }
	finish(id: string) {
		const url = this.urlModule + '/' + this.urlBase + '/selesai-stok-opname/' + id
		return this.http.put<ResponseApi>(url, {})
	}
	// delete(id: string) {
	//     const url = this.urlModule + '/' + this.urlBase + '/delete/' + id
	//     return this.http.delete<ResponseApi>(url)
	// }
}
