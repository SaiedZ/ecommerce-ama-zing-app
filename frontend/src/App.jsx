import React from 'react'

import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/Home'

const MainContainer = styled.main`
    min-height: 80vh;
`

function App() {
    return (
        <React.StrictMode>
            <Header />
            <MainContainer className="py-3">
                <Container>
                    <HomePage />
                </Container>
            </MainContainer>
            <Footer />
        </React.StrictMode>
    )
}

export default App
