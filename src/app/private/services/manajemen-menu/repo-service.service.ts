import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'
@Injectable({
  providedIn: 'root'
})
export class RepoServiceService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }

  URL_MODULE : string

  getDataTables (param : any): Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo-service/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }
  getRepoServiceByIdRepo(id : number) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo-service/get-service-byrepo/' + id
    return this.http.get<ResponseApi>(url)
  }

  insert(param : any): Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo-service'
    return this.http.post<ResponseApi>(url, param)
  }
  update(id : string, param : any): Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo-service/' + id
    return this.http.put<ResponseApi>(url, param)
  }
  delete(id: string): Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo-service/' + id
    return this.http.delete<ResponseApi>(url)
  }
  show(id: string): Observable<ResponseApi> {
    const url = this.URL_MODULE + '/repo-service/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }
}
