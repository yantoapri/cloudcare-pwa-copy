import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulPengeluaranService {

    urlModule: string
    urlBase: string = 'pengeluaran'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getObat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat'
        return this.http.post<ResponseApi>(url,payload)
    }
    getAlat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/alat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getObatDetail(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/detail-obat'
        return this.http.post<ResponseApi>(url,payload)
    }
    getAlatDetail(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/detail-alat'
        return this.http.post<ResponseApi>(url, payload)
    }
}
