import { JadwalStafPayload } from "src/app/private/models/class-payload-api/pengaturan-jadwal/jadwal-staf-payload";

import { JadwalLiburPayload } from "src/app/private/models/class-payload-api/master-data/ruang-dan-jadwal/jadwal-libur-payload";
import { Action, createReducer, on } from '@ngrx/store';
// import * as JadwalLiburActions from './jadwal-libur.actions'
import * as JadwalStafActions from './jadwal-staf.actions'
export interface State {
	jadwalStaf: JadwalStafPayload | null
	isLoadingButton: boolean
	errorMessage: any | null
	reloadTable: boolean
	submitButton: boolean
	isEdit: boolean
}

const initialState: State = {
	jadwalStaf: null,
	isLoadingButton: false,
	errorMessage: null,
	reloadTable: false,
	submitButton: false,
	isEdit: false
}

const _jadwalStafReducers = createReducer(initialState,
	on(JadwalStafActions.addInitial, (state, action) => ({ ...state, isLoadingButton: true, isEdit: false, reloadTable: false })),
	on(JadwalStafActions.addSuccess, (state, action) => ({ ...state, isLoadingButton: false, jadwalStaf: action.payload, errorMessage: null })),
	on(JadwalStafActions.addFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(JadwalStafActions.updateInitial, (state, action) => ({ ...state, isLoadingButton: true, errorMessage: null, isEdit: false, reloadTable: false })),
	on(JadwalStafActions.updateSuccess, (state, action) => ({ ...state, isLoadingButton: false, jadwalStaf: action.payload, isEdit: false, reloadTable: false })),
	on(JadwalStafActions.updateFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(JadwalStafActions.getByIdInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, jadwalStaf: new JadwalStafPayload })),
	on(JadwalStafActions.getByIdSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: true, jadwalStaf: action.payload, reloadTable: false })),
	on(JadwalStafActions.getByIdFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(JadwalStafActions.deleteInitial, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: false, jadwalStaf: new JadwalStafPayload })),
	on(JadwalStafActions.deleteSuccess, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: null, isEdit: false, reloadTable: true })),
	on(JadwalStafActions.deleteFailure, (state, action) => ({ ...state, isLoadingButton: false, errorMessage: action.message, isEdit: false, reloadTable: false })),

	on(JadwalStafActions.tableData, (state, action) => ({ ...state, reloadTable: true })),
	on(JadwalStafActions.clearData, (state, action) => ({ ...state, jadwalStaf: new JadwalStafPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton: false })),
)

export function jadwalStafReducers(state: State, action: Action): any {
	return _jadwalStafReducers(state, action)
}
