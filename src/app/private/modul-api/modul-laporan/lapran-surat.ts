
import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulSuratService {

    urlModule: string
    urlBase: string = 'laporan-surat'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getSuratSehat(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/list-surat-sehat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getSuratSakit(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/list-surat-sakit'
        return this.http.post<ResponseApi>(url, payload)
    }
    getSuratRujukan(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/list-surat-rujukan'
        return this.http.post<ResponseApi>(url, payload)
    }
    getSuratDiagnosa(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/list-surat-diagnosis'
        return this.http.post<ResponseApi>(url, payload)
    }
}
