
import { stokPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/stok-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[STOK ALAT] add initial',
	ADD_SUCCESS = '[STOK ALAT] add success',
	ADD_FAILURE = '[STOK ALAT] add failure ',
	UPDATE_INITIAL = '[STOK ALAT] update initial',
	UDPATE_SUCCESS = '[STOK ALAT] update success',
	UPDATE_FAILURE = '[STOK ALAT] update failure',
	GET_BYID_INITIAL = '[STOK ALAT] get byid initial',
	GET_BYID_SUCCESS = '[STOK ALAT] get byid success',
	GET_BYID_FAILURE = '[STOK ALAT] get byid failure',
	DELETE_INITIAL = '[STOK ALAT] delete initial',
	DELETE_SUCCESS = '[STOK ALAT] delete success',
	DELETE_FAILURE = '[STOK ALAT] delete failure',

	CLEAR_DATA = '[STOK ALAT] clear data ',
	TABLE_DATA = '[STOK ALAT] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: stokPayload }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: stokPayload }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ id: any }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: stokPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
