import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable({
    providedIn: 'root'
})
export class ModulPembelianExportService {

    urlModule: string
    urlBase: string = 'laporan-pembelian'
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
   
    getObatExport(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/obat/faktur/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    getAlatExport(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/alat/faktur/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
}
