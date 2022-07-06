import '../style/globals.css'
import Container, { Contects } from '@constant/layout'

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Contects />
      <Component {...pageProps} />
    </Container>
  )
}

export default MyApp
