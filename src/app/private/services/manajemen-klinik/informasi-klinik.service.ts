import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'

@Injectable({
  providedIn: 'root'
})
export class InformasiKlinikService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }

  URL_MODULE : string
  urlBaseName : string = 'data-klinik'

  update(param : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/update-klinik'
    return this.http.put<ResponseApi>(url, param)
  }
  getTimeZone() : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-time-zone'
    return this.http.get<ResponseApi>(url)
  }
  show() : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-forupdate-klinik'
    return this.http.get<ResponseApi>(url)
  }
  getById(id:any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-byid/'+id
    return this.http.get<ResponseApi>(url)
  }

}
