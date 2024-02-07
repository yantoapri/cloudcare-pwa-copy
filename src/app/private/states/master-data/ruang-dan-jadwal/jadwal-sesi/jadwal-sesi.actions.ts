import { JadwalSesiPayload } from 'src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-sesi-payload';
import { createAction, props } from '@ngrx/store';

const ADD_INITIAL = '[JADWAL_SESI] add initial',
ADD_SUCCESS = '[JADWAL_SESI] add success',
ADD_FAILURE = '[JADWAL_SESI] add failure ',
UPDATE_INITIAL = '[JADWAL_SESI] update initial',
UDPATE_SUCCESS = '[JADWAL_SESI] update success',
UPDATE_FAILURE = '[JADWAL_SESI] update failure',
GET_BYID_INITIAL = '[JADWAL_SESI] get byid initial',
GET_BYID_SUCCESS = '[JADWAL_SESI] get byid success',
GET_BYID_FAILURE = '[JADWAL_SESI] get byid failure',
DELETE_INITIAL = '[JADWAL_SESI] delete initial',
DELETE_SUCCESS = '[JADWAL_SESI] delete success',
DELETE_FAILURE = '[JADWAL_SESI] delete failure',

CLEAR_DATA = '[JADWAL_SESI] clear data',
TABLE_DATA = '[JADWAL_SESI] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : JadwalSesiPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : JadwalSesiPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : JadwalSesiPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
