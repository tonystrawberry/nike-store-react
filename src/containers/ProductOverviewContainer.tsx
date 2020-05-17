import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ProductOverview from '../components/ProductOverview';
import Loading from '../components/Loading';

import { State, Product } from '../types';

import './ProductOverviewContainer.css';
import { fetchProducts, fetchProductsSuccess, fetchProductsError } from '../redux/actions';

const ProductCardLazy = React.lazy(() => import('../components/ProductCard'));

const mapStateToProps = (state: { selectProduct : State }) => {
  return {
    selected: state.selectProduct.selected,
    loading: state.selectProduct.loading,
    products: state.selectProduct.products
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    fetchProductsSuccess: (products: Product[]) => dispatch(fetchProductsSuccess(products)),
    fetchProductsError: () => dispatch(fetchProductsError()),
  }
}
interface IProductOverviewContainerProps {
  selected: boolean,
  loading: boolean,
  products: Product[],
  fetchProducts: {(): void},
  fetchProductsSuccess: {(products: Product[]): void},
  fetchProductsError: {(): void}
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

    return (
      <div className={`product-overview__container ${this.props.selected ? 'product-selected' : ''}`}>
        {!this.props.selected ?
          <React.Fragment>
            {this.props.products.map((product: Product) => {
              return <ProductOverview product={product}/>
            })}
          </React.Fragment>
          :
          <Suspense fallback={<Loading />}>
            <ProductCardLazy new={false} />
          </Suspense>
        }
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverviewContainer);