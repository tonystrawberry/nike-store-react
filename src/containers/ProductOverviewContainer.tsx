import React, { PureComponent, lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import ProductOverview from '../components/ProductOverview';
import Loading from '../components/Loading';

import { State } from '../types';

import './ProductOverviewContainer.css';

const ProductCardLazy = React.lazy(() => import('../components/ProductCard'));

const mapStateToProps = (state: { selectProduct : State }) => {
  return {
    selected: state.selectProduct.selected,
    selectedProductId: state.selectProduct.selectedProductId
  }
}

interface IProductOverviewContainerProps {
  selected: boolean
}

interface IProductOverviewContainerState {
  
}

class ProductOverviewContainer extends PureComponent<IProductOverviewContainerProps, IProductOverviewContainerState> {

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
            <ProductCardLazy new={false} />
          </Suspense>
        }
      </div>
    );
  }
};

export default connect(mapStateToProps)(ProductOverviewContainer);