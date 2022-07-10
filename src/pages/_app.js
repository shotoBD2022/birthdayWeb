import '../style/globals.css'
import Container, { Contects, Content } from '@constant/layout'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Head>
        <title>shotoHBD2022</title>
        <meta name="description" content="" />
        <link rel="icon" href="/0.ico" />
      </Head>
      <Contects />
      <Content>
        <Component {...pageProps} />
      </Content>
    </Container>
  )
}

export default MyApp
