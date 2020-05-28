import React, { Component } from 'react';
import './Cart.scss';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SessionState, ProductOverviewState, Product } from '../../types';
import CartProduct from './CartProduct';

const mapStateToProps = (state: { productOverview: ProductOverviewState, session : SessionState }) => {
  return {
    cart: state.session.cart,
    products: state.productOverview.products
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {}
}

interface ICartProps {
  cart: { products: any[]},
  products: Product[]
}

interface ICartState {
  
}

class Cart extends Component<ICartProps, ICartState> {

  render() {
    return (
      <div className={`cart__container`}>
        <h1>CART</h1>
        <div className="cart__products-container">
          <div className="cart__products-list">
            {this.props.cart.products.map(cartProduct => (
              <CartProduct product={this.props.products.find(product => product._id == cartProduct.id)} />
            ))}
          </div>
          
          <div className="cart__summary-container">
        
          </div>
        </div>
        
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
