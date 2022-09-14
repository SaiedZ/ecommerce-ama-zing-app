import React from 'react'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import ProductPage from './pages/Product'
import CartPage from './pages/Cart'
import LoginPage from './pages/Login'
import RegisterPage from './pages/Register'
import ProfilePage from './pages/Profile'
import ShippingPage from './pages/Shipping'
import PaymentPage from './pages/Payment'
import PlaceOrderPage from './pages/PlaceOrder'

import Header from './components/Header'
import Footer from './components/Footer'

const MainContainer = styled.main`
    min-height: 80vh;
`

function App() {
    return (
        <BrowserRouter>
            <Header />
            <MainContainer className="py-3">
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/product/:productId" element={<ProductPage />} />
                        <Route path="/shipping" element={<ShippingPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/placeorder" element={<PlaceOrderPage />} />
                        <Route path="/cart">
                            <Route index element={<CartPage />} />
                            <Route path=":id" element={<CartPage />} />
                        </Route>
                    </Routes>
                </Container>
            </MainContainer>
            <Footer />
        </BrowserRouter>
    )
}

export default App
