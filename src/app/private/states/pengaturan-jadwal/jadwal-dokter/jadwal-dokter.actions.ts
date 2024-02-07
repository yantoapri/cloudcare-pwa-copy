import { createAction, props } from '@ngrx/store';
import { JadwalDokterPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-dokter-payload";

const ADD_INITIAL = '[JADWAL_DOKTER] add initial',
ADD_SUCCESS = '[JADWAL_DOKTER] add success',
ADD_FAILURE = '[JADWAL_DOKTER] add failure ',
UPDATE_INITIAL = '[JADWAL_DOKTER] update initial',
UDPATE_SUCCESS = '[JADWAL_DOKTER] update success',
UPDATE_FAILURE = '[JADWAL_DOKTER] update failure',
GET_BYID_INITIAL = '[JADWAL_DOKTER] get byid initial',
GET_BYID_SUCCESS = '[JADWAL_DOKTER] get byid success',
GET_BYID_FAILURE = '[JADWAL_DOKTER] get byid failure',
DELETE_INITIAL = '[JADWAL_DOKTER] delete initial',
DELETE_SUCCESS = '[JADWAL_DOKTER] delete success',
DELETE_FAILURE = '[JADWAL_DOKTER] delete failure',

CLEAR_DATA = '[JADWAL_DOKTER] clear data ',
TABLE_DATA = '[JADWAL_DOKTER] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : JadwalDokterPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : any}>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : JadwalDokterPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{  id : any,payload:any }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
