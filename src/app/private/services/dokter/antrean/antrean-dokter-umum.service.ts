import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GeneralService } from 'src/app/private/services/general.service'
import { Observable, forkJoin } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { Constant } from 'src/app/config/constant'

@Injectable({
  providedIn: 'root'
})
export class AntreanDokterUmumService {

  UrlModuleResepsionis : string
  urlModulePerawat : string
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

  getDataTables(param : any) : Observable<ResponseApi>{
    const url = this.UrlModuleResepsionis + '/antrian/get-datatables-dokter'
    return this.http.post<ResponseApi>(url, param)
  }

  getDataTablesRekamMedis(param: any, id: string) : Observable<ResponseApi> {
    const url = this.urlModuleRekamMedis + '/rekam-medis/datatable-list-dokter/' + id
    return this.http.post<ResponseApi>(url, param)
  }
  getDataTablesListPerawat(param: any, id: string): Observable<ResponseApi> {
    const url = this.urlModuleRekamMedis + '/rekam-medis/datatable-list-perawat/' + id
    return this.http.post<ResponseApi>(url, param)
  }

  getByIdAntrian(id : string) : Observable<ResponseApi> {
    const url = this.UrlModuleResepsionis + '/antrian/get-byid-antrian-pasien/' + id
    return this.http.get<ResponseApi>(url)
  }

  show(id : string, id_pasien : string): Observable<any[]> {
    let diagnosa = this.showDiagnosa(id)
    let perawat = this.showPerawat(id)
    // let kunjungan = this.showKunjunganTerakhirPasien(id_pasien)
    return forkJoin([ diagnosa ,  perawat])
  }

  showDiagnosa(id: string) : Observable<ResponseApi> {
    const url = this.urlModuleDokter + '/diagnosa-dokter-umum/get-byid-antrian/' + id
    return this.http.get<ResponseApi>(url)
  }

  showPerawat(id: string) : Observable<ResponseApi> {
    const url = this.urlModulePerawat + '/tindakan-perawat/get-byid-antrian/' + id
    return this.http.get<ResponseApi>(url)
  }

  showKunjunganTerakhirPasien(id : string) : Observable<ResponseApi> {
    const url = this.urlModuleRekamMedis + '/rekam-medis/get-kunjungan-terakhir-byid-pasien/' + id
    return this.http.get<ResponseApi>(url)
  }

  insert(param : any) : Observable<ResponseApi> {
    const url = this.urlModuleDokter + '/diagnosa-dokter-umum/create'
    return this.http.post<ResponseApi>(url, param)
  }

  update(param : any, id : string) : Observable<ResponseApi> {
    const url = this.urlModuleDokter + '/diagnosa-dokter-umum/update/' + id
    return this.http.put<ResponseApi>(url, param)
  }

  getRekamMedisByIdAntrian(id : string) : Observable<ResponseApi> {
    const url = this.urlModuleRekamMedis + '/rekam-medis/get-diagnosa-byid-antrian/' + id
    return this.http.get<ResponseApi>(url)
  }

  // delete(id: string) : Observable<ResponseApi> {
  //   const url = this.UrlModuleResepsionis + '/pasien/delete' + id
  //   return this.http.delete<ResponseApi>(url)
  // }

}
