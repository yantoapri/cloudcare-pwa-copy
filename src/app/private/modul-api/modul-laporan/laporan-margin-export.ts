import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable({
    providedIn: 'root'
})
export class ModulMarginExportService {

    urlModule: string
    urlBase: string = 'laba-margin'
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
    exportObatProfit(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/obat/profit/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatProfit(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/alat/profit/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObatMargin(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/obat/margin/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatMargin(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/alat/margin/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
   
}
