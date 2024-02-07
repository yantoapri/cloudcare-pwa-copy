import { createAction, props } from '@ngrx/store';
import { JadwalStafPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-staf-payload";

const ADD_INITIAL = '[JADWAL_STAF] add initial',
	ADD_SUCCESS = '[JADWAL_STAF] add success',
	ADD_FAILURE = '[JADWAL_STAF] add failure ',
	UPDATE_INITIAL = '[JADWAL_STAF] update initial',
	UDPATE_SUCCESS = '[JADWAL_STAF] update success',
	UPDATE_FAILURE = '[JADWAL_STAF] update failure',
	GET_BYID_INITIAL = '[JADWAL_STAF] get byid initial',
	GET_BYID_SUCCESS = '[JADWAL_STAF] get byid success',
	GET_BYID_FAILURE = '[JADWAL_STAF] get byid failure',
	DELETE_INITIAL = '[JADWAL_STAF] delete initial',
	DELETE_SUCCESS = '[JADWAL_STAF] delete success',
	DELETE_FAILURE = '[JADWAL_STAF] delete failure',

	CLEAR_DATA = '[JADWAL_STAF] clear data ',
	TABLE_DATA = '[JADWAL_STAF] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: JadwalStafPayload }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: any }>());
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: JadwalStafPayload }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ id: any, payload: any }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
