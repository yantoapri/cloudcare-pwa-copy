import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'
@Injectable({
  providedIn: 'root'
})
export class MasterPoliService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }

  URL_MODULE : string
  urlBaseName : string = 'master-poli'

  getDataTables(param : any) : Observable<any> {
    const url = this.URL_MODULE + '/master-poli/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }
  getAll(){
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-all'
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
}
