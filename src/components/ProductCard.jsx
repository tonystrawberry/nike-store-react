import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { unselectProduct } from '../redux/actions';


import './ProductOverview.css';
import './ProductCard.css';
import Logo from '../assets/nike_logo.svg';
import NikeAirForceSmall from '../assets/nike_airforce-small.jpg';
import NikeAirForceMedium from '../assets/nike_airforce-medium.jpg';
import NikeAirForceLarge from '../assets/nike_airforce-large.jpg';


const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUnselected: () => dispatch(unselectProduct())
  }
}

class ProductCard extends PureComponent {
  constructor(props){
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    window.addEventListener('resize', this.updateDimensions);
    this.updateDimensions();
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
    window.removeEventListener('resize', this.updateDimensions);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onUnselected();
    }
  }

  updateDimensions() {
    let x = window.matchMedia("(max-width: 1000px)");
    const photo = document.querySelectorAll('.product-card__photo');
    const pc = document.querySelector('.product-card__photo-container');
  
    if (x.matches){
      // shoeBackgroundの新しいheight計算
      let width = photo[0].offsetWidth; // offsetHeight = elementのheight + elementのpadding + elementのborder
      pc.style.height = `${width}px`;
    } else {
      pc.style.height = '475px';
    }
  }

  render() {
    return (
      <div ref={this.setWrapperRef} className="product-card__container">
        <div className="product-card__card">
          <div className="product-card__photo-container">
            <img src={Logo} alt="Nike Logo" className="product-card__logo" />
            <a href="#" className="product-card__share"><i className="fas fa-share-alt"></i></a>
            <img src={NikeAirForceLarge} 
              srcSet={`${NikeAirForceSmall} 216w, ${NikeAirForceMedium} 432w, ${NikeAirForceLarge} 864w`} 
              sizes='(max-width: 500px) 432px, 864px'
              alt="Product Photography" className="product-card__photo"/>
          </div>
          <div className="product-card__info">
            <div className="product-card__name">
              <div>
                <h1 className="big">Nike Air Force 1</h1>
                {this.props.new ? <span className="new">new</span> : null}
              </div>
              <h3 className="small">Men's Shoe</h3>
            </div>
            <div className="product-card__description">
              <p className="product-card__text">The legend lives on in the Nike Air Force 1, which stays true to its roots with iconic AF1 style and Nike Air for all-day comfort and long-lasting wear.</p>
            </div>
            <div className="product-card__color-container">
              <h3 className="product-card__title">Color</h3>
              <div className="product-card__colors">
                <span className="product-card__color" primary="#2175f5" color="blue"></span>
                <span className="product-card__color" primary="#f84848" color="red"></span>
                <span className="product-card__color" primary="#29b864" color="green"></span>
                <span className="product-card__color" primary="#ff5521" color="orange"></span>
                <span className="product-card__color" primary="#444" color="black"></span>
              </div>
            </div>
            <div className="product-card__size-container">
              <h3 className="product-card__title">size</h3>
              <div className="product-card__sizes">
                <span className="product-card__size">7</span>
                <span className="product-card__size">8</span>
                <span className="product-card__size">9</span>
                <span className="product-card__size">10</span>
                <span className="product-card__size">11</span>
              </div>
            </div>
            <div className="product-card__buy-price">
              <a href="#" className="product-card__buy"><i className="fas fa-shopping-cart"></i>Add to cart</a>
              <div className="product-card__price">
                <i className="fas fa-yen-sign"></i>
                <h1>21,000</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);