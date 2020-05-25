import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ProductOverview from '../components/ProductOverview';
import Loading from '../components/Loading';

import { ProductOverviewState, Product } from '../types';

import './ProductOverviewContainer.scss';
import { fetchProducts, fetchProductsSuccess, fetchProductsError, showNotificationWithTimeout } from '../redux/actions';

const ProductCardLazy = React.lazy(() => import('../components/ProductCard'));

const mapStateToProps = (state: { productOverview : ProductOverviewState }) => {
  return {
    selected: state.productOverview.selected,
    loading: state.productOverview.loading,
    products: state.productOverview.products,
    selectedProductId: state.productOverview.selectedProductId
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductsSuccess: (products: Product[]) => dispatch(fetchProductsSuccess(products)),
    fetchProductsError: () => dispatch(fetchProductsError()),
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message)
  }
}
interface IProductOverviewContainerProps {
  selected: boolean,
  loading: boolean,
  products: Product[],
  selectedProductId: string | null,
  fetchProducts: {(): void},
  fetchProductsSuccess: {(products: Product[]): void},
  fetchProductsError: {(): void},
  showNotificationWithTimeout: {(type: string, message: string): void}
}

interface IProductOverviewContainerState {
  
}

class ProductOverviewContainer extends PureComponent<IProductOverviewContainerProps, IProductOverviewContainerState> {

  componentDidMount(){
    this.fetchShopProducts()
  }

  fetchShopProducts(){
    this.props.fetchProducts()
    fetch('/api/products')
    .then(res => {
      if (!res.ok) throw new Error(res.statusText)
      return res.text()
    })
    .then((body: any) => {
      this.props.fetchProductsSuccess(JSON.parse(body))
    })
    .catch(error => {
      this.props.showNotificationWithTimeout('error', 'Products fetch failed. Please refresh the page or login again.')
    });
  }

  render() {

    if (this.props.loading){
      return(
        <div className="product-overview__container">
          <Loading />
        </div>
      )
    }

    var product = this.props.products.find(product => product._id === this.props.selectedProductId)

    return (
      <div className={`product-overview__container ${this.props.selected ? 'product-selected' : ''}`}>
        {!this.props.selected ?
          <React.Fragment>
            {this.props.products.map((product: Product) => {
              return <ProductOverview product={product}/>
            })}
          </React.Fragment>
          : ( this.props.selectedProductId != null ? 
            <Suspense fallback={<Loading />}>
              <ProductCardLazy new={false} product={product}/>
            </Suspense>
            :
            <Loading />
          )
        }
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverviewContainer);