import { Injectable } from '@angular/core';
import { GeneralService } from './general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'

@Injectable({
  providedIn: 'root'
})
export class RisetService {

  URL_MODULE : string
  urlBaseName : string = 'alamat'

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.master)
  }

  getProvinsiSelectOption(param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-provinsi-select-option'
    return this.http.post<ResponseApi>(url, param)
  }
}
