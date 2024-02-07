
import { DataObatPayload } from "src/app/private/models/class-payload-api/master-data/data-obat-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[DATA_OBAT] add initial',
ADD_SUCCESS = '[DATA_OBAT] add success',
ADD_FAILURE = '[DATA_OBAT] add failure ',
UPDATE_INITIAL = '[DATA_OBAT] update initial',
UDPATE_SUCCESS = '[DATA_OBAT] update success',
UPDATE_FAILURE = '[DATA_OBAT] update failure',
GET_BYID_INITIAL = '[DATA_OBAT] get byid initial',
GET_BYID_SUCCESS = '[DATA_OBAT] get byid success',
GET_BYID_FAILURE = '[DATA_OBAT] get byid failure',
DELETE_INITIAL = '[DATA_OBAT] delete initial',
DELETE_SUCCESS = '[DATA_OBAT] delete success',
DELETE_FAILURE = '[DATA_OBAT] delete failure',

CLEAR_DATA = '[DATA_OBAT] clear data ',
TABLE_DATA = '[DATA_OBAT] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : DataObatPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : DataObatPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : DataObatPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
