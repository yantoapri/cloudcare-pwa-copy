import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect, act } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../login/auth.actions';
import { AuthService } from '../../services/auth.service';
// import { AuthService as SimpanAuth } from "src/app/core/service/auth.service";

@Injectable()
export class AuthEffects {

	constructor(
		private actions$: Actions,
		private router: Router,
		private authService: AuthService,
		// private simpanAuth : SimpanAuth
	) { }
	authLoginTtime$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.login_time),
			tap(action => {
				return AuthActions.login_time({payload:action.payload})
			})
		)
	)
	authLogin$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.login),
			switchMap(action => {
				// console.log('payload', action.payload);
				return this.authService.logIn(action.payload)
					.pipe(
						map(res => {
							// console.log('auth effect login aksi', action);
							return AuthActions.loginSuccess({ payload: res.response });
						}),
						catchError(errorMessage => {
							// console.log('auth effect login aksi', errorMessage);
							return of(AuthActions.loginFailure({ message: errorMessage }));
						})
					);
			})
		)
	);

	authLoginSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.loginSuccess),
			tap(action => {
				// console.log('auth effect login sukses', action);
				// console.log({
				//   action : action,
				//   key : action.payload
				// })
				let user = {

					// img: 'https://i.pinimg.com/originals/28/2f/81/282f81f5de984104a9227583b39df527.jpg',
					img: 'https://www.gwp.id/assets/images/default/no-display-picture.png',
					username: action.payload.nama,
					password: 'rahasia',
					fullname: action.payload.nama,
					role: 'Demo',
					menu: action.payload.menu,
					menu_right:action.payload.menu_right,
					repo: action.payload.repo,
					token: action.payload.token,
					key: action.payload.key,
					plant: action.payload.plant,
					sessi_id:action.payload.sessi_id,
					sessi_time:action.payload.sessi_time,
				}
				this.authService.simpanUser(user)
				this.router.navigate(["/admin/welcome"])
				// window.location.reload()
				// localStorage.setItem('token', JSON.stringify(action.payload.token));
				// this.router.navigateByUrl('/');
			})
		), { dispatch: false }
	);

	authLoginFailure$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.loginFailure),
		), { dispatch: false }
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.logout),
			tap(action => {
				this.authService.logout()
				this.router.navigate(["/authentication/signin"]);
				// localStorage.removeItem('token');
			})
		), { dispatch: false }
	);

	getStatus$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActions.getStatus),
			// tap(action => {
			//   let res = this.authService.getStatus();
			//   console.log('auth get status', res);

			//   return res;
			// })
			switchMap(action => {
				return this.authService.getStatus()
					.pipe(
						map(user => {
							return this.authService.getStatus();
						})
					);
			})
		), { dispatch: false }
	);
}
