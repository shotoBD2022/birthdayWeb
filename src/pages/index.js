import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import styles from '../style/Home.module.css'

const imageValue = [
  { name: "A", src: "bounty_board", textPos: { left: "100%" }, text: ["公會懸賞", "Bounty Board"], posSize: [21.1, 3.3, 17, 45] },
  { name: "B", src: "magic_gramophone", textPos: { right: "300%" }, text: ["魔法留聲機", "Magic Gramophone"], posSize: [38.15, 48.16, 7.75, 23.85] },
  { name: "C", src: "guilds_album", textPos: { right: "100%" }, text: ["公會相簿", "Guild's Album"], posSize: [64.65, 59.52, 26.2, 19.5] },
  { name: "D", src: "adventure_quest", textPos: { right: "180%" }, text: ["冒險委託版", "Adventure Quest"], posSize: [28.4, 84.7, 13, 39.5] },
]

export default function Home() {
  const [bgSize, setBgSize] = useState({ width: 0, height: 0 })
  const [bgPos, setBgPos] = useState({ top: 0, left: 0 })
  const [showScrollBtn, setShowScrollBtn] = useState({ left: false, right: false })
  const ref = useRef()
  const [onHover, setOnHover] = useState(0)
  const [onDrag, setOndrag] = useState()
  const [dragDis, setDragDis] = useState(0)
  const backgroundImg = useRef()

  useEffect(() => {
    const onResize = () => {
      const { height, width } = ref.current.getBoundingClientRect()
      if (height * 2 > width) {
        setBgSize({ width: height * 2, height })
        setBgPos({ top: 0, left: width / 2 - height })
        setShowScrollBtn({ left: true, right: true })
      }
      else {
        setBgSize({ width: width, height: width / 2 })
        setBgPos({ top: (height / 2) - (width / 4), left: 0 })
        setShowScrollBtn({ left: false, right: false })
      }
    }
    onResize()
    window.addEventListener("resize", onResize)
    return () => { window.removeEventListener("resize", onResize) }
  }, [])

  const handleBgPos = (dir, value) => {
    const { top, left } = bgPos
    const { width } = ref.current.getBoundingClientRect()
    const delta = value ? value : (width * dir)
    const centerLeft = (width - bgSize.width) / 2

    if (delta < 0) {
      const ifOver = (bgSize.width + left + delta) < width
      const ifPassCenter = centerLeft < left && left + delta < centerLeft
      const newLeft = ifPassCenter ? centerLeft : ifOver ? (width - bgSize.width) : (left + delta)
      setBgPos({ top, left: newLeft })
      setShowScrollBtn({ left: !ifOver, right: true })
    }
    else {
      const ifOver = left + delta > 0
      const ifPassCenter = centerLeft > left && left + delta > centerLeft
      const newLeft = ifPassCenter ? centerLeft : ifOver ? 0 : left + delta
      setShowScrollBtn({ left: true, right: !ifOver })
      setBgPos({ top, left: newLeft })
    }
  }
  const getImageValue = (top, left, width, height) => ({
    top: `${top}%`,
    left: `${left}%`,
    width: `${width}%`,
    height: `${height}%`
  })
  const handleDragStart = (e) => {
    console.log("handleDragStart", e.pageX || e.touches[0].pageX)
    setOndrag(e.pageX || e.touches[0].pageX)
    backgroundImg.current.style.transition = "ease 0s"
  }
  const handleDragDis = (e) => {
    if (!onDrag) return
    const eventPos = e.pageX || e.touches[0].pageX
    const dis = eventPos - onDrag
    console.log("handleDragDis",eventPos, dis)
    const { width } = ref.current.getBoundingClientRect();
    (width - bgPos.left - dis < bgSize.width) &&
      (bgPos.left + dis < 0) &&
      setDragDis(dis)
  }

  const handleDragRelease = () => {
    setOndrag();
    handleBgPos(dragDis)
    setDragDis(0);
    backgroundImg.current.style.transition = "ease .5s"
  }

  return (
    <div className={"containerInside"}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragDis}
      onMouseUp={handleDragRelease}
      onMouseLeave={handleDragRelease}

      onTouchStart={handleDragStart}
      onTouchMove={handleDragDis}
      onTouchEnd={handleDragRelease}
      style={{
        display: 'flex', alignItems: "center", justifyContent: "center", position: 'relative',
        userSelect: "none"
      }}>
      <div ref={ref} className={"containerInside"} style={{ position: 'relative', overflow: "hidden", border: "4px solid var(--theme-c)" }}>
        <div ref={backgroundImg} style={{
          ...bgSize, ...bgPos, position: 'absolute',
          background: "center / cover url(/img/index/guild.png)",
          transition: "ease .5s",
          transform: `translateX(${dragDis}px)`
        }}>
          <div className={styles.overlay} style={{ opacity: onHover }} />
          {imageValue.map(({ name, posSize, text, textPos, src }) => (
            <Link key={name} href={src} >
              <div onMouseEnter={() => setOnHover(1)} onMouseLeave={() => setOnHover(0)} className={styles.item} style={{ ...getImageValue(...posSize) }} >
                <img src={`/img/index/BD_BG_${name}.png`} style={{ maxWidth: "100%", maxHeight: "100%" }} />
                <div className={`${styles.item_name} ${name == "A" ? styles.reverse : ""}`} style={textPos}>
                  <span />
                  {text[0]}<br />
                  {text[1]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <img src='/img/index/arrow.svg' onClick={() => { handleBgPos(-1) }}
        className={`${styles.arrowIcon} ${showScrollBtn.left ? "" : styles.disabled}`}
        style={{ right: "-1.25em", transform: "rotate(180deg)" }} />
      <img src='/img/index/arrow.svg' onClick={() => { handleBgPos(1) }}
        className={`${styles.arrowIcon} ${showScrollBtn.right ? "" : styles.disabled}`}
        style={{ left: "-1.25em" }} />
    </div>
  )
}
