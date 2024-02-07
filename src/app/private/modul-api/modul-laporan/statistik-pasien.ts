import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulStatistikPasienService {

    urlModule: string
    urlBase: string = 'statistik'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getPendaftaranPasien(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/pendaftaran-pasien'
        return this.http.post<ResponseApi>(url, payload)
    }
    getKunjunganPasien(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/kunjungan-pasien'
        return this.http.post<ResponseApi>(url, payload)
    }
    getlistObat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/list-obat-terbanyak-dipakai'
        return this.http.post<ResponseApi>(url, payload)
    }
    getlistPasien(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/list-pasien'
        return this.http.post<ResponseApi>(url, payload)
    }
    getRekap(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/rekap'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatKeluar(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat-keluar'
        return this.http.post<ResponseApi>(url, payload)
    }
    
   
}
