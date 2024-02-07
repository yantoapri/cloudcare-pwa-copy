import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulPembelianService {

    urlModule: string
    urlBase: string = 'laporan-pembelian'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getObatFaktur(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat/faktur'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatTotal(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat/total'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatGrafik(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat/grafik'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatFaktur(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/alat/faktur'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatTotal(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/alat/total'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatGrafik(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/alat/grafik'
        return this.http.post<ResponseApi>(url, payload)
    }
}
