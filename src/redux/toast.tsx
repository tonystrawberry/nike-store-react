import {
  SHOW_TOAST,
  HIDE_TOAST
} from './constants';

import { ToastState, Action } from '../types'

const initialStateOverview : ToastState = {
  toasts: []
}

export const toast = (state: ToastState = initialStateOverview, action: Action = {type: '', payload: null} ) => {
  let toasts = []
  switch (action.type) {
    case SHOW_TOAST:
      
      toasts = state.toasts.slice()
      const type = action.payload.type
      const message = action.payload.message

      let id = 0
      if (toasts.length > 0){
        id = toasts[toasts.length - 1].id + 1
      }
      
      toasts.push({ id: id, type: type, message: message })
      return {...state, toasts: toasts }
    case HIDE_TOAST:
      toasts = state.toasts.slice()
      toasts = toasts.filter( toast => toast.id !== action.payload.id );
      return {...state, toasts: toasts }
    default:
      return state
  }
}