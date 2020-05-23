import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './ProductOverview.scss';
import '../containers/admin/AdminProducts.scss';
import Logo from '../assets/nike_logo.svg';
import NikeAirForceMedium from '../assets/nike_airforce-medium.jpg';
import NikeAirForceLarge from '../assets/nike_airforce-large.jpg';
import { Product } from '../types';
import Loading from './Loading';
import { numberToPrice } from '../utils/utils';


const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    
  }
}

interface IAdminProductProps {
  product: Product
  
}

interface IAdminProductState {
  
}


class AdminProduct extends PureComponent<IAdminProductProps, IAdminProductState> {
  
  render() {      
    return (
      <div className="admin-products__product-item">
        <div className="prd-image">
          <img src={this.props.product.imageUrl} 
              alt="Product Photography" className="product-card__photo"/>
        </div>
        <div className="prd-title">
          <div className="-title">{this.props.product.title}</div>
          <div className="-subtitle1">{this.props.product.subtitle1}</div>
          <div className="-subtitle2">{this.props.product.subtitle2}</div>
        </div>
        <div className="prd-price">
          <div>¥ {numberToPrice(this.props.product.price)}</div>
        </div>
         
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);