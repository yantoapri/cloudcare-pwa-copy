import { KonsolidasiPayload } from "src/app/private/models/class-payload-api/rekam-medis/konsolidasi-data/konsolidasi-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[KONSOLIDASI DATA] add initial',
	ADD_SUCCESS = '[KONSOLIDASI DATA] add success',
	ADD_FAILURE = '[KONSOLIDASI DATA] add failure ',
	// UPDATE_INITIAL = '[KONSOLIDASI DATA] update initial',
	// UDPATE_SUCCESS = '[KONSOLIDASI DATA] update success',
	// UPDATE_FAILURE = '[KONSOLIDASI DATA] update failure',
	// GET_BYID_INITIAL = '[KONSOLIDASI DATA] get byid initial',
	// GET_BYID_SUCCESS = '[KONSOLIDASI DATA] get byid success',
	// GET_BYID_FAILURE = '[KONSOLIDASI DATA] get byid failure',
	// DELETE_INITIAL = '[KONSOLIDASI DATA] delete initial',
	// DELETE_SUCCESS = '[KONSOLIDASI DATA] delete success',
	// DELETE_FAILURE = '[KONSOLIDASI DATA] delete failure',

	CLEAR_DATA = '[KONSOLIDASI DATA] clear data ',
	TABLE_DATA = '[KONSOLIDASI DATA] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: any, id: string }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

// export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: any }>());
// export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
// export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

// export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ id: any }>());
// export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: any }>());
// export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

// export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
// export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
// export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
