// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { combineReducers } from 'redux'

// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import { configureStore } from '@reduxjs/toolkit'
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducers'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userListReducer,
    userUpdateProfileReducer,
    userDeleteReducer,
    userUpdateReducer
} from './reducers/userReducers'
// const reducer = combineReducers({
//     productList: productListReducer
// })

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
    ? JSON.parse(localStorage.getItem('shippingAddress'))
    : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
    ? JSON.parse(localStorage.getItem('paymentMethod'))
    : {}

const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage }
}
// const middleware = [thunk]

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        productDelete: productDeleteReducer,
        productCreate: productCreateReducer,
        productUpdate: productUpdateReducer,
        productReviewCreate: productReviewCreateReducer,

        cart: cartReducer,

        userLogin: userLoginReducer,
        userRegister: userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile: userUpdateProfileReducer,
        userList: userListReducer,
        userDelete: userDeleteReducer,
        userUpdate: userUpdateReducer,

        orderCreate: orderCreateReducer,
        orderDetails: orderDetailsReducer,
        orderPay: orderPayReducer,
        orderListMy: orderListMyReducer,
        orderList: orderListReducer,
        orderDeliver: orderDeliverReducer
    },
    preloadedState
})

export default store
