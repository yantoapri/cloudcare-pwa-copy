import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulPemasukanKlinikService {

    urlModule: string
    urlBase: string = 'pemasukan-klinik'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getData(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + ''
        return this.http.post<ResponseApi>(url, payload)
    }
    getDetail(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/detail'
        return this.http.post<ResponseApi>(url, payload)
    }
}
