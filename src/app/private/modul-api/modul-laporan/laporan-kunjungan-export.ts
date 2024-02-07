import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable({
    providedIn: 'root'
})
export class ModulLaporanExportService {

    urlModule: string
    urlBase: string = 'kunjungan-pasien'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient,
        private authenticationService: AuthService
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.export)
    }
    currentUser = this.authenticationService.currentUserValue;
    header = new HttpHeaders({
        "Accept": "application/octet-stream",
        "Content-Type": "blob",
        // "Content-type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        'Authorization': `Bearer ${this.currentUser.token}`,
      });
   
    exportKlinik(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/data-klinik/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportBulanan(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/data-bulanan/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportBulananDetail(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/data-bulanan-detail/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    
}
