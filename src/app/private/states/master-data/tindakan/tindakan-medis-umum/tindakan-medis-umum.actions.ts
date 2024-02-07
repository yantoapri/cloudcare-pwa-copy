import { TindakanMedisUmumPayload } from 'src/app/private/models/class-payload-api/master-data/tindakan/tindakan-medis-umum-payload';
import { createAction, props, UPDATE } from '@ngrx/store';


const ADD_INITIAL = '[TINDAKAN_MEDIS_UMUM] add initial',
ADD_SUCCESS = '[TINDAKAN_MEDIS_UMUM] add success',
ADD_FAILURE = '[TINDAKAN_MEDIS_UMUM] add failure ',
UPDATE_INITIAL = '[TINDAKAN_MEDIS_UMUM] update initial',
UDPATE_SUCCESS = '[TINDAKAN_MEDIS_UMUM] update success',
UPDATE_FAILURE = '[TINDAKAN_MEDIS_UMUM] update failure',
GET_BYID_INITIAL = '[TINDAKAN_MEDIS_UMUM] get byid initial',
GET_BYID_SUCCESS = '[TINDAKAN_MEDIS_UMUM] get byid success',
GET_BYID_FAILURE = '[TINDAKAN_MEDIS_UMUM] get byid failure',
DELETE_INITIAL = '[TINDAKAN_MEDIS_UMUM] delete initial',
DELETE_SUCCESS = '[TINDAKAN_MEDIS_UMUM] delete success',
DELETE_FAILURE = '[TINDAKAN_MEDIS_UMUM] delete failure',

CLEAR_DATA = '[TINDAKAN_MEDIS_UMUM] clear data ',
TABLE_DATA = '[TINDAKAN_MEDIS_UMUM] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : TindakanMedisUmumPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : TindakanMedisUmumPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : TindakanMedisUmumPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
