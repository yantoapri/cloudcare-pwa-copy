import { AssessmentPayload } from 'src/app/private/models/class-payload-api/master-data/assessment-payload';
import { createAction, props, UPDATE } from '@ngrx/store';


const ADD_INITIAL = '[ASSESSMENT] add initial',
ADD_SUCCESS = '[ASSESSMENT] add success',
ADD_FAILURE = '[ASSESSMENT] add failure ',
UPDATE_INITIAL = '[ASSESSMENT] update initial',
UDPATE_SUCCESS = '[ASSESSMENT] update success',
UPDATE_FAILURE = '[ASSESSMENT] update failure',
GET_BYID_INITIAL = '[ASSESSMENT] get byid initial',
GET_BYID_SUCCESS = '[ASSESSMENT] get byid success',
GET_BYID_FAILURE = '[ASSESSMENT] get byid failure',
DELETE_INITIAL = '[ASSESSMENT] delete initial',
DELETE_SUCCESS = '[ASSESSMENT] delete success',
DELETE_FAILURE = '[ASSESSMENT] delete failure',

CLEAR_DATA = '[ASSESSMENT] clear data ',
TABLE_DATA = '[ASSESSMENT] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload : AssessmentPayload }>() );
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>() );
export const addFailure = createAction(ADD_FAILURE, props<{ message : any }>() );

export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload : AssessmentPayload }>() );
export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>() );
export const updateFailure = createAction(UPDATE_FAILURE, props<{ message : any }>() );

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id : any } }>() );
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload : AssessmentPayload }>() );
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message : any }>() );

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id : any } }>() );
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload : any }>() );
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message : any }>() );

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
