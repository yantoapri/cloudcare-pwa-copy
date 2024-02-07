import { Injectable } from '@angular/core';
import { ModulEximRekamMedisService } from 'src/app/private/modul-api/modul-export-import/modul-exim-rekam-medis.service'

@Injectable({
  providedIn: 'root'
})
export class RekamMedisPasienService {


  constructor(
    private modulEximRekamMedisService : ModulEximRekamMedisService
  ) {
    // this.URL_MODULE = this.generalService.getUrlModule(Constant.url_module.rekamMedis)
  }

  getLinkPrint(id: string) : string {
    let url = this.modulEximRekamMedisService.getUrlExportRmByIdPasien(id)
    return url
    //this.URL_MODULE + '/export-pdf/rekam-medis/' + id
  }
}
