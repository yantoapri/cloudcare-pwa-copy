import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/authentication/core/services/auth.service'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

	constructor(
		private authenticationService: AuthService
	) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		let currentUser = this.authenticationService.currentUserValue;
		// console.log({
		//   inter : 'TokenInterceptor',
		//   value : currentUser
		// })
		// console.log(request.detectContentTypeHeader());

		if (currentUser && currentUser.token && currentUser.key) {
			let header = {}
			if (request.body instanceof FormData) {
				header = {
					'Authorization': currentUser.token,
					'x-api-key': currentUser.key,
				}
			} else {
				header = {
					'Authorization': currentUser.token,
					'x-api-key': currentUser.key,
					// 'Cache-Control': 'no-cache, no-store, must-revalidate',
					// 'Pragma': 'no-cache',
					// 'If-Modified-Since': '0',
					'Content-Type': 'application/json'
				}
			}
			request = request.clone({
				setHeaders: header,
			});
		}

		return next.handle(request);
	}
}
