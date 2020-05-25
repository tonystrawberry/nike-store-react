import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectProduct } from '../redux/actions';
import { Dispatch } from 'redux';

import './ProductOverview.scss';
import { Product } from '../types';

const mapStateToProps = () => {
  return {

  }
}

interface IProductOverviewProps {
  onSelected: {( productId : string): void},
  product: Product
}

interface IProductOverviewState {
  
}

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    onSelected: (productId : string) => dispatch(selectProduct(productId))
  }
}

class ProductOverview extends PureComponent<IProductOverviewProps, IProductOverviewState> {
  render() {
    return (
      <div className="product-overview" onClick={() => this.props.onSelected(this.props.product._id)}>
        <div className="product-photo__container">
          <img className="product-photo" src={this.props.product.imageUrl} alt="Nike Air Force"></img>
        </div>
        <div className="product-overview__info">
          <h1 className="product-overview__title">{this.props.product.title}</h1>
          <div className="product-overview__type">{this.props.product.subtitle1}</div>
          <div className="product-overview__type">{this.props.product.subtitle2}</div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);