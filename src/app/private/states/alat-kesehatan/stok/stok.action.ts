
import { stokPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/stok-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[STOK] add initial',
	ADD_SUCCESS = '[STOK] add success',
	ADD_FAILURE = '[STOK] add failure ',
	UPDATE_INITIAL = '[STOK] update initial',
	UDPATE_SUCCESS = '[STOK] update success',
	UPDATE_FAILURE = '[STOK] update failure',
	GET_BYID_INITIAL = '[STOK] get byid initial',
	GET_BYID_SUCCESS = '[STOK] get byid success',
	GET_BYID_FAILURE = '[STOK] get byid failure',
	DELETE_INITIAL = '[STOK] delete initial',
	DELETE_SUCCESS = '[STOK] delete success',
	DELETE_FAILURE = '[STOK] delete failure',

	CLEAR_DATA = '[STOK] clear data ',
	TABLE_DATA = '[STOK] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: stokPayload }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: stokPayload }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: stokPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
