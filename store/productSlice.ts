import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

interface ShippingAddressObj {
  fullname: string;
  address: string;
  city: string;
  postalcode: string;
  country: string;
}
interface PaymentMethodObj {
  paymentMethod: string;
}
interface initialStateType {
  products: any[];
  cart: {
    cartItems: any[];
    shippingAddress: ShippingAddressObj;
    paymentMethod: PaymentMethodObj;
  };
}
const products: any[] = [];
// const cartItems: any[] = Cookies.get('cartItems')
//   ? JSON.parse(Cookies.get('cartItems') || '')
//   : [];

// const cart = {
//   cartItems,
// };
const initialState: initialStateType = {
  products,
  cart: {
    cartItems: Cookies.get('cartItems')
      ? JSON.parse(Cookies.get('cartItems') || '')
      : [],
    shippingAddress: Cookies.get('shippingAddress')
      ? JSON.parse(Cookies.get('shippingAddress') || '')
      : {},
    paymentMethod: Cookies.get('paymentMethod')
      ? JSON.parse(Cookies.get('paymentMethod') || '')
      : '',
  },
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    GetAllProduct: (state, action: PayloadAction<any>) => {
      state.products = [...action.payload];
    },
    CartAddItem: (state, action: PayloadAction<any>) => {
      const newItem = action.payload;
      console.log(newItem);

      const existItem = state.cart.cartItems.find(
        (item) => item.id === newItem.id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.title === existItem.title ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      console.log(cartItems);
      Cookies.set('cartItems', JSON.stringify(cartItems));
      state.cart.cartItems = cartItems;
    },
    DeleteCartItem: (state, action: PayloadAction<any>) => {
      const ItemCurrent = action.payload;
      console.log(ItemCurrent);
      const cartItems = state.cart.cartItems.filter(
        (item) => item.id !== ItemCurrent.id
      );
      Cookies.set('cartItems', JSON.stringify(cartItems));
      state.cart.cartItems = cartItems;
    },
    SaveShippingAddress: (state, action: PayloadAction<any>) => {
      const newShippingAddress = {
        ...state.cart.shippingAddress,
        ...action.payload,
      };
      Cookies.set('shippingAddress', JSON.stringify(newShippingAddress));
      state.cart.shippingAddress = newShippingAddress;
    },
    SavePaymentMethod: (state, action: PayloadAction<PaymentMethodObj>) => {
      const newPaymentMethod = {
        ...state.cart.paymentMethod,
        ...action.payload,
      };
      console.log(newPaymentMethod);

      Cookies.set('paymentMethod', JSON.stringify(newPaymentMethod));
      state.cart.paymentMethod = newPaymentMethod;
    },
    CartClear: (state, action: PayloadAction<undefined>) => {
      state.cart = { ...state.cart, cartItems: [] };
    },
  },
});
export const {
  GetAllProduct,
  CartAddItem,
  DeleteCartItem,
  SaveShippingAddress,
  SavePaymentMethod,
  CartClear
} = productsSlice.actions;
export default productsSlice.reducer;
