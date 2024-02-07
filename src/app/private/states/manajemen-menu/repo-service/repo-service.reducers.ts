import { RepoServicePayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-service-payload';
import * as RepoServiceActions from './repo-service.actions'
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  repoService : RepoServicePayload | null
  isLoadingButton : boolean
  errorMessage : any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit: boolean
}

const initialState : State = {
  repoService : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit: false
}

const _repoServiceReducers = createReducer(initialState,

on( RepoServiceActions.addRepoService, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit: false }) ),
on( RepoServiceActions.addRepoServiceSuccess, (state, action) => ({...state, repoService: action.payload, isLoadingButton: false, isEdit: false,errorMessage : null, reloadTable : true }) ),
on( RepoServiceActions.addRepoServiceFailure, (state, action) => ({...state, errorMessage : action.message, isEdit: false }) ),

on( RepoServiceActions.updateRepoService, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit: false }) ),
on( RepoServiceActions.updateRepoServiceSuccess, (state, action) => ({...state, repoService : action.payload, reloadTable : true, errorMessage: null, isLoadingButton: false }) ),
on( RepoServiceActions.updateRepoServiceFailure, (state, action) => ({...state, isLoadingButton: false, errorMessage: action.message }) ),

on( RepoServiceActions.getRepoServiceById, (state, action) => ({...state, repoService : new RepoServicePayload, isEdit: false, reloadTable: false}) ),
on( RepoServiceActions.getRepoServiceByIdSuccess, (state, action) => ({...state, repoService: action.payload, isLoadingButton: false, errorMessage: null, isEdit: true, reloadTable: false}) ),
on( RepoServiceActions.getRepoServiceByIdFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton: false, isEdit: false, reloadTable: false}) ),

on( RepoServiceActions.deleteRepoService, (state, action) => ({...state, repoService : new RepoServicePayload, errorMessage: null, isEdit: false}) ),
on( RepoServiceActions.deleteRepoServiceSuccess, (state, action) => ({...state, reloadTable : true, repoService: action.payload}) ),
on( RepoServiceActions.deleteRepoServiceFailure, (state, action) => ({...state, reloadTable: false, errorMessage : action.message}) ),

on( RepoServiceActions.tableData, (state, action) => ({...state, reloadTable : true }) ),
on( RepoServiceActions.clearData, (state, action) => ({...state, repoService: new RepoServicePayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) )


)

export function repoServiceReducers(state : State, action : Action) : any {
  return _repoServiceReducers(state, action)
}
