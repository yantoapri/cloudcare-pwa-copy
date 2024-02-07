
import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/authentication/core/services/auth.service'


@Injectable({
    providedIn: 'root'
})
export class ModulSuratExportService {

    urlModule: string
    urlBase: string = 'surat-dokter'
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
    exportSuratSehat(payload: any,id:any){
        const url = this.urlModule + '/' + this.urlBase + '/sehat/'+id
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportSuratSakit(payload: any,id:any){
        const url = this.urlModule + '/' + this.urlBase + '/sakit/'+id
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportSuratRujukan(payload: any,id:any){
        const url = this.urlModule + '/' + this.urlBase + '/rujukan/'+id
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportSuratDiagnosa(payload: any,id:any){
        const url = this.urlModule + '/' + this.urlBase + '/keterangan-diagnosis/'+id
        return this.http.post(url,payload,{responseType:'arraybuffer',headers:this.header})
    }
}
