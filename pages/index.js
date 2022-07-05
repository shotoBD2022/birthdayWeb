import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [bgSize, setBgSize] = useState({ width: 0, height: 0 })
  const [bgPos, setBgPos] = useState({ top: 0, left: 0 })
  const ref = useRef()

  useEffect(() => {
    const onResize = () => {
      const { height, width } = ref.current.getBoundingClientRect()
      setBgSize({ width: height * 2, height })
      setBgPos({ top: 0, left: width / 2 - height })
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => { window.removeEventListener("resize", onResize) }
  }, [])
  const handleBgPos = (dir) => {
    const { top, left } = bgPos
    const { width } = ref.current.getBoundingClientRect()
    const delta = width * dir
    if (delta < 0) {
      setBgPos({ top, left: (bgSize.width + left + delta > width) ? (left + delta) : (width - bgSize.width) })
    }
    else {
      setBgPos({ top, left: left + delta > 0 ? 0 : left + delta })
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>shoto Happy Birthday</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div ref={ref} style={{ position: 'absolute', inset: "8em 1em 3em", overflow: "hidden", border: "4px solid var(--theme-c)" }}>
        <div className={styles.overlay} />
        <div style={{ ...bgSize, ...bgPos, position: 'absolute', background: "center / cover url(/img/guild.png)",transition:"ease .5s" }}>

        </div>
        <div onClick={() => { handleBgPos(-1) }} style={{ right: 0, position: 'absolute', width: "20px", backgroundColor: "#f00", height: "100%" }}></div>
        <div onClick={() => { handleBgPos(1) }} style={{ left: 0, position: 'absolute', width: "20px", backgroundColor: "#f00", height: "100%" }}></div>
      </div>
    </div>
  )
}
