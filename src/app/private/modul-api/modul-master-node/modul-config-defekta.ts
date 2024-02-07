import { Injectable } from '@angular/core';
import { GeneralService } from '../general.service'
import { Constant } from 'src/app/config/constant'
import { Observable } from 'rxjs';
import { ResponseApi } from 'src/app/core/models/response-api'
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class ModulConfigDefekta {

	urlModule: string
	urlBase: string = 'config-defekta'
	constructor(
		private generalService: GeneralService,
		private http: HttpClient
	) {
		this.urlModule = this.generalService.getUrlModule(Constant.url_module.master_node)
	}

	show(): Observable<ResponseApi> {
		const url = this.urlModule + '/' + this.urlBase + '/get-config'
		return this.http.get<ResponseApi>(url)
	}
	
	update(payload: any) {
		const url = this.urlModule + '/' + this.urlBase + '/update'
		return this.http.put<ResponseApi>(url, payload)
	}
	
}
