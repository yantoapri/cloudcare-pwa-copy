import { AkunPayload } from 'src/app/private/models/class-payload-api/manajemen-akun/akun-payload'
import { createAction, props } from '@ngrx/store';

const ADD_AKUN = '[AKUN] add akun',
	ADD_AKUN_SUCCESS = '[AKUN] add akun success',
	ADD_AKUN_FAILURE = '[AKUN] add akun failure',

	GET_AKUN_BY_ID = '[AKUN] get akun by id',
	GET_AKUN_BY_ID_SUCCESS = '[AKUN] get akun by id success ',
	GET_AKUN_BY_ID_FAILURE = '[AKUN] get akun by id failure',

	UPDATE_AKUN = '[AKUN] update akun initial',
	UPDATE_AKUN_SUCCESS = '[AKUN] update akun success',
	UPDATE_AKUN_FAILURE = '[AKUN] update akun failure',

	DELETE_AKUN = '[AKUN] delete akun initial',
	DELETE_AKUN_SUCCESS = '[AKUN] delete akun success',
	DELETE_AKUN_FAILURE = '[AKUN] delete akun failure',

	CLEAR_STATE = '[AKUN] Clear state',

	TABLE_DATA = '[AKUN] table data initial';

export const clearState = createAction(CLEAR_STATE);
export const addAkun = createAction(ADD_AKUN, props<{ payload: AkunPayload }>());
export const addAkunSuccess = createAction(ADD_AKUN_SUCCESS, props<{ payload: AkunPayload }>());
export const addAkunFailure = createAction(ADD_AKUN_FAILURE, props<{ message: string }>());

export const getAkunById = createAction(GET_AKUN_BY_ID, props<{ payload: { id: any } }>());
export const getAkunByIdSuccess = createAction(GET_AKUN_BY_ID_SUCCESS, props<{ payload: AkunPayload }>());
export const getAkunByIdFailure = createAction(GET_AKUN_BY_ID_FAILURE, props<{ message: string }>());

export const updateAkun = createAction(UPDATE_AKUN, props<{ payload: AkunPayload }>());
export const updateAkunSuccess = createAction(UPDATE_AKUN_SUCCESS, props<{ payload: AkunPayload }>());
export const updateAkunFailure = createAction(UPDATE_AKUN_FAILURE, props<{ message: string }>());

export const deleteAkun = createAction(DELETE_AKUN, props<{ payload: { id: string, status_akun: number } }>());
export const deleteAkunSuccess = createAction(DELETE_AKUN_SUCCESS, props<{ payload: AkunPayload }>());
export const deleteAkunFailure = createAction(DELETE_AKUN_FAILURE, props<{ message: string }>());
export const tableData = createAction(TABLE_DATA);

