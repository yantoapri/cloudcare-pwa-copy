import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ModulBussinesIntelegentService {

    urlModule: string
    urlBase: string = 'business-intelligen'
    constructor(
        private generalService: GeneralService,
        private http: HttpClient
    ) {
        this.urlModule = this.generalService.getUrlModule(Constant.url_module.modulLaporan)
    }

    getPendaftarPasien(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/pendaftaran-pasien'
        return this.http.post<ResponseApi>(url,payload)
    }
    getKunjunganPasien(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/kunjungan-pasien'
        return this.http.post<ResponseApi>(url,payload)
    }
    getjenisPenyakit(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/jenis-penyakit'
        return this.http.post<ResponseApi>(url,payload)
    }
    getObatTerbanyak(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/obat-terbanyak'
        return this.http.post<ResponseApi>(url, payload)
    }
    getDivisi(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/divisi'
        return this.http.post<ResponseApi>(url,payload)
    }
    getWaktu(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/waktu-pelayanan'
        return this.http.post<ResponseApi>(url,payload)
    }
    getChartDataGender(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/chart-data-gender'
        return this.http.post<ResponseApi>(url,payload)
    }
    getChartWaktuPelayanan(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/chart-waktu-pelayanan'
        return this.http.post<ResponseApi>(url,payload)
    }
    getChartWaktuKunjungan(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/chart-waktu-kunjungan'
        return this.http.post<ResponseApi>(url,payload)
    }
    getChartWaktuTunggu(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/chart-waktu-tunggu'
        return this.http.post<ResponseApi>(url,payload)
    }
    getChartUsiaPasien(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/chart-usia-pasien'
        return this.http.post<ResponseApi>(url,payload)
    }
    getChartLokasi(payload: any): Observable<ResponseApi> {
        const url = this.urlModule + '/' + this.urlBase + '/chart-lokasi-pasien'
        return this.http.post<ResponseApi>(url,payload)
    }
}
