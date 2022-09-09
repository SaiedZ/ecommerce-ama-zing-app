import { Container } from 'react-bootstrap'
import styled from 'styled-components'

import Header from './components/Header'
import Footer from './components/Footer'

const MainContainer = styled.main`
    min-height: 80vh;
`

function App() {
    return (
        <div>
            <Header />
            <MainContainer className="py-3">
                <Container>
                    <h1>Welcome</h1>
                </Container>
            </MainContainer>
            <Footer />
        </div>
    )
}

export default App
