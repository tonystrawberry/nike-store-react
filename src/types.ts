export type ProductOverviewState = {
  selected: boolean,
  selectedProductId: string | null,
  products: Product[],
  loading: boolean
}

export type AdminProfile = {
  fullName: string,
  username: string,
  email: string,
  password: string
}

export type AdminUser = {
  id: string,
  username: string,
  email: string,
  accessToken: string
}

export type AdminState = {
  loading: boolean,
  profile: AdminProfile,
  user: AdminUser | null
}

export type Action = {
  type: string, 
  payload: any
}

export type Product = {
  _id: string,
  title: string,
  subtitle1: string,
  subtitle2: string,
  description: string,
  imageUrl: string,
  price: number
}

export type ToastState = {
  toasts: SingleToast[]
}

export type SingleToast = {
  id: number,
  type: string,
  message: string
}


