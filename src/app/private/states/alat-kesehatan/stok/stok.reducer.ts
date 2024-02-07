import { stokPayload } from 'src/app/private/models/class-payload-api/alat-kesehatan/stok-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as stokActions from './stok.action'




export interface State {
    stok: stokPayload | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}
const initialState: State = {
    stok: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}

const _stokReducers = createReducer(
    initialState,

    on(stokActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(stokActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    on(stokActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(stokActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(stokActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
    on(stokActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(stokActions.getByIdInitial, (state, action) => ({ ...state, stok: new stokPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(stokActions.getByIdSuccess, (state, action) => ({ ...state, stok: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
    on(stokActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(stokActions.deleteInitial, (state, action) => ({ ...state, stok: new stokPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(stokActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
    on(stokActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(stokActions.tableData, (state, action) => ({ ...state, stok: new stokPayload, reloadTable: true })),
    on(stokActions.clearData, (state, action) => ({
        ...state,
        stok: new stokPayload,
        isLoadingButton: false,
        errorMessage: null,
        reloadTable: false,
        submitButton: false,
        isEdit: false
    })
    ),
)


export function stokReducers(state: State, action: Action) {
    return _stokReducers(state, action)
}
