
import { stokPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/stok-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[STOK OBAT] add initial',
	ADD_SUCCESS = '[STOK OBAT] add success',
	ADD_FAILURE = '[STOK OBAT] add failure ',
	UPDATE_INITIAL = '[STOK OBAT] update initial',
	UDPATE_SUCCESS = '[STOK OBAT] update success',
	UPDATE_FAILURE = '[STOK OBAT] update failure',
	GET_BYID_INITIAL = '[STOK OBAT] get byid initial',
	GET_BYID_SUCCESS = '[STOK OBAT] get byid success',
	GET_BYID_FAILURE = '[STOK OBAT] get byid failure',
	DELETE_INITIAL = '[STOK OBAT] delete initial',
	DELETE_SUCCESS = '[STOK OBAT] delete success',
	DELETE_FAILURE = '[STOK OBAT] delete failure',

	CLEAR_DATA = '[STOK OBAT] clear data ',
	TABLE_DATA = '[STOK OBAT] table data';


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
