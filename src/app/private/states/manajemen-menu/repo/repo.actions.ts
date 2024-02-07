import { RepoPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-payload'
import { createAction, props } from '@ngrx/store';

const ADD_REPO = '[REPO] add repo initial',
ADD_REPO_SUCCESS = '[REPO] add repo success',
ADD_REPO_FAILURE = '[REPO] add repo failure',

UPDATE_REPO = '[REPO] update repo initial',
UPDATE_REPO_SUCCESS = '[REPO] update repo success',
UPDATE_REPO_FAILURE = '[REPO] update repo failure',

GET_REPO_BY_ID = '[REPO] get repo by id initial',
GET_REPO_BY_ID_SUCCESS = '[REPO] get repo by id success',
GET_REPO_BY_ID_FAILURE = '[REPO] get repo by id failure',

DELETE_REPO = '[REPO] delete repo initial',
DELETE_REPO_SUCCESS = '[REPO] delete repo success',
DELETE_REPO_FAILURE = '[REPO] delete repo failure',

TABLE_DATA = '[REPO] table data', CLEAR_DATA = '[REPO] clear data';


export const addRepo = createAction(ADD_REPO, props<{ payload : RepoPayload }>());
export const addRepoSuccess = createAction(ADD_REPO_SUCCESS, props<{ payload : any }>());
export const addRepoFailure = createAction(ADD_REPO_FAILURE, props<{ message : any }>());

export const updateRepo = createAction(UPDATE_REPO, props<{ payload : RepoPayload }>());
export const updateRepoSuccess = createAction(UPDATE_REPO_SUCCESS, props<{ payload : any }>());
export const updateRepoFailure = createAction(UPDATE_REPO_FAILURE, props<{ message : any }>());

export const getRepoById = createAction(GET_REPO_BY_ID, props<{ payload : { id : string } }>());
export const getRepoByIdSuccess = createAction(GET_REPO_BY_ID_SUCCESS, props<{ payload : RepoPayload }>());
export const getRepoByIdFailure = createAction(GET_REPO_BY_ID_FAILURE, props<{ message : any }>());

export const deleteRepo = createAction(DELETE_REPO, props<{ payload : { id: string  } }>());
export const deleteRepoSuccess = createAction(DELETE_REPO_SUCCESS, props<{ payload : any }>());
export const deleteRepoFailure = createAction(DELETE_REPO_FAILURE, props<{ message : any }>());

export const tableData = createAction(TABLE_DATA);

export const clearData = createAction(CLEAR_DATA);
