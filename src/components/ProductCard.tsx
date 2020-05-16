import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { unselectProduct } from '../redux/actions';
import { Dispatch } from 'redux';

import './ProductOverview.css';
import './ProductCard.css';
import Logo from '../assets/nike_logo.svg';
import NikeAirForceMedium from '../assets/nike_airforce-medium.jpg';
import NikeAirForceLarge from '../assets/nike_airforce-large.jpg';


const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    onUnselected: () => dispatch(unselectProduct())
  }
}

interface IProductCardProps {
  new: boolean,
  onUnselected: {(): void}
}

interface IProductCardState {
  
}


class ProductCard extends PureComponent<IProductCardProps, IProductCardState> {
  constructor(props : IProductCardProps){
    super(props);

    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.wrapperRef = null;
  }

  wrapperRef: HTMLDivElement | null;

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
  setWrapperRef(node : HTMLDivElement | null) : void{
    this.wrapperRef= node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event : Event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target as Node)) {
      this.props.onUnselected();
    }
  }

  updateDimensions() {
    let x = window.matchMedia("(max-width: 1000px)");
    const photo = document.querySelectorAll('.product-card__photo') as NodeListOf<HTMLElement>;
    const pc = document.querySelector('.product-card__photo-container') as HTMLElement;
  
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
            <a href="/" className="product-card__share"><i className="fas fa-share-alt"></i></a>
            <img src={NikeAirForceMedium} 
              srcSet={`${NikeAirForceMedium} 432w, ${NikeAirForceLarge} 864w`} 
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
                <span className="product-card__color" color="blue"></span>
                <span className="product-card__color" color="red"></span>
                <span className="product-card__color" color="green"></span>
                <span className="product-card__color" color="orange"></span>
                <span className="product-card__color" color="black"></span>
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
              <a href="/" className="product-card__buy"><i className="fas fa-shopping-cart"></i>Add to cart</a>
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