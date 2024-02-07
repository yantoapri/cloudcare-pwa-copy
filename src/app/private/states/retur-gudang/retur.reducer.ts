import { ReturGudang } from 'src/app/private/models/class-payload-api/gudang-transaksi/retur-gudang-payload'
import { Action, createReducer, on } from '@ngrx/store';
import * as returActions from './retur.action'




export interface State {
    retur: ReturGudang | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}
const initialState: State = {
    retur: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}

const _returReducers  = createReducer(
    initialState,

    on(returActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(returActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    on(returActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    // on(returActions.addResepInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    // on(returActions.addResepSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    // on(returActions.addResepFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    // on(returActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    // on(returActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
    // on(returActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    // on(returActions.getByIdInitial, (state, action) => ({ ...state, retur: new ReturGudang , errorMessage: null, isEdit: false, reloadTable: false })),
    // on(returActions.getByIdSuccess, (state, action) => ({ ...state, retur: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
    // on(returActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(returActions.deleteInitial, (state, action) => ({ ...state, retur: new ReturGudang , errorMessage: null, isEdit: false, reloadTable: false })),
    on(returActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
    on(returActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(returActions.tableData, (state, action) => ({ ...state, retur: new ReturGudang , reloadTable: true })),
    on(returActions.clearData, (state, action) => ({
        ...state,
        retur: new ReturGudang ,
        isLoadingButton: false,
        errorMessage: null,
        reloadTable: false,
        submitButton: false,
        isEdit: false
    })
    ),
)


export function returReducers (state: State, action: Action) {
    return _returReducers (state, action)
}
