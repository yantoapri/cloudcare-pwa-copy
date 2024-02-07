import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable({
    providedIn: 'root'
})
export class ModulPenjualanExportService {

    urlModule: string
    urlBase: string = 'penjualan-omset'
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
        'Authorization': `Bearer ${this.currentUser.token}`,
      });
    exportObatHarian(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-harian'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatHarian(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-harian-ak'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-obat'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/data-penjualan-alat'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    
   
}
