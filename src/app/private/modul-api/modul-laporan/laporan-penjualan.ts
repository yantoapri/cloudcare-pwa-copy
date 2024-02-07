import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulPenjualanService {

    urlModule: string
    urlBase: string = 'penjualan-omset'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getPenjualanOmset(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPenjualanAlatOmset(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-ak'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPenjualanHarian(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-harian'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPenjualanHarianAlat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-harian-ak'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPenjualanObat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-obat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPenjualanAlat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-alat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPenjualanGrafik(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/grafik-penjualan'
        return this.http.post<ResponseApi>(url, payload)
    }
    getPenjualanGrafikAlat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/grafik-penjualan-ak'
        return this.http.post<ResponseApi>(url, payload)
    }
   
}
