import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'
@Injectable({
  providedIn: 'root'
})
export class RepoService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }

  URL_MODULE : string

  getDataTables(param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }
  listRepo(){
    const url = this.URL_MODULE + '/repo/get-all'
    return this.http.get<ResponseApi>(url)
  }

  insert(param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo'
    return this.http.post<ResponseApi>(url, param)
  }

  update(id: string, param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo/' + id
    return this.http.put<ResponseApi>(url, param)
  }

  show(id: string) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }

  delete(id: string) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo/' + id
    return this.http.delete<ResponseApi>(url)
  }

}
