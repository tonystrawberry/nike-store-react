import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import './AdminNewProduct.scss'
import dummySquare from '../../assets/dummy_square.png'
import { numberToPrice, isInteger } from '../../utils/utils'
import { authHeader } from '../../utils/auth'
import { showNotificationWithTimeout } from '../../redux/actions'
import Loading from '../../components/Loading'
import { Redirect } from 'react-router-dom'


const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = (dispatch : Dispatch ) => {
  return {
    showNotificationWithTimeout: (type: string, message: string) => showNotificationWithTimeout(dispatch, type, message)
  }
}

interface IAdminNewProductProps {
  showNotificationWithTimeout: {(type: string, message: string): void}
}

interface IAdminNewProductState {
  loading: boolean,
  title: string,
  subtitle1: string,
  subtitle2: string,
  price: number | null,
  priceString: string,
  description: string,
  imageUrl: string,
  imageFile: Blob | null,
  productAdded: boolean
}

class AdminNewProductProduct extends PureComponent<IAdminNewProductProps, IAdminNewProductState> {
  fileInput: HTMLInputElement | null

  constructor(props: Readonly<IAdminNewProductProps>){
    super(props)

    this.fileInput = null

    this.state = {
      loading: false,
      title: "",
      subtitle1: "",
      subtitle2: "",
      price: null,
      priceString: "",
      description: "",
      imageUrl: dummySquare,
      imageFile: null,
      productAdded: false
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
    product.append('title', this.state.title)
    product.append('subtitle1', this.state.subtitle1)
    product.append('subtitle2', this.state.subtitle2)
    product.append('price', this.state.price?.toString() as string)
    product.append('description', this.state.description)
    product.append('image', this.state.imageFile as Blob, 'product-image')

    fetch('/api/products', { 
      method: 'post', 
      body: product,
      headers: {
      'Accept': 'application/json',
      ... authHeader()
      }
    }).then((res) => { 
      return res.json().then(json => ({status: res.status, body: json}))
    }).then((data) => {
      const status = data.status
      const body = data.body

      if (status != 200) {
        this.props.showNotificationWithTimeout('error', body.errors[0].title)
        this.setState({ loading: false })
        return
      }

      this.props.showNotificationWithTimeout('success', 'Product has been added.')
      this.setState({ productAdded: true, loading: false })
    }).catch(error => {
      this.props.showNotificationWithTimeout('error', 'Could not add new product. Please try again.')
      this.setState({ loading: false })
    })
  }

  
  render() {     
    if (this.state.productAdded){
      return <Redirect to='/admin/products'/>
    }
    
    return (
      <div className="admin-products__new-product-container admin-main__container">
        <h1>NEW PRODUCT</h1>
        <div className="admin-products__new-product">
          <form onSubmit={(e) => this.onSubmit(e)}>
            <div className="form-group"><label>Title</label><input type="text" value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} required placeholder="Title" /></div>
            <div className="form-group"><label>Subtitle 1</label><input type="text" value={this.state.subtitle1} onChange={(e) => this.setState({ subtitle1: e.target.value })} required placeholder="Subtitle 1" /></div>
            <div className="form-group"><label>Subtitle 2</label><input type="text" value={this.state.subtitle2} onChange={(e) => this.setState({ subtitle2: e.target.value })} required placeholder="Subtitle 2" /></div>
            <div className="form-group"><label>Price</label><input type="text" value={this.state.priceString} onChange={(e) => this.setPrice(e.target.value)} required placeholder="Price" /></div>
            <div className="form-group"><label>Description</label><textarea value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} required placeholder="Description" /></div>
            <div className="form-group">
              <label>Image</label>
              <div className="image__container">
                <input ref={(fileInput) => this.fileInput = fileInput} onChange={(e) => this.onImageChange(e)} type="file" />
                <div className="image__subContainer">
                  <button className={`button -small ${this.state.imageUrl != dummySquare ? '' : 'noImage'}`} onClick={(e) => this.triggerInputFile(e) }>Add Image</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminNewProductProduct)