
import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'


@Injectable({
    providedIn: 'root'
})
export class ModulResepExportService {

    urlModule: string
    urlBase: string = 'resep'
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
    export(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/datatable/export'
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
}
