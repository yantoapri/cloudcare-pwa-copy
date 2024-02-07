import { stokPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as StokActions from './stok-obat.action'




export interface State {
    Stok: stokPayload | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}
const initialState: State = {
    Stok: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}

const _StokReducers = createReducer(
    initialState,

    on(StokActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(StokActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    on(StokActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    // on(StokActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    // on(StokActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
    // on(StokActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(StokActions.getByIdInitial, (state, action) => ({ ...state, Stok: new stokPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(StokActions.getByIdSuccess, (state, action) => ({ ...state, Stok: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
    on(StokActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(StokActions.deleteInitial, (state, action) => ({ ...state, Stok: new stokPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(StokActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
    on(StokActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(StokActions.tableData, (state, action) => ({ ...state, Stok: new stokPayload, reloadTable: true })),
    on(StokActions.clearData, (state, action) => ({
        ...state,
        Stok: new stokPayload,
        isLoadingButton: false,
        errorMessage: null,
        reloadTable: false,
        submitButton: false,
        isEdit: false
    })
    ),
)


export function StokReducers(state: State, action: Action) {
    return _StokReducers(state, action)
}
