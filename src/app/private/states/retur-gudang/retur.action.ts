
import { ReturGudang} from "src/app/private/models/class-payload-api/gudang-transaksi/retur-gudang-payload";
import { createAction, props } from '@ngrx/store';


const ADD_INITIAL = '[RETUR GUDANG] add initial',
    ADD_SUCCESS = '[RETUR GUDANG] add success',
    ADD_FAILURE = '[RETUR GUDANG] add failure ',
    ADD_RESEP_INITIAL = '[RETUR GUDANG] add initial',
    ADD_RESEP_SUCCESS = '[RETUR GUDANG] add success',
    ADD_RESEP_FAILURE = '[RETUR GUDANG] add failure ',
    UPDATE_INITIAL = '[RETUR GUDANG] update initial',
    UDPATE_SUCCESS = '[RETUR GUDANG] update success',
    UPDATE_FAILURE = '[RETUR GUDANG] update failure',
    GET_BYID_INITIAL = '[RETUR GUDANG] get byid initial',
    GET_BYID_SUCCESS = '[RETUR GUDANG] get byid success',
    GET_BYID_FAILURE = '[RETUR GUDANG] get byid failure',
    DELETE_INITIAL = '[RETUR GUDANG] delete initial',
    DELETE_SUCCESS = '[RETUR GUDANG] delete success',
    DELETE_FAILURE = '[RETUR GUDANG] delete failure',

    CLEAR_DATA = '[RETUR GUDANG] clear data ',
    TABLE_DATA = '[RETUR GUDANG] table data';


export const addInitial = createAction(ADD_INITIAL, props<{ payload: ReturGudang }>());
export const addSuccess = createAction(ADD_SUCCESS, props<{ payload: any }>());
export const addFailure = createAction(ADD_FAILURE, props<{ message: any }>());

// export const updateInitial = createAction(UPDATE_INITIAL, props<{ payload: any }>());
// export const updateSuccess = createAction(UDPATE_SUCCESS, props<{ payload: any }>());
// export const updateFailure = createAction(UPDATE_FAILURE, props<{ message: any }>());

export const getByIdInitial = createAction(GET_BYID_INITIAL, props<{ payload: { id: any } }>());
export const getByIdSuccess = createAction(GET_BYID_SUCCESS, props<{ payload: ReturGudang }>());
export const getByIdFailure = createAction(GET_BYID_FAILURE, props<{ message: any }>());

export const deleteInitial = createAction(DELETE_INITIAL, props<{ payload: { id: any } }>());
export const deleteSuccess = createAction(DELETE_SUCCESS, props<{ payload: any }>());
export const deleteFailure = createAction(DELETE_FAILURE, props<{ message: any }>());

export const clearData = createAction(CLEAR_DATA);
export const tableData = createAction(TABLE_DATA);
