import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'
@Injectable({
  providedIn: 'root'
})
export class DaftarPoliklinikService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }
  URL_MODULE : string
  urlBaseName : string = 'data-poliklinik'

  getDataTables(param : any) : Observable<any> {
    const url = this.URL_MODULE + '/data-poliklinik/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }
  getByAkunKlinik() : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-byakun-klinik'
    return this.http.get<ResponseApi>(url)
  }
  insert(param : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName
    return this.http.post<ResponseApi>(url, param)
  }
  update(id: any, param : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/' + id
    return this.http.put<ResponseApi>(url, param)
  }
  show(id: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }
  delete(id: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/' + id
    return this.http.delete<ResponseApi>(url)
  }
  updateKlinik(id: any, param : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/update-klinik/' + id
    return this.http.put<ResponseApi>(url, param)
  }
  getPoliklinik(id: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-forupdate-poliklinik/' + id
    return this.http.get<ResponseApi>(url)
  }
}
