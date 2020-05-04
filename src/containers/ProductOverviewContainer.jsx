import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import ProductOverview from '../components/ProductOverview';
import Loading from '../components/Loading';

import './ProductOverviewContainer.css';

const ProductCardLazy = React.lazy(() => import('../components/ProductCard'));

const mapStateToProps = (state) => {
  return {
    selected: state.selectProduct.selected,
    selectedProductId: state.selectProduct.selectedProductId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

class ProductOverviewContainer extends PureComponent {

  render() {
    return (
      <div className={`product-overview__container ${this.props.selected ? 'product-selected' : ''}`}>
        {!this.props.selected ?
          <React.Fragment>
            <ProductOverview />
            <ProductOverview />
            <ProductOverview />
            <ProductOverview />
            <ProductOverview />
            <ProductOverview />
          </React.Fragment>
          :
          <Suspense fallback={<Loading />}>
            <ProductCardLazy />
          </Suspense>
        }
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverviewContainer);