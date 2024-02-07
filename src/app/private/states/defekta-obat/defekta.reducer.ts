import { defektaObatPayload } from 'src/app/private/models/class-payload-api/obat/obat-defekta'
import { Action, createReducer, on } from '@ngrx/store';
import * as defektaActions from './defekta.action'




export interface State {
    defekta: defektaObatPayload | null
    isLoadingButton: boolean
    errorMessage: any | null
    reloadTable: boolean
    submitButton: boolean
    isEdit: boolean
}
const initialState: State = {
    defekta: null,
    isLoadingButton: false,
    errorMessage: null,
    reloadTable: false,
    submitButton: false,
    isEdit: false
}

const _defektaObatReducers  = createReducer(
    initialState,

    on(defektaActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(defektaActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, reloadTable: false, errorMessage: null })),
    on(defektaActions.addFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(defektaActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, reloadTable: false, isEdit: false })),
    on(defektaActions.updateSuccess, (state, action) => ({ ...state, reloadTable: false, isLoadingButton: false, errorMessage: null })),
    on(defektaActions.updateFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(defektaActions.getByIdInitial, (state, action) => ({ ...state, defekta: new defektaObatPayload , errorMessage: null, isEdit: false, reloadTable: false })),
    on(defektaActions.getByIdSuccess, (state, action) => ({ ...state, defekta: action.payload, isEdit: true, reloadTable: false, errorMessage: null })),
    on(defektaActions.getByIdFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(defektaActions.deleteInitial, (state, action) => ({ ...state, defekta: new defektaObatPayload , errorMessage: null, isEdit: false, reloadTable: false })),
    on(defektaActions.deleteSuccess, (state, action) => ({ ...state, reloadTable: false, errorMessage: null, isEdit: false })),
    on(defektaActions.deleteFailure, (state, action) => ({ ...state, errorMessage: action.message, reloadTable: false, isLoadingButton: false })),

    on(defektaActions.tableData, (state, action) => ({ ...state, defekta: new defektaObatPayload , reloadTable: true })),
    on(defektaActions.clearData, (state, action) => ({
        ...state,
        defekta: new defektaObatPayload ,
        isLoadingButton: false,
        errorMessage: null,
        reloadTable: false,
        submitButton: false,
        isEdit: false
    })
    ),
)


export function defektaObatReducers (state: State, action: Action) {
    return _defektaObatReducers (state, action)
}
