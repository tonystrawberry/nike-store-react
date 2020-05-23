import {
  CHANGE_PROFILE_INPUT,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_ADMIN_PRODUCTS
} from './constants';

import { AdminState, Action, AdminProfile } from '../types'

const initialStateOverview : AdminState = {
  loading: true,
  profile: {
    fullName: '',
    username: '',
    email: '',
    password: ''
  },
  products: [],
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
      return {...state, user: action.payload, loading: false }
    case LOGOUT_USER:
      return {...state, user: null, loading: false }
    case UPDATE_ADMIN_PRODUCTS:
      return {...state, products: action.payload}
    default:
      return state
  }
}