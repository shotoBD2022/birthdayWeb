import '../style/globals.css'
import Container, { Contects, Content } from '@constant/layout'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import StartIntro from '@component/intro';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setShowIntro(!getCookie("visited"))
  }, [])

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [showIntro])

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
  }, [])

  return (
    <Container>
      <Head>
        <title>shotoHBD2022</title>
        <meta name="description" content="Shoto's Birthday Adventure" />
        <meta httpEquiv="ScreenOrientation" content="autoRotate:disabled" />
        <link rel="icon" href="/0.ico" />
        <meta property="og:title" content="shotoHBD2022" />
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:description" content="Shoto's Birthday Adventure" />
      </Head>
      <Contects />
      {loading &&
        <div className='loaging'>
          <img src='/img/logo1.png' width="100%" />
          <div><div /></div>
        </div>
      }
      <Content show={!loading}>
        {showIntro && <StartIntro onClick={() => setShowIntro(false)} />}
        {!showIntro && <Component {...pageProps} />}
      </Content>
    </Container>
  )
}

export default MyApp
