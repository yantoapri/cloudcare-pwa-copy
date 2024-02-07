import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'

@Injectable({
  providedIn: 'root'
})
export class ProsesAntreanPerawatService {

  URL_MODULE : string
  urlBaseName : string = 'tindakan-perawat'

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.perawat)
  }

  insert(param :any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/create'
    return this.http.post<ResponseApi>(url, param)
  }

  show(id : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-byid-antrian/' + id
    return this.http.get<ResponseApi>(url)
  }

  update(param: any, id : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/update/' + id
    return this.http.put<ResponseApi>(url, param)
  }



}
