
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
// import { AuthService } from 'src/app/authentication/core/services/auth.service'
import { Constant } from 'src/app/config/constant'


@Injectable({
  providedIn: 'root'
})
export class TypeRoleService {

  constructor(
    // private authService : AuthService,
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }
  URL_MODULE : any

  getDataTables(param : any) : Observable<any> {
    const url = this.URL_MODULE + '/role-type/get-datatables'
    return this.http.post<ResponseApi>(url, param)
  }

  getListTipeRole(){
    const url = this.URL_MODULE + '/role-type/getall-role-type'
    return this.http.get<ResponseApi>(url)
  }

  add(payload : any) {
    const url = this.URL_MODULE + '/role-type'
    return this.http.post<ResponseApi>(url, payload)
  }

  showRight()  {
    const url = this.URL_MODULE + '/role-type/data-menu'
    return this.http.get<ResponseApi>(url).pipe(
      map(res => {
        return this.functionFilterJson(res.response)
      })
    )
  }

  showDataMenu() : Observable<ResponseApi> {
    const url = this.URL_MODULE + '/role-type/data-menu'
    return this.http.get<ResponseApi>(url)
  }

  show(id : any): Observable<any> {
    const url = this.URL_MODULE + '/role-type/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }

  nonAktifData(id: any): Observable<any>  {
    const url = this.URL_MODULE + '/role-type/' + id
    return this.http.delete<ResponseApi>(url)
  }

  update(id: number, param: any) {
    const url = this.URL_MODULE + '/role-type/' + id
    return this.http.put<ResponseApi>(url, param)
  }


  functionFilterJson(data : any) {
    let data_dum : any = [];

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
