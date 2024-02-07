import { MasterPoliPayload } from "src/app/private/models/class-payload-api/manajemen-klinik/master-poli-payload";
import { createAction, props } from '@ngrx/store';


const ADD_MASTER_POLI = '[MASTER_POLI] add initial',
ADD_MASTER_POLI_SUCCESS = '[MASTER_POLI] add success',
ADD_MASTER_POLI_FAILURE = '[MASTER_POLI] add failure',

UPDATE_MASTER_POLI = '[MASTER_POLI] update initial',
UPDATE_MASTER_POLI_SUCCESS = '[MASTER_POLI] update success',
UPDATE_MASTER_POLI_FAILURE = '[MASTER_POLI] update failure',

GET_MASTER_POLI_BY_ID = '[MASTER_POLI] get by id initial',
GET_MASTER_POLI_BY_ID_SUCCESS = '[MASTER_POLI] get by id success',
GET_MASTER_POLI_BY_ID_FAILURE = '[MASTER_POLI] get by id failure',

DELETE_MASTER_POLI = '[MASTER_POLI] delete initial',
DELETE_MASTER_POLI_SUCCESS = '[MASTER_POLI] delete success ',
DELETE_MASTER_POLI_FAILURE = '[MASTER_POLI] delete failure',

CLEAR_DATA = '[MASTER_POLI] CLEAR DATA',
TABLE_DATA = '[MASTER_POLI] RELOAD TABLE DATA'


export const addMasterPoli =  createAction(ADD_MASTER_POLI, props<{ payload : MasterPoliPayload  }>() );
export const addMasterPoliSuccess = createAction(ADD_MASTER_POLI_SUCCESS, props<{ payload : any }>() );
export const addMasterPoliFailure= createAction(ADD_MASTER_POLI_FAILURE, props<{ message: any }>() );

export const updateMasterPoli = createAction(UPDATE_MASTER_POLI, props<{ payload : MasterPoliPayload }>() );
export const updateMasterPoliSuccess = createAction(UPDATE_MASTER_POLI_SUCCESS, props<{ payload : any }>() );
export const updateMasterPoliFailure = createAction(UPDATE_MASTER_POLI_FAILURE, props<{ message : any }>() );

export const getMasterPoliById = createAction(GET_MASTER_POLI_BY_ID, props<{ payload : { id : string } }>() );
export const getMasterPoliByIdSuccess = createAction(GET_MASTER_POLI_BY_ID_SUCCESS, props<{ payload : MasterPoliPayload }>() );
export const getMasterPoliByIdFailure = createAction(GET_MASTER_POLI_BY_ID_FAILURE, props<{ message : any }>() );

export const deleteMasterPoli = createAction(DELETE_MASTER_POLI, props<{ payload : { id : string } }>() );
export const deleteMasterPoliSuccess = createAction(DELETE_MASTER_POLI_SUCCESS, props<{ payload : any }>() );
export const deleteMasterPoliFailure = createAction(DELETE_MASTER_POLI_FAILURE, props<{ message : any }>() );

export const tableData = createAction(TABLE_DATA);
export const clearData = createAction(CLEAR_DATA);
