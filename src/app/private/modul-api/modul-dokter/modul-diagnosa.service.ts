import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ModulDiagnosaService {

  urlModule : string

  constructor(
    private generalService : GeneralService,
    private http : HttpClient
  ) {
    this.urlModule = this.generalService.getUrlModule(Constant.url_module.dokter)
  }

  show(id: string) : Observable<ResponseApi> {
    let url = this.urlModule + '/diagnosa-dokter-umum/get-byid-antrian/' + id;
    return this.http.get<ResponseApi>(url)
  }

  add(payload: any) : Observable<ResponseApi> {
    let url = this.urlModule + '/diagnosa-dokter-umum/create'
    return this.http.post<ResponseApi>(url, payload)
  }

  update(payload : any, id : string) : Observable<ResponseApi> {
    let url = this.urlModule + '/diagnosa-dokter-umum/update/' + id
    return this.http.put<ResponseApi>(url, payload)
  }
  #test

}
