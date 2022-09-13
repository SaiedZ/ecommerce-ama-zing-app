// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { combineReducers } from 'redux'

// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import { configureStore } from '@reduxjs/toolkit'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

import { cartReducer } from './reducers/cartReducers'
// const reducer = combineReducers({
//     productList: productListReducer
// })

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []

const preloadedState = {
    cart: {
        cartItems: cartItemsFromStorage
    }
}
// const middleware = [thunk]

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productDetailsReducer,
        cart: cartReducer
    },
    preloadedState
})

export default store
