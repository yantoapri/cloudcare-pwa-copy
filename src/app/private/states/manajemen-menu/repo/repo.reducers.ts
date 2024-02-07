import { Action, createReducer, on } from '@ngrx/store';
import * as RepoActions from './repo.actions'
import { RepoPayload } from 'src/app/private/models/class-payload-api/manajemen-menu/repo-payload'

export interface State {
  repo : RepoPayload | null
  isLoadingButton : boolean
  errorMessage : any | null
  reloadTable : boolean
  submitButton : boolean
  isEdit: boolean
}

const initialState : State = {
  repo : null,
  isLoadingButton : false,
  errorMessage : null,
  reloadTable : false,
  submitButton : false,
  isEdit: false
}

const _repoReducers = createReducer(initialState,

  on( RepoActions.addRepo, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit: false}) ),
  on( RepoActions.addRepoSuccess, (state, action) => ({...state, repo: action.payload, isLoadingButton: false, isEdit: false,errorMessage : null, reloadTable : true }) ),
  on( RepoActions.addRepoFailure, (state, action) => ({...state, errorMessage : action.message, isEdit: false }) ),

  on( RepoActions.updateRepo, (state, action) => ({...state, isLoadingButton: true, errorMessage : null, isEdit: false }) ),
  on( RepoActions.updateRepoSuccess, (state, action) => ({...state, reloadTable : true, repo : action.payload, errorMessage: null, isLoadingButton: false,}) ),
  on( RepoActions.updateRepoFailure, (state, action) => ({...state, isLoadingButton: false, errorMessage: action.message }) ),

  on( RepoActions.getRepoById, (state, action) => ({...state, repo : new RepoPayload, isEdit: false, reloadTable: false }) ),
  on( RepoActions.getRepoByIdSuccess, (state, action) => ({...state, repo: action.payload, isLoadingButton: false, errorMessage: null, isEdit: true, reloadTable: false }) ),
  on( RepoActions.getRepoByIdFailure, (state, action) => ({...state, errorMessage: action.message, isLoadingButton: false, isEdit: false, reloadTable: false}) ),

  on( RepoActions.deleteRepo, (state, action) => ({...state, repo : new RepoPayload, errorMessage: null, isEdit: false }) ),
  on( RepoActions.deleteRepoSuccess, (state, action) => ({...state, reloadTable : true, repo: action.payload }) ),
  on( RepoActions.deleteRepoFailure, (state, action) => ({...state, reloadTable: false, errorMessage : action.message  }) ),

  on( RepoActions.tableData, (state, action) => ({...state, reloadTable : true }) ),
  on( RepoActions.clearData, (state, action) => ({...state, repo: new RepoPayload, errorMessage: null, isEdit: false, reloadTable: false, isLoadingButton : false}) )


)
export function repoReducers(state : State, action : Action) : any {
  return _repoReducers(state, action)
}
