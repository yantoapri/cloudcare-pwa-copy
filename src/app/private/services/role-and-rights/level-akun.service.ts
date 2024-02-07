import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { GeneralService } from '../general.service';
import { Observable, throwError, tap, mergeMap } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { Constant } from 'src/app/config/constant'
@Injectable({
  providedIn: 'root'
})
export class LevelAkunService {

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.official)
  }
  URL_MODULE : string

  getList() {
    const url = this.URL_MODULE + '/akun-level/get-level-akun'
    return this.http.get<ResponseApi>(url)
  }
}
