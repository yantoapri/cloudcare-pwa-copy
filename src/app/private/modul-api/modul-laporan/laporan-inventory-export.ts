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
export class ModulInventoryExportService {

    urlModule: string
    urlBase: string = 'inventory'
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


    exportStokObat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/stok-obat/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportStokAlat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/stok-alat/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportEdObat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportEdAlat(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObatBlmTerjual(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-belum-terjual/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatBlmTerjual(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-belum-terjual/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObatTdkTerjual(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-tidak-pernah-dijual/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatTdkTerjual(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-tidak-pernah-dijual/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObatInventor(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-inventor-tertinggi/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatInventor(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-inventor-tertinggi/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObatTerlaris(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-terlaris/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatTerlaris(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-terlaris/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportObatPembelianTerbanyak(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/obat-pembelian-terbanyak/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
    exportAlatPembelianTerbanyak(payload: any){
        const url = this.urlModule + '/' + this.urlBase + '/ed/alat-pembelian-terbanyak/export'
        return this.http.post(url, payload,{responseType:'arraybuffer',headers:this.header})
    }
}
