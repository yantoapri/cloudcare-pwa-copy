import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }
  URL_MODULE : string
  getDataTables(param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }

  getMenuParent(id : string) {
    const url = this.URL_MODULE + '/menu/get-menu-parent/' + id
    return this.http.get<ResponseApi>(url)
  }

  getMenuAll() {
    const url = this.URL_MODULE + '/menu/get-all'
    return this.http.get<ResponseApi>(url)
  }

  getAllByExistsRight(){
    const url = this.URL_MODULE + '/menu/get-all-byexists-right'
    return this.http.get<ResponseApi>(url)
  }

  insert(param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu'
    return this.http.post<ResponseApi>(url, param)
  }

  update(id: string, param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu/' + id
    return this.http.put<ResponseApi>(url, param)
  }

  show(id: string) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }

  delete(id: string) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/menu/' + id
    return this.http.delete<ResponseApi>(url)
  }
}
