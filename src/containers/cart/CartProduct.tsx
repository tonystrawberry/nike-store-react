import React, { Component } from 'react';
import './Cart.scss';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Product } from '../../types';
import { numberToPrice } from '../../utils/utils';
import close from '../../assets/close_black.svg';
import { deleteProductFromCart } from '../../redux/actions';

const mapStateToProps = (state: {  }) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    deleteProductFromCart: (id: string) => dispatch(deleteProductFromCart(id))
  }
}

interface ICartProductProps {
  product: Product | undefined,
  deleteProductFromCart: {(id: string): void}
}

interface ICartProductState {
  
}

class CartProduct extends Component<ICartProductProps, ICartProductState> {

  render() {
    if (!this.props.product){
      return <React.Fragment></React.Fragment>
    }

    return (
      <div className="cart__product-item">
        <div className="prd-image">
          <div className="image__container -thumbnail">
            <div className="image__subContainer">
              <div className="image" style={{backgroundImage: `url("${this.props.product.imageUrl}")`}}>

              </div>
            </div>
          </div>
        </div>
        <div className="prd-title">
          <div className="-title">{this.props.product.title}</div>
          <div className="-subtitle1">{this.props.product.subtitle1}</div>
          <div className="-subtitle2">{this.props.product.subtitle2}</div>
        </div>
        <div className="prd-price">
          <div>¥ {numberToPrice(this.props.product.price)}</div>
        </div>
        <div className="prd-actions">
          <img width="20px" src={close} onClick={() => this.props.deleteProductFromCart(this.props.product?._id as string)} alt="Delete"></img>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct);
