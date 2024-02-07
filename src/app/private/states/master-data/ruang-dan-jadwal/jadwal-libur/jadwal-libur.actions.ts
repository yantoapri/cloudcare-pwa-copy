
import { createAction, props } from '@ngrx/store';
import { JadwalLiburPayload } from 'src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-libur-payload';
import { ResponseApi } from 'src/app/core/models/response-api';

const ADD_INITIAL = '[JADWAL_LIBUR] add initial',
ADD_SUCCESS = '[JADWAL_LIBUR] add success',
ADD_FAILURE = '[JADWAL_LIBUR] add failure ',
UPDATE_INITIAL = '[JADWAL_LIBUR] update initial',
UDPATE_SUCCESS = '[JADWAL_LIBUR] update success',
UPDATE_FAILURE = '[JADWAL_LIBUR] update failure',
GET_BYID_INITIAL = '[JADWAL_LIBUR] get byid initial',
GET_BYID_SUCCESS = '[JADWAL_LIBUR] get byid success',
GET_BYID_FAILURE = '[JADWAL_LIBUR] get byid failure',
DELETE_INITIAL = '[JADWAL_LIBUR] delete initial',
DELETE_SUCCESS = '[JADWAL_LIBUR] delete success',
DELETE_FAILURE = '[JADWAL_LIBUR] delete failure',

CLEAR_DATA = '[JADWAL_LIBUR] clear data',
TABLE_DATA = '[JADWAL_LIBUR] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : JadwalLiburPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : JadwalLiburPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : JadwalLiburPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
