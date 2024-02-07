import { AuthService } from "src/app/authentication/core/services/auth.service"
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from "@angular/common/http";
import {  Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import Swal from 'sweetalert2/dist/sweetalert2.js'
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(
		private authenticationService: AuthService,
		private spinner : NgxSpinnerService,
		private router: Router
	) { }

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((err) => {
				let error = 'Cek koneksi anda';
				console.log(err)
				if (err.status === 401) {

					error=err.error.metaData!=undefined?err.error.metaData.message:''
					if (err.error.metaData.response_code === "5557" || err.error.metaData.response_code === "5529") {
						Swal.fire('Error',err.error.metaData.message,'error').then(()=>{
							this.router.navigate(["/"]);
						})
					}

					if (err.error.metaData.response_code === "5552") {
						Swal.fire('Error',err.error.metaData.message,'error').then(()=>{
							this.authenticationService.logout().subscribe(res => {
								this.router.navigate(["/authentication/signin"]);
							})
						})
						
					}
					if (err.error.metaData.response_code === "2002") {
						Swal.fire('Error',err.error.metaData.message,'error').then(()=>{
							this.router.navigate(["/"]);
						})
						
					}
					if(err.error.metaData.response_code ==='0000'){
						Swal.fire('Error',error,'error').then((res)=>{
								this.router.navigate(["/authentication/signin"]);
						})
					}
				} else if (err.status === 400) {
					error = err.error.metaData.message
				} else if (err.status === 422) {
					error = err.error
				} else {
					error = err.error
				}
				this.spinner.hide('spinner1')
				return throwError(error);
			})
		);
	}
}
