import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'


@Injectable({
  providedIn: 'root'
})
export class WilayahService {

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

  getKabupatenSelectOption(param: any, id : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-kabupaten-select-option/' + id
    return this.http.post<ResponseApi>(url, param)
  }

  getKecamatanSelectOption(param: any, id : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-kecamatan-select-option/' + id
    return this.http.post<ResponseApi>(url, param)
  }

  getDesaSelectOption(param: any, id : any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/' + this.urlBaseName + '/get-desa-select-option/' + id
    return this.http.post<ResponseApi>(url, param)
  }

  prosesSelectOptionProvinsi(param : ParamSelectOption, action : string) {
    let params = this.paramOption(param, action)
    return this.getProvinsiSelectOption(params)
  }

  prosesSelectOptionKabupaten(param : ParamSelectOption, action : string, id: string) {
    let params = this.paramOption(param, action)
    return this.getKabupatenSelectOption(params, id)
  }

  prosesSelectOptionKecamatan(param : ParamSelectOption, action : string, id: string) {
    let params = this.paramOption(param, action)
    return this.getKecamatanSelectOption(params, id)
  }

  prosesSelectOptionDesa(param : ParamSelectOption, action : string, id: string) {
    let params = this.paramOption(param, action)
    return this.getDesaSelectOption(params, id)
  }

  paramOption(param : ParamSelectOption, action :string) : ParamSelectOption {
    return param
  }

}

export interface ParamSelectOption {
  search : string | null | undefined
  last_data : 0 | number
  get_data : 10 | number
}

export enum ActionSelectOption {
  OPEN = 'open', LAST = 'last_page', SEARCH = 'search'
}
