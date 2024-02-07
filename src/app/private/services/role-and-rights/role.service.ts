import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }
  URL_MODULE : any

  getDataTables(param : any) : Observable<any> {
    const url = this.URL_MODULE + '/akun-role/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }

  insert(param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/akun-role';
    return this.http.post<ResponseApi>(url, param)
  }

  getMenuRight(id : number) {
    const url = this.URL_MODULE + '/akun-role/get-menu-right/' + id
    return this.http.get<ResponseApi>(url)
  }

  getRoleByAKun(): Observable <ResponseApi>{
    const url = this.URL_MODULE + '/akun-role/get-role-akun'
    return this.http.get<ResponseApi>(url)
  }

  update(id: number, param: any) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/akun-role/' + id;
    return this.http.put<ResponseApi>(url, param)
  }

  show(id: number) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/akun-role/get-byid/' + id;
    return this.http.get<ResponseApi>(url)
  }

  delete(id: number) : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/akun-role/' + id;
    return this.http.delete<ResponseApi>(url)
  }

  functionFilterJson(data : any): Observable<any> {
    let data_dum : any = [];
    // console.log('dari service : ',data.length)
    // console.log('dari service cek aray : ', Array.isArray(data) )
    data.forEach(el => {
      if (el.child.length > 0 ){
        el.child.forEach(ele => {
            if (ele.child.length > 0)  {
              ele.child.forEach((elem, ini) => {
                if ( elem.status_right == true ) {
                  let cek_data = data_dum.find((param) => { return param.id == ele.id })
                  if (cek_data === undefined) {
                    data_dum.push(ele)
                  }
                } else {
                  data_dum.push(elem)
                  /**
                  if (elem.child.length > 0) {
                    elem.child.forEach(eleme => {
                    });
                  }*/
                }

              });
            }

        });
      }
    });

    return data_dum
  }
}
