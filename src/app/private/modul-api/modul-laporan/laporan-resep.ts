
import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulResepService {

    urlModule: string
    urlBase: string = 'resep'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getDatatables(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/datatable'
        return this.http.post<ResponseApi>(url, payload)
    }
    getTotal(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/total'
        return this.http.post<ResponseApi>(url, payload)
    }
}
