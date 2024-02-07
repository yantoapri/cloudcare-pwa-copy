import { MetodeBayarPayload } from "src/app/private/models/class-payload-api/master-data/metode-bayar-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[METODE_BAYAR] add initial',
ADD_SUCCESS = '[METODE_BAYAR] add success',
ADD_FAILURE = '[METODE_BAYAR] add failure ',
UPDATE_INITIAL = '[METODE_BAYAR] update initial',
UDPATE_SUCCESS = '[METODE_BAYAR] update success',
UPDATE_FAILURE = '[METODE_BAYAR] update failure',
GET_BYID_INITIAL = '[METODE_BAYAR] get byid initial',
GET_BYID_SUCCESS = '[METODE_BAYAR] get byid success',
GET_BYID_FAILURE = '[METODE_BAYAR] get byid failure',
DELETE_INITIAL = '[METODE_BAYAR] delete initial',
DELETE_SUCCESS = '[METODE_BAYAR] delete success',
DELETE_FAILURE = '[METODE_BAYAR] delete failure',

CLEAR_DATA = '[METODE_BAYAR] clear data ',
TABLE_DATA = '[METODE_BAYAR] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : MetodeBayarPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : MetodeBayarPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : MetodeBayarPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
