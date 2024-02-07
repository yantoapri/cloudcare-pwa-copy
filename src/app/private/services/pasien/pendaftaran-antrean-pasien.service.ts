import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'

@Injectable({
  providedIn: 'root'
})
export class PendaftaranAntreanPasienService {
  URL_MODULE : string
  // urlBaseName : string = 'pasien'

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.resepsionis)
  }

  getDataTables(param : any) {
    const url = this.URL_MODULE + '/pasien/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }
  insert(param : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/antrian/create'
    return this.http.post<ResponseApi>(url, param)
  }

}
