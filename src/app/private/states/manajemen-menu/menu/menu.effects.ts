import { MenuPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/menu-payload'
import * as MenuActions from './menu.actions'
import { MenuService } from 'src/app/private/services/manajemen-menu/menu.service';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from "@angular/core";
import Swal from 'sweetalert2/dist/sweetalert2.js'
@Injectable()
export class MenuEffects {

	constructor(
		private actions$: Actions,
		private menuService: MenuService
	) { }

	addMenu$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MenuActions.addMenu),
			switchMap(action => {
				return this.menuService.insert(action.payload)
					.pipe(
						map(res => {
							return MenuActions.addMenuSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(MenuActions.addMenuFailure({ message: err }))
						})
					)
			})
		)
	)
	addMenuSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MenuActions.addMenuSuccess),
			map(action => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil disimpan'
				})
				return MenuActions.tableData()
			})
		)
	);

	addMenuFailure$ = createEffect(() => this.actions$.pipe(ofType(MenuActions.addMenuFailure)), { dispatch: false })

	updateMenu$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MenuActions.updateMenu),
			switchMap(action => {
				return this.menuService.update(String(action.payload.id_menu), action.payload)
					.pipe(
						map(res => {
							return MenuActions.updateMenuSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(MenuActions.updateMenuFailure({ message: err }))
						})
					)
			})
		)
	);
	updateMenuSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MenuActions.updateMenuSuccess),
			map(action => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil disimpan'
				})
				return MenuActions.tableData()
			})
		)
	)
	updateMenuFailure$ = createEffect(() => this.actions$.pipe(ofType(MenuActions.updateMenuFailure)), { dispatch: false })

	getMenuById$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MenuActions.getMenuById),
			switchMap(action => {
				return this.menuService.show(action.payload.id)
					.pipe(
						map(res => {
							return MenuActions.getMenuByIdSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(MenuActions.getMenuByIdFailure({ message: err }))
						})
					)
			})
		)
	)
	// getMenuByIdSuccess$ = createEffect(() => this.actions$.pipe( ofType(MenuActions.getMenuByIdSuccess) ) )
	getMenuByIdFailure$ = createEffect(() =>
		this.actions$.pipe(ofType(MenuActions.getMenuByIdFailure)), { dispatch: false }
	)

	deleteMenu$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MenuActions.deleteMenu),
			switchMap(action => {
				return this.menuService.delete(action.payload.id)
					.pipe(
						map(res => {
							return MenuActions.deleteMenuSuccess({ payload: res.response })
						}),
						catchError(err => {
							return of(MenuActions.deleteMenuFailure({ message: err }))
						})
					)
			})
		)
	)
	deleteMenuSuccess$ = createEffect(() =>
		this.actions$.pipe(
			ofType(MenuActions.deleteMenuSuccess),
			map(action => {
				this.Toast.fire({
					icon: 'success',
					title: 'Data berhasil dihapus'
				})
				return MenuActions.tableData()
			})
		)
	)
	deleteMenuFailure$ = createEffect(() => this.actions$.pipe(ofType(MenuActions.deleteMenuFailure)), { dispatch: false })

	public Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
			toast.addEventListener('mouseenter', Swal.stopTimer)
			toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	})

}
