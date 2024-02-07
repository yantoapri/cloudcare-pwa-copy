import { ObatPayload, FinishPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/resep-payload";
import { createAction, props } from '@ngrx/store';
import { ResponseApi } from "src/app/core/models/response-api";

const ADD_INITIAL = '[RESEP OBAT] add initial',
	ADD_SUCCESS = '[RESEP OBAT] add success',
	ADD_FAILURE = '[RESEP OBAT] add failure ',
	UPDATE_INITIAL = '[RESEP OBAT] update initial',
	UDPATE_SUCCESS = '[RESEP OBAT] update success',
	UPDATE_FAILURE = '[RESEP OBAT] update failure',
	DELETE_INITIAL = '[RESEP OBAT] delete initial',
	DELETE_SUCCESS = '[RESEP OBAT] delete success',
	DELETE_FAILURE = '[RESEP OBAT] delete failure',

	CREATED_INITIAL = '[RESEP OBAT] create initial',
	CREATED_SUCCESS = '[RESEP OBAT] create success',
	CREATED_FAILURE = '[RESEP OBAT] create failure ',
	FINISH_INITIAL = '[RESEP OBAT] finish initial',
	FINISH_SUCCESS = '[RESEP OBAT] finish success',
	FINISH_FAILURE = '[RESEP OBAT] finish failure',
	CANCEL_INITIAL = '[RESEP OBAT] cancel initial',
	CANCEL_SUCCESS = '[RESEP OBAT] cancel success',
	CANCEL_FAILURE = '[RESEP OBAT] cancel failure',

	CLEAR_DATA = '[RESEP OBAT] clear data ',
	TABLE_DATA = '[RESEP OBAT] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: ObatPayload, id: string }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: ObatPayload, id: string }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any, id: string }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const createInitial = createAction(CREATED_INITIAL, props<{ payload: any }>());
export const createSuccess = createAction(CREATED_SUCCESS, props<{ payload: any }>());
export const createFailure = createAction(CREATED_FAILURE, props<{ message: any }>());

export const finishInitial = createAction(FINISH_INITIAL, props<{ payload: any, id: string }>());
export const finishSuccess = createAction(FINISH_SUCCESS, props<{ payload: any, id: string }>());
export const finishFailure = createAction(FINISH_FAILURE, props<{ message: any }>());

export const cancelInitial = createAction(CANCEL_INITIAL, props<{ payload: { id: any } }>());
export const cancelSuccess = createAction(CANCEL_SUCCESS, props<{ payload: any }>());
export const cancelFailure = createAction(CANCEL_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
