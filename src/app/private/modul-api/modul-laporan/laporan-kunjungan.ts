import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulLaporanService {

    urlModule: string
    urlBase: string = 'kunjungan-pasien'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getKlinik(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-klinik'
        return this.http.post<ResponseApi>(url, payload)
    }
    getBulanan(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-bulanan'
        return this.http.post<ResponseApi>(url, payload)
    }
    getBulananDetail(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/data-bulanan-detail'
        return this.http.post<ResponseApi>(url, payload)
    }
    
}
