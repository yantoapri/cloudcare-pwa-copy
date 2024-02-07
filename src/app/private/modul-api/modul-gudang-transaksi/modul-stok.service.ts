import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulStokService {

	urlModule: string
	urlBase: string = 'stok-obat'
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

	getRiwayat(id: string,payload:any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-riwayat-stok/' + id
		return this.http.post<ResponseApi>(url,payload)
	}
	listDatatables(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-datatables'
		return this.http.post<ResponseApi>(url, payload)
	}
	add(payload: any): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/create'
		return this.http.post<ResponseApi>(url, payload)
	}
	update(id: string, payload: any) {
		const url = this.urlModule + '/' + this.urlBase + '/update/' + id
		return this.http.put<ResponseApi>(url, payload)
	}
	delete(id: string) {
		const url = this.urlModule + '/' + this.urlBase + '/delete/' + id
		return this.http.delete<ResponseApi>(url)
	}
	getRiwayatBatch(id:string,payload:any){
		const url = this.urlModule + '/' + this.urlBase + '/get-riwayat-batch/'+id
		return this.http.post<ResponseApi>(url,payload)
	}
	getBatch(payload:any){
		const url = this.urlModule + '/' + this.urlBase + '/get-batch'
		return this.http.post<ResponseApi>(url,payload)
	}
	getBatchStockOpname(payload:any){
		const url = this.urlModule + '/' + this.urlBase + '/get-batch-stok-opname'
		return this.http.post<ResponseApi>(url,payload)
	}
	getSelectBatch(id:any,payload:any){
		const url = this.urlModule + '/' + this.urlBase + '/get-select-option-batch/'+id
		return this.http.post<ResponseApi>(url,payload)
	}
	getSelectBatchStockOpname(id:any,payload:any){
		const url = this.urlModule + '/' + this.urlBase + '/get-select-option-batch-stock-opname/'+id
		return this.http.post<ResponseApi>(url,payload)
	}
}
