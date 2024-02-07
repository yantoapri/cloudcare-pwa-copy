import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulDefektaAlatService {

    urlModule: string
    urlBase: string = 'defekta-alat-kesehatan'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.gudangTransaksi)
    }

    show(id: string): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/get-byid/' + id
        return this.http.get<ResponseApi>(url)
    }
    listDatatables(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/get-datatables'
        return this.http.post<ResponseApi>(url, payload)
    }
    add(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/create'
        return this.http.post<ResponseApi>(url, payload)
    }
    update(payload: any) {
        const url = this.urlModule + '/' + this.urlBase + '/update-belum-order'
        return this.http.put<ResponseApi>(url, payload)
    }
    delete(id: string) {
        const url = this.urlModule + '/' + this.urlBase + '/delete/' + id
        return this.http.delete<ResponseApi>(url)
    }
}
