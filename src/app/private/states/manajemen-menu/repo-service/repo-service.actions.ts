import { createAction, props } from '@ngrx/store';
import { RepoServicePayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-service-payload';

const ADD_REPO_SERVICE = '[REPO_SERVICE] add REPO_SERVICE initial',
ADD_REPO_SERVICE_SUCCESS = '[REPO_SERVICE] add REPO_SERVICE success',
ADD_REPO_SERVICE_FAILURE = '[REPO_SERVICE] add REPO_SERVICE failure',

UPDATE_REPO_SERVICE = '[REPO_SERVICE] update REPO_SERVICE initial',
UPDATE_REPO_SERVICE_SUCCESS = '[REPO_SERVICE] update REPO_SERVICE success',
UPDATE_REPO_SERVICE_FAILURE = '[REPO_SERVICE] update REPO_SERVICE failure',

GET_REPO_SERVICE_BY_ID = '[REPO_SERVICE] get REPO_SERVICE by id initial',
GET_REPO_SERVICE_BY_ID_SUCCESS = '[REPO_SERVICE] get REPO_SERVICE by id success',
GET_REPO_SERVICE_BY_ID_FAILURE = '[REPO_SERVICE] get REPO_SERVICE by id failure',

DELETE_REPO_SERVICE = '[REPO_SERVICE] delete REPO_SERVICE initial',
DELETE_REPO_SERVICE_SUCCESS = '[REPO_SERVICE] delete REPO_SERVICE success',
DELETE_REPO_SERVICE_FAILURE = '[REPO_SERVICE] delete REPO_SERVICE failure',
TABLE_DATA = '[REPO] table data',
CLEAR_DATA = '[REPO] clear data';


export const addRepoService =   createAction(ADD_REPO_SERVICE, props<{ payload: RepoServicePayload }>());
export const addRepoServiceSuccess =  createAction(ADD_REPO_SERVICE_SUCCESS, props<{ payload : any }>());
export const addRepoServiceFailure =  createAction(ADD_REPO_SERVICE_FAILURE, props<{ message : any }>());

export const updateRepoService =  createAction(UPDATE_REPO_SERVICE, props<{ payload: RepoServicePayload }>());
export const updateRepoServiceSuccess =  createAction(UPDATE_REPO_SERVICE_SUCCESS, props<{ payload : any }>());
export const updateRepoServiceFailure =  createAction(UPDATE_REPO_SERVICE_FAILURE, props<{ message : any }>());

export const getRepoServiceById =  createAction(GET_REPO_SERVICE_BY_ID, props<{ payload : { id: any } }>());
export const getRepoServiceByIdSuccess =  createAction(GET_REPO_SERVICE_BY_ID_SUCCESS, props<{ payload: any }>());
export const getRepoServiceByIdFailure =  createAction(GET_REPO_SERVICE_BY_ID_FAILURE, props<{ message : any }>());

export const deleteRepoService =  createAction(DELETE_REPO_SERVICE, props<{ payload : { id : any } }>());
export const deleteRepoServiceSuccess =  createAction(DELETE_REPO_SERVICE_SUCCESS, props<{ payload: any }>());
export const deleteRepoServiceFailure =  createAction(DELETE_REPO_SERVICE_FAILURE, props<{ message : any }>());

export const tableData = createAction(TABLE_DATA);

export const clearData = createAction(CLEAR_DATA);
