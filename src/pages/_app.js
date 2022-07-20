import '../style/globals.css'
import Container, { Contects, Content } from '@constant/layout'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    };

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  })

  return (
    <Container>
      <Head>
        <title>shotoHBD2022</title>
        <meta name="description" content="" />
        <link rel="icon" href="/0.ico" />
      </Head>
      <Contects />
      <Content>
        {loading &&
          <div className='loaging'>
            <img src='/img/logo1.png' width="100%" />
            <div><div /></div>
          </div>
        }
        <div style={{ opacity: loading ? 0 : 1, width: "100%", height: "100%" }}>
          <Component {...pageProps} />
        </div>
      </Content>
    </Container>
  )
}

export default MyApp
