import {
  CHANGE_PROFILE_INPUT,
  AUTH_USER,
  LOGOUT_USER,
  UPDATE_ADMIN_PRODUCTS,
  DELETE_ADMIN_PRODUCTS,
  UPDATE_SINGLE_ADMIN_PRODUCT
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
    case DELETE_ADMIN_PRODUCTS: {
      let products = state.products.slice()
      products = products.filter( product => (product._id !== action.payload.id))
      return {...state, products: products}
    }
    case UPDATE_SINGLE_ADMIN_PRODUCT: {
      let products = state.products.slice()
      let productIndex = products.findIndex( product => (product._id == action.payload.product._id))
      if (productIndex != -1){
        products[productIndex] = action.payload.product
      } else {
        products.push(action.payload.product)
      }
      return {...state, products: products}
    }
    default:
      return state
  }
}