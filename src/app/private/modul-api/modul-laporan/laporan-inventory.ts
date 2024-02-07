import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulInventoryService {

    urlModule: string
    urlBase: string = 'inventory'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getStokObat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/stok-obat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getStokAlat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/stok-alat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getEdObat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getEdAlat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatBlmTerjual(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-belum-terjual'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatBlmTerjual(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-belum-terjual'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatTdkTerjual(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-tidak-pernah-dijual'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatTdkTerjual(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-tidak-pernah-dijual'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatInvetory(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-inventor-tertinggi'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatInvetory(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-inventor-tertinggi'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatTerlaris(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-terlaris'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatTerlaris(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-terlaris'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatPembelian(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-pembelian-terbanyak'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatPembelian(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-pembelian-terbanyak'
        return this.http.post<ResponseApi>(url, payload)
    }
}
