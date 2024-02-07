import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulReturPbfService {

	urlModule: string
	urlBase: string = 'gudang-retur'
	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.urlModule = this.generalService.getUrlModule(Constant.url_module.gudangTransaksi)
	}

	show(id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-byid/' + id
		return this.http.get<ResponseApi>(url)
	}
	
	getById(id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-riwayat-byid-pembelian/' + id
		return this.http.get<ResponseApi>(url)
	}
	selectOption(payload:any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-select-option-retur'
		return this.http.post<ResponseApi>(url,payload)
	}
	
	listDatatables(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-datatables'
		return this.http.post<ResponseApi>(url, payload)
	}
	add(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/create-retur'
		return this.http.post<ResponseApi>(url, payload)
	}
	addResep(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/create-from-resep-dokter'
		return this.http.post<ResponseApi>(url, payload)
	}
	update(id: string, payload: any) {
		const url = this.urlModule + '/' + this.urlBase + '/update-retur/' + id
		return this.http.put<ResponseApi>(url, payload)
	}
	delete(id: string) {
		const url = this.urlModule + '/' + this.urlBase + '/delete/' + id
		return this.http.delete<ResponseApi>(url)
	}
	// // obat
	// addObat(payload: any, id: string): Observable<ResponseApi> {
	//     const url = this.urlModule + '/' + this.urlBase + '/add-obat-transaksi/' + id
	//     return this.http.post<ResponseApi>(url, payload)
	// }
	// updateObat(payload: any, id: string): Observable<ResponseApi> {
	//     const url = this.urlModule + '/' + this.urlBase + '/update-obat-transaksi/' + id
	//     return this.http.put<ResponseApi>(url, payload)
	// }
	// deleteObat(id: string) {
	//     const url = this.urlModule + '/' + this.urlBase + '/delete-obat-transaksi/' + id
	//     return this.http.delete<ResponseApi>(url)
	// }
	// // alat
	// addAlat(payload: any, id: string): Observable<ResponseApi> {
	//     const url = this.urlModule + '/' + this.urlBase + '/add-alat-kesehatan-transaksi/' + id
	//     return this.http.post<ResponseApi>(url, payload)
	// }
	// updateAlat(payload: any, id: string): Observable<ResponseApi> {
	//     const url = this.urlModule + '/' + this.urlBase + '/update-alat-kesehatan-transaksi/' + id
	//     return this.http.put<ResponseApi>(url, payload)
	// }
	// deleteAlat(id: string) {
	//     const url = this.urlModule + '/' + this.urlBase + '/delete-alat-kesehatan-transaksi/' + id
	//     return this.http.delete<ResponseApi>(url)
	// }
}
