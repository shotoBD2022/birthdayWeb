import Container, { Contects } from '../src/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Contects />
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
