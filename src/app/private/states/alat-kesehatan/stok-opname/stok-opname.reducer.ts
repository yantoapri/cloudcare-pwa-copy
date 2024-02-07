import { StokOpnameAlatPayload } from 'src/app/private/models/class-payload-api/gudang-transaksi/stok-opname-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as StokOpnameActions from './stok-opname.action'




export interface State {
    stokOpname: StokOpnameAlatPayload | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}
const initialState: State = {
    stokOpname: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}

const _stokOpnameReducers = createReducer(
    initialState,

    on(StokOpnameActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(StokOpnameActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    on(StokOpnameActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(StokOpnameActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(StokOpnameActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
    on(StokOpnameActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(StokOpnameActions.getByIdInitial, (state, action) => ({ ...state, stokOpname: new StokOpnameAlatPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(StokOpnameActions.getByIdSuccess, (state, action) => ({ ...state, stokOpname: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
    on(StokOpnameActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(StokOpnameActions.deleteInitial, (state, action) => ({ ...state, stokOpname: new StokOpnameAlatPayload, errorMessage: null, isEdit: false, reloadTable: false })),
    on(StokOpnameActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
    on(StokOpnameActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(StokOpnameActions.tableData, (state, action) => ({ ...state, stokOpname: new StokOpnameAlatPayload, reloadTable: true })),
    on(StokOpnameActions.clearData, (state, action) => ({
        ...state,
        stokOpname: new StokOpnameAlatPayload,
        isLoadingButton: false,
        errorMessage: null,
        reloadTable: false,
        submitButton: false,
        isEdit: false
    })
    ),
)


export function stokOpnameReducers(state: State, action: Action) {
    return _stokOpnameReducers(state, action)
}
