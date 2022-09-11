import React from 'react'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import ProductPage from './pages/Product'

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
                        <Route path="/product/:productId" element={<ProductPage />} />
                    </Routes>
                </Container>
            </MainContainer>
            <Footer />
        </BrowserRouter>
    )
}

export default App
