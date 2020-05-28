import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import './ProductOverview.scss';
import '../containers/admin/AdminProducts.scss';
import close from '../assets/close_black.svg';
import { Product } from '../types';
import { numberToPrice } from '../utils/utils';
import { deleteAdminProduct, showNotificationWithTimeout, fetchStoreProducts } from '../redux/actions';
import { authHeader } from '../utils/auth';
import { NavLink } from 'react-router-dom';


const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    deleteAdminProduct: (id: string) => { dispatch(deleteAdminProduct(id))},
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message),
    fetchStoreProducts: () => fetchStoreProducts(dispatch)
  }
}

interface IAdminProductProps {
  product: Product,
  deleteAdminProduct: {(id:string): void},
  showNotificationWithTimeout: {(type: string, message: string): void},
  fetchStoreProducts: {(): void}
}

interface IAdminProductState {
  
}


class AdminProduct extends PureComponent<IAdminProductProps, IAdminProductState> {
  
  constructor(props: IAdminProductProps){
    super(props)
    this.state = {
      loading: false
    }
  }

  deleteProduct(){
    fetch('/api/products', { 
      method: 'delete', 
      body: JSON.stringify({id: this.props.product._id}),
      headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...authHeader()
      }
    }).then((res) => { 
      return res.json().then(json => ({status: res.status, body: json}))
    }).then((data) => {
      const status = data.status
      const body = data.body

      if (status !== 200) {
        this.props.showNotificationWithTimeout('error', body.errors[0].title)
        this.setState({ loading: false })
        return
      }

      this.props.showNotificationWithTimeout('success', 'Product has been deleted.')
      this.props.deleteAdminProduct(this.props.product._id)
      this.props.fetchStoreProducts()
    }).catch(error => {
      this.props.showNotificationWithTimeout('error', 'Could not delete product. Please try again.')
      this.setState({ loading: false })
    })
  }

  render() {      
    return (
      <NavLink className="admin-products__link" to={`/admin/products/${this.props.product._id}`}>
      <div className="admin-products__product-item">
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
          <img width="20px" src={close} onClick={(e) => { e.stopPropagation(); e.preventDefault(); this.deleteProduct()}} alt="Delete"></img>
        </div>
      </div>
      </NavLink>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProduct);