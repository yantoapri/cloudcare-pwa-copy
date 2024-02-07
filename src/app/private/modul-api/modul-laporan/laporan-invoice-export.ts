import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'
@Injectable({
    providedIn: 'root'
})
export class ModulInvoiceExportService {

    urlModule: string
    urlBase: string = 'export-pdf'
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


    exportPdf(id: any){
        const url = this.urlModule + '/' + this.urlBase + '/invoice-farmasi/'+id
        return this.http.post(url,{'Authorization': `Bearer ${this.currentUser.token}`,"x_api_key":this.currentUser.key},{responseType:'arraybuffer',headers:this.header})
    }
    
}
