import {
  CHANGE_PROFILE_INPUT,
  AUTH_USER
} from './constants';

import { AdminState, Action, AdminProfile } from '../types'

const initialStateOverview : AdminState = {
  loading: false,
  profile: {
    fullName: '',
    username: '',
    email: '',
    password: ''
  },
  user: null
}

export const admin = (state: AdminState = initialStateOverview, action: Action = {type: '', payload: null} ) => {
  switch (action.type) {
    case CHANGE_PROFILE_INPUT:
      let profile = state.profile
      let key: keyof AdminProfile = action.payload.key
      profile[key] = action.payload.value
      return {...state, profile }
    case AUTH_USER:
      return {...state, user: action.payload }
    default:
      return state
  }
}