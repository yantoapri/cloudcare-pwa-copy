import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulMarginService {

    urlModule: string
    urlBase: string = 'laba-margin'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getObatProfit(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat/profit'
        return this.http.post<ResponseApi>(url,payload)
    }
    getObatMargin(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat/margin'
        return this.http.post<ResponseApi>(url,payload)
    }
    getObatRekap(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat/rekap'
        return this.http.post<ResponseApi>(url,payload)
    }
    getAlatProfit(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/alat/profit'
        return this.http.post<ResponseApi>(url, payload)
    }
    getAlatRekap(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/alat/rekap'
        return this.http.post<ResponseApi>(url,payload)
    }
    getAlatMargin(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/alat/margin'
        return this.http.post<ResponseApi>(url,payload)
    }

}
