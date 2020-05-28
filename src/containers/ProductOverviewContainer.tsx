import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ProductOverview from '../components/ProductOverview';
import Loading from '../components/Loading';

import { ProductOverviewState, Product } from '../types';

import './ProductOverviewContainer.scss';

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
  }
}
interface IProductOverviewContainerProps {
  selected: boolean,
  loading: boolean,
  products: Product[],
  selectedProductId: string | null
}

interface IProductOverviewContainerState {
  
}

class ProductOverviewContainer extends PureComponent<IProductOverviewContainerProps, IProductOverviewContainerState> {
  
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
              return <ProductOverview key={product._id} product={product}/>
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