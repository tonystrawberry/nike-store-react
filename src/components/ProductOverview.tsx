import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectProduct } from '../redux/actions';
import { Dispatch } from 'redux';

import NikeAirForceSmall from '../assets/nike_airforce-small.jpg';

import './ProductOverview.css';

const mapStateToProps = () => {
  return {

  }
}

interface IProductOverviewProps {
  onSelected: {( productId : number): void}
}

interface IProductOverviewState {
  
}

const mapDispatchToProps = (dispatch : Dispatch) => {
  return {
    onSelected: (productId : number) => dispatch(selectProduct(productId))
  }
}

class ProductOverview extends PureComponent<IProductOverviewProps, IProductOverviewState> {
  render() {
    return (
      <div className="product-overview" onClick={() => this.props.onSelected(1)}>
        <div className="product-photo__container">
          <img className="product-photo" src={NikeAirForceSmall} srcSet={`${NikeAirForceSmall} 216w`} alt="Nike Air Force"></img>
        </div>
        <div className="product-overview__info">
          <h1 className="product-overview__title">Nike Air Force 1</h1>
          <div className="product-overview__type">Men's Shoe</div>
          <div className="product-overview__type">2 Colors</div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverview);