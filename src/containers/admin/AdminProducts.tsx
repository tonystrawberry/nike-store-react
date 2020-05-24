import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AdminState, Product } from '../../types';
import { showNotificationWithTimeout, updateAdminProducts } from '../../redux/actions';

import './AdminProducts.scss';
import { authHeader } from '../../utils/auth';
import AdminProduct from '../../components/AdminProduct';
import { Link, Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AdminNewProduct from './AdminNewProduct';

const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    products: state.admin.products
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message),
    updateAdminProducts: (products: Product[]) => dispatch(updateAdminProducts(products)),

  }
}
interface IAdminProductsProps {
  products: Product[],
  showNotificationWithTimeout: {(type: string, message: string): void},
  updateAdminProducts: {(products: Product[]): void}
}

interface IAdminProductsState {
  
}

class AdminProducts extends PureComponent<IAdminProductsProps, IAdminProductsState> {

  componentDidMount() {
    fetch('/api/products', { headers: authHeader()})
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    })
    .then((body: any) => {
      console.log("body", body)
      this.props.updateAdminProducts(body)
    }).catch(error => {
      this.props.showNotificationWithTimeout('error', 'Could not get admin products. Please refresh the page.')
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/admin/products/new">
            <AdminNewProduct />
          </Route>
          <Route path="/admin/products">
            <div className="admin-products__container admin-main__container">
              <h1>YOUR PRODUCTS</h1>
              <Link className="button add-new" to="/admin/products/new">Add new</Link>
              <div className="admin-products__products-table">
                {this.props.products.map((product: Product) => 
                  <AdminProduct product={product} />
                )}

              </div>
            </div>
          </Route>
        </Switch>
      </Router>
      
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);