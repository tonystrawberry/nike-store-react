import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AdminState } from '../../types';

import './AdminProducts.css';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
  }
}
interface IAdminProductsProps {
  
}

interface IAdminProductsState {
  
}

class AdminProducts extends PureComponent<IAdminProductsProps, IAdminProductsState> {

  render() {
    return (
      <div className="admin-products__container">
       
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);