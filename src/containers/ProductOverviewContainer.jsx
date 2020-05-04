import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import ProductOverview from '../components/ProductOverview';
import ProductCard from '../components/ProductCard';

import './ProductOverviewContainer.css';

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

class ProductOverviewList extends PureComponent {

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
          <ProductCard />
        }
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductOverviewList);