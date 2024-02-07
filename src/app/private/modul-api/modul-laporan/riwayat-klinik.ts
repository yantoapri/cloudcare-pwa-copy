
import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulRiwayatKlinikService {

    urlModule: string
    urlBase: string = 'riwayat-klinik'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getDatatables(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/list-resep-obat'
        return this.http.post<ResponseApi>(url, payload)
    }
    getByID(id:any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/get-byid-resep-obat/'+id
        return this.http.get<ResponseApi>(url)
    }
}
