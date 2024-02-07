import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'

@Injectable({
  providedIn: 'root'
})
export class AntreanPasienService {

  URL_MODULE : string
  urlBaseName : string = 'antrian'

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.resepsionis)
  }

  getDataTables(param : any) {
    const url = this.URL_MODULE + '/antrian/get-datatables-resepsionis'
    return this.http.post<ResponseApi>(url, param)
  }
  getDataTablesResep(param : any) {
    const url = this.URL_MODULE + '/antrian/get-datatables-farmasi'
    return this.http.post<ResponseApi>(url, param)
  }
  /**
  getAll(){
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-all'
    return this.http.get<ResponseApi>(url)
  }
  insert(param : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/create'
    return this.http.post<ResponseApi>(url, param)
  }
  update(id: any, param : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/update/' + id
    return this.http.put<ResponseApi>(url, param)
  }
  show(id: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }
  */
  delete(id: any) : Observable<any> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/delete/' + id
    return this.http.delete<ResponseApi>(url)
  }
}
