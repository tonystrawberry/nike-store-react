import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import './AdminNewProduct.scss'
import dummySquare from '../../assets/dummy_square.png'
import { numberToPrice, isInteger } from '../../utils/utils'
import { authHeader } from '../../utils/auth'
import { showNotificationWithTimeout, updateSingleAdminProduct } from '../../redux/actions'
import { Redirect } from 'react-router-dom'
import { Product, AdminState } from '../../types'


const mapStateToProps = (state: { admin : AdminState }) => {
  return {
    products: state.admin.products
  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message),
    updateSingleAdminProduct: (product: Product) => dispatch(updateSingleAdminProduct(product))
    
  }
}

interface IAdminNewProductState {
  id: string,
  loading: boolean,
  title: string,
  subtitle1: string,
  subtitle2: string,
  price: number | null,
  priceString: string,
  description: string,
  imageUrl: string,
  imageFile: Blob | null,
  productUpdated: boolean
}

class AdminUpdateProduct extends PureComponent<any, IAdminNewProductState> {
  fileInput: HTMLInputElement | null

  constructor(props: any){
    super(props)

    this.fileInput = null
   
    this.state = {
      id: '',
      loading: true,
      title: '',
      subtitle1: '',
      subtitle2: '',
      price: null,
      priceString: '',
      description: '',
      imageUrl: '',
      imageFile: null,
      productUpdated: false
    }
  }

  componentDidMount() {
    console.log("this.props.match.params.id", this.props.match.params.id)
    console.log("this.props.products", this.props.products)

    var product = this.props.products.find((product: Product) => { return product._id === this.props.match.params.id})
    if (product != null){
      this.setState({
        id: product._id,
        loading: false,
        title: product.title,
        subtitle1: product.subtitle1,
        subtitle2: product.subtitle2,
        price: product.price,
        priceString: numberToPrice(product.price),
        description: product.description,
        imageUrl: product.imageUrl,
        imageFile: null,
        productUpdated: false
      })
    }
  }  

  setPrice(priceString: string){
    if (!isInteger(priceString)){
      this.setState({price: null, priceString: priceString})
      return
    }

    this.setState({price: parseInt(priceString), priceString: priceString})
  }

  triggerInputFile(e: React.FormEvent){
    e.preventDefault()
    if (this.fileInput)
      this.fileInput.click()
  }

  onImageChange(e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files && e.target.files[0]) {
      this.setState({
        imageUrl: URL.createObjectURL(e.target.files[0]),
        imageFile: e.target.files[0]
      })
    }
  }

  onSubmit(e: React.FormEvent){
    e.preventDefault()

    this.setState({ loading: true })

    let product = new FormData()
    product.append('id', this.state.id)
    product.append('title', this.state.title)
    product.append('subtitle1', this.state.subtitle1)
    product.append('subtitle2', this.state.subtitle2)
    product.append('price', this.state.price?.toString() as string)
    product.append('description', this.state.description)
    if (this.state.imageFile != null)
      product.append('image', this.state.imageFile as Blob, 'product-image')

    fetch('/api/products', { 
      method: 'put', 
      body: product,
      headers: {
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

      console.log("body", body)

      this.props.showNotificationWithTimeout('success', 'Product has been updated.')
      this.props.updateSingleAdminProduct(body)
      this.setState({ productUpdated: true, loading: false })
    }).catch(error => {
      this.props.showNotificationWithTimeout('error', 'Could not update new product. Please try again.')
      this.setState({ loading: false })
    })
  }

  
  render() {     
    if (this.state.productUpdated){
      return <Redirect to='/admin/products'/>
    }
    
    return (
      <div className="admin-products__new-product-container admin-main__container">
        <h1>UPDATE PRODUCT</h1>
        <div className="admin-products__new-product">
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className="form-group"><label>Title</label><input type="text" value={this.state.title} onChange={(e) => {
              console.log(e.target.value)
              this.setState({ title: e.target.value })}
             } required placeholder="Title" /></div>
            <div className="form-group"><label>Subtitle 1</label><input type="text" value={this.state.subtitle1} onChange={(e) => this.setState({ subtitle1: e.target.value })} required placeholder="Subtitle 1" /></div>
            <div className="form-group"><label>Subtitle 2</label><input type="text" value={this.state.subtitle2} onChange={(e) => this.setState({ subtitle2: e.target.value })} required placeholder="Subtitle 2" /></div>
            <div className="form-group"><label>Price</label><input type="text" value={this.state.priceString} onChange={(e) => this.setPrice(e.target.value)} required placeholder="Price" /></div>
            <div className="form-group"><label>Description</label><textarea value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} required placeholder="Description" /></div>
            <div className="form-group">
              <label>Image</label>
              <div className="image__container">
                <input ref={(fileInput) => this.fileInput = fileInput} onChange={(e) => this.onImageChange(e)} type="file" />
                <div className="image__subContainer">
                  <button className={`button -small ${this.state.imageUrl !== dummySquare ? '' : 'noImage'}`} onClick={(e) => this.triggerInputFile(e) }>Add Image</button>
                  <div className="image" style={{backgroundImage: `url("${this.state.imageUrl}")`}}>

                  </div>
                </div>
              </div>
            </div>
            
            <button className="button -large" disabled={this.state.loading} type="submit">Submit</button>
           </form>
         </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminUpdateProduct)