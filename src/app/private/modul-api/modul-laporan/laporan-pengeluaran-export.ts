import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable({
    providedIn: 'root'
})
export class ModulPengeluaranExportService {

    urlModule: string
    urlBase: string = 'pengeluaran'
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
    exportObat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/obat/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/alat/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObatDetail(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/detail-obat/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatDetail(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/detail-alat/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
}
