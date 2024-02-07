import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulDasboardService {

    urlModule: string
    // urlBase: string = 'kunjungan-pasien'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getAdminKlinik(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/admin-klinik'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAdminPoliUmum(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/admin-poli-umum'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAdminFarmasi(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/admin-farmasi'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAdminGudang(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/admin-gudang'
        return this.http.post<ResponseApi>(url, payload)
    }
    getResepsionis(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/resepsionis'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPerawat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/perawat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getDokter(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/dokter-umum'
        return this.http.post<ResponseApi>(url, payload)
    }
    getFarmasi(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/farmasi'
        return this.http.post<ResponseApi>(url, payload)
    }
    getGudang(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/dashboard/gudang'
        return this.http.post<ResponseApi>(url, payload)
    }
}
