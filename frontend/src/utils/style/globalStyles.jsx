import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  h1{
    font-size: 1.8rem;
    padding:1rem 0;
  }

  h2{
    font-size: 1.4rem;
    padding:0.5rem 0;
  }

  h3{
      padding:1rem 0;
  }

  a {
    text-decoration: none;
  }
`

export default GlobalStyle
