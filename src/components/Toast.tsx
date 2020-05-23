import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './Toast.scss';
import { SingleToast, ToastState } from '../types';
import close from '../assets/close.svg';
import { hideToast } from '../redux/actions';

const mapStateToProps = (state: { toast: ToastState }) => {
  return {
    toasts: state.toast.toasts
  }
}

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    hideToast: (id: number) => dispatch(hideToast(id))
  }
}

interface IToastProps {
  toasts: SingleToast[],
  hideToast: {(id: number): void}
}


const Toast = (props: IToastProps) => {
  return (
    <ul className="toast__container">
      { props.toasts.map((toast: SingleToast) => {
        const { id, type, message } = toast;
        return (
          <li className="toast">
            <p className={`toast__content ${type == 'success' ? 'success' : 'error'}`}>
              { message }
            </p>
            <img width="20px" src={close} onClick={() => props.hideToast(id)}></img>
          </li>
        );
      }) }
    </ul>
  );

};

export default connect(mapStateToProps, mapDispatchToProps)(Toast);