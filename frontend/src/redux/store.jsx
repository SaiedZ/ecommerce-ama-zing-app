// import { createStore, combineReducers, applyMiddleware } from 'redux'
// import { combineReducers } from 'redux'

// import thunk from 'redux-thunk'
// import { composeWithDevTools } from 'redux-devtools-extension'

import { configureStore } from '@reduxjs/toolkit'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'

// const reducer = combineReducers({
//     productList: productListReducer
// })

const initialState = {}

// const middleware = [thunk]

const store = configureStore(
    {
        reducer: {
            productList: productListReducer,
            productDetails: productDetailsReducer
        }
    },
    initialState
)

export default store
