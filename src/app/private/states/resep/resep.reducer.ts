import { Action, createReducer, on } from '@ngrx/store';
import * as ResepActions from './resep.action'
import { ObatPayload, FinishPayload } from "src/app/private/models/class-payload-api/gudang-transaksi/resep-payload";
// import { obatPayload } from '../../models/class-payload-api/gudang-transaksi/pembelian-payload';


export interface State {
	ObatPayload: ObatPayload | null
	FinishPayload: FinishPayload | null
	isLoadingButton: boolean
	errorMessage: any | null
	reloadTable: boolean
	submitButton: boolean
	isEdit: boolean
}

const initialState: State = {
	ObatPayload: null,
	FinishPayload: null,
	isLoadingButton: false,
	errorMessage: null,
	reloadTable: false,
	submitButton: false,
	isEdit: false
}


const _Resep = createReducer(initialState,
	on(ResepActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
	on(ResepActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: true, ObatPayload: action.payload, reloadTable: false })),
	on(ResepActions.addFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(ResepActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
	on(ResepActions.updateSuccess, (state, action) => ({ ...state, isLoadingButton: true, ObatPayload: action.payload, reloadTable: false })),
	on(ResepActions.updateFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(ResepActions.deleteInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false, ObatPayload: new ObatPayload })),
	on(ResepActions.deleteSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false })),
	on(ResepActions.deleteFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(ResepActions.createInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
	on(ResepActions.createSuccess, (state, action) => ({ ...state, isLoadingButton: true, ObatPayload: action.payload, reloadTable: false })),
	on(ResepActions.createFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(ResepActions.finishInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
	on(ResepActions.finishSuccess, (state, action) => ({ ...state, isLoadingButton: true, ObatPayload: action.payload, reloadTable: false })),
	on(ResepActions.finishFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(ResepActions.cancelInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false, ObatPayload: new ObatPayload })),
	on(ResepActions.cancelSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false })),
	on(ResepActions.cancelFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(ResepActions.tableData, (state, action) => ({ ...state, reloadTable: true })),
	on(ResepActions.clearData, (state, action) => ({ ...state, ObatPayload: new ObatPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton: false })),

);

export function ResepReducers(state: State, action: Action): any {
	return _Resep(state, action)
}
