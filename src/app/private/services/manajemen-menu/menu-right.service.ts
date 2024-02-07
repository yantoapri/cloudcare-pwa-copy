import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'

@Injectable({
  providedIn: 'root'
})
export class MenuRightService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }

  URL_MODULE : string

  getDataTables (param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu-right/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }
  insert(param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu-right'
    return this.http.post<ResponseApi>(url, param)
  }
  update(id : any, param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu-right/' + id
    return this.http.put<ResponseApi>(url, param)
  }
  delete(id : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu-right/' + id
    return this.http.delete<ResponseApi>(url)
  }
  show(id : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu-right/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }
}
