import React from 'react'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import ProductPage from './pages/Product'
import ProductListPage from './pages/ProductList'
import ProductEditPage from './pages/ProductEdit'
import CartPage from './pages/Cart'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'
import ShippingPage from './pages/Shipping'
import PaymentPage from './pages/Payment'
import PlaceOrderPage from './pages/PlaceOrder'
import OrderPage from './pages/Order'
import OrderListPage from './pages/OrderList'
import UserListPage from './pages/UserList'
import UserEditPage from './pages/UserEdit'

import Header from './components/Header'
import Footer from './components/Footer'

const MainContainer = styled.main`
    min-height: 80vh;
`

function App() {
    return (
        <HashRouter>
            <Header />
            <MainContainer className="py-3">
                <Container fluid="lg">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/product/:productId" element={<ProductPage />} />
                        <Route path="/shipping" element={<ShippingPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/placeorder" element={<PlaceOrderPage />} />
                        <Route path="/order/:orderId" element={<OrderPage />} />
                        <Route path="/cart">
                            <Route index element={<CartPage />} />
                            <Route path=":id" element={<CartPage />} />
                        </Route>

                        <Route path="/admin/userlist" element={<UserListPage />} />
                        <Route path="/admin/user/:userId/edit" element={<UserEditPage />} />
                        <Route path="/admin/productlist" element={<ProductListPage />} />
                        <Route
                            path="/admin/product/:productId/edit"
                            element={<ProductEditPage />}
                        />
                        <Route path="/admin/orderlist" element={<OrderListPage />} />
                    </Routes>
                </Container>
            </MainContainer>
            <Footer />
        </HashRouter>
    )
}

export default App
