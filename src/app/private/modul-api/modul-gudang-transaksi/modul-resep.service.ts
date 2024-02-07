import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulResepService {

	urlModule: string
	urlBase: string = 'resep-obat'
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
	showObat(id: string): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-obat-transaksi/' + id
		return this.http.get<ResponseApi>(url)
	}
	
	listDatatables(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-riwayat-resep-datatables'
		return this.http.post<ResponseApi>(url, payload)
	}
	create(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/sync-create-transaksi'
		return this.http.post<ResponseApi>(url, payload)
	}
	add(id: string, payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/add-obat-transaksi/' + id
		return this.http.post<ResponseApi>(url, payload)
	}
	finish(id: string, payload: any) {
		const url = this.urlModule + '/' + this.urlBase + '/selesai-transaksi/' + id
		return this.http.put<ResponseApi>(url, payload)
	}
	update(id: string, payload: any) {
		const url = this.urlModule + '/' + this.urlBase + '/update-obat-transaksi/' + id
		return this.http.put<ResponseApi>(url, payload)
	}
	delete(id: string) {
		const url = this.urlModule + '/' + this.urlBase + '/delete-obat-transaksi/' + id
		return this.http.delete<ResponseApi>(url)
	}
	cancel(id: string) {
		const url = this.urlModule + '/' + this.urlBase + '/batal-transaksi/' + id
		return this.http.delete<ResponseApi>(url)
	}
}
