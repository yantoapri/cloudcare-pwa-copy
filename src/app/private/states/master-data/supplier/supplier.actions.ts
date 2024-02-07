import { SupplierPayload } from "src/app/private/models/class-payload-api/master-data/supplier-payload";
import { createAction, props } from '@ngrx/store';

const ADD_INITIAL = '[SUPPLIER] add initial',
ADD_SUCCESS = '[SUPPLIER] add success',
ADD_FAILURE = '[SUPPLIER] add failure ',
UPDATE_INITIAL = '[SUPPLIER] update initial',
UDPATE_SUCCESS = '[SUPPLIER] update success',
UPDATE_FAILURE = '[SUPPLIER] update failure',
GET_BYID_INITIAL = '[SUPPLIER] get byid initial',
GET_BYID_SUCCESS = '[SUPPLIER] get byid success',
GET_BYID_FAILURE = '[SUPPLIER] get byid failure',
DELETE_INITIAL = '[SUPPLIER] delete initial',
DELETE_SUCCESS = '[SUPPLIER] delete success',
DELETE_FAILURE = '[SUPPLIER] delete failure',

CLEAR_DATA = '[SUPPLIER] clear data',
TABLE_DATA = '[SUPPLIER] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : SupplierPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : SupplierPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : SupplierPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
