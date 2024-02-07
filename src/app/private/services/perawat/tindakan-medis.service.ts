import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Constant } from 'src/app/config/constant'
import { ResponseApi } from 'src/app/core/models/response-api'
@Injectable({
  providedIn: 'root'
})
export class TindakanMedisService {

  urlModulePerawat : string
  UrlModuleResepsionis : string
  urlModuleDokter : string
  urlModuleRekamMedis : string

  constructor(
    private generalService : GeneralService,
    private http: HttpClient
  ) {
    this.UrlModuleResepsionis = this.generalService.getUrlModule(Constant.url_module.resepsionis)
    this.urlModulePerawat = this.generalService.getUrlModule(Constant.url_module.perawat)
    this.urlModuleDokter = this.generalService.getUrlModule(Constant.url_module.dokter)
    this.urlModuleRekamMedis = this.generalService.getUrlModule(Constant.url_module.rekamMedis)
  }

  getDataTables(param : any) : Observable<ResponseApi> {
    const url = this.urlModulePerawat + '/pelaksana-tindakan-medis/get-datatable'
    return this.http.post<ResponseApi>(url, param)
  }

  show(id: string) : Observable<ResponseApi> {
    const url = this.urlModulePerawat + '/pelaksana-tindakan-medis/get-byid/' + id
    return this.http.get<ResponseApi>(url)
  }

  insert(param : any) : Observable<ResponseApi> {
    const url = this.urlModulePerawat + '/pelaksana-tindakan-medis/create'
    return this.http.post<ResponseApi>(url, param)
  }

  update(param : any) {
    const url = this.urlModulePerawat + '/pelaksana-tindakan-medis/update'
    return this.http.put<ResponseApi>(url, param)
  }

  showKunjunganTerakhirPasien(id : string) : Observable<ResponseApi> {
    const url = this.urlModuleRekamMedis + '/rekam-medis/get-kunjungan-terakhir-byid-pasien/' + id
    return this.http.get<ResponseApi>(url)
  }

  // updateByIdAntrian(id: string, param : any) {
  //   const url = this.urlModulePerawat + '/tindakan-perawat/update-byid-antrian/' + id
  //   return this.http.put<ResponseApi>(url, param)
  // }

  // tindakan-perawat/get-byid-antrian
  // diagnosa-dokter-umum/get-byid-antrian
  showMultiple(id: string): Observable<any[]> {
    let perawat = this.showPerawat(id)
    let diagnosa = this.showDiagnosa(id)
    let pasien = this.showPasien(id)
    let show = this.show(id)
    return forkJoin([ perawat, diagnosa, pasien, show ])
  }
  showPerawat(id: string) : Observable<ResponseApi> {
    const url = this.urlModulePerawat + '/tindakan-perawat/get-byid-antrian/' + id
    return this.http.get<ResponseApi>(url)
  }
  showDiagnosa(id: string) : Observable<ResponseApi> {
    const url = this.urlModuleDokter + '/diagnosa-dokter-umum/get-byid-antrian/' + id
    return this.http.get<ResponseApi>(url)
  }
  showPasien(id : string) : Observable<ResponseApi> {
    const url = this.UrlModuleResepsionis + '/antrian/get-byid-antrian-pasien/' + id
    return this.http.get<ResponseApi>(url)
  }


}
