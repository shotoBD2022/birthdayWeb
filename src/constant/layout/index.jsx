import Link from "next/link"
import { useEffect, useState } from "react"

export default function Container({ children }) {
  const [windowHeight, setWindowHeight] = useState("100vh")
  useEffect(() => {
    const onResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener("resize", onResize)
    onResize()
    return () => window.removeEventListener("resize", onResize)
  }, [])
  return (
    <div className="container" style={{ height: windowHeight }}>
      {children}
    </div>
  )
}
const contectValue = [
  { name: "home", url: "/" },
  { name: "team", url: "/team" },
  { name: "plurk", url: "https://www.plurk.com/ShotoHBD2022" },
  { name: "twitter", url: "https://twitter.com/2022_HBD/" },
]
export const Contects = () => {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [enableFullScreen, setEnableFullScreen] = useState(false)

  const handleCilck = () => {
    if (document.webkitFullscreenElement || document.fullscreenElement) {
      document.exitFullscreen && document.exitFullscreen()
      document.webkitExitFullscreen && document.webkitExitFullscreen()
    }
    else {
      if (document.body.webkitRequestFullScreen) {
        document.body.webkitRequestFullScreen()
      }
      else if (document.body.requestFullscreen) {
        document.body.requestFullscreen()
      }
    }
  }

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullScreen(document.webkitFullscreenElement || document.fullscreenElement)
    }
    if (document.body.webkitRequestFullScreen || document.body.requestFullscreen) {
      setEnableFullScreen(true)
    }
    onFullscreenChange()
    document.addEventListener("webkitfullscreenchange", onFullscreenChange)
    document.addEventListener("fullscreenchange", onFullscreenChange)
    return () => {
      document.removeEventListener("webkitfullscreenchange", onFullscreenChange)
      document.removeEventListener("fullscreenchange", onFullscreenChange)
    }
  }, [])

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", padding: "0 1em" }}>
      {contectValue.map(({ name, url }, i) => (
        i < 2 ?
          <Link href={url} key={name} >
            <div className="icon">
              <p>{name.toUpperCase()}</p>
              <img src={`/img/layout/icon_${name}.svg`} style={{ margin: "1em .3em .5em" }} width="50px" />
            </div>
          </Link>
          : <a target="_blank" href={url} key={name} rel="noreferrer noopener" >
            <div className="icon">
              <p>{name.toUpperCase()}</p>
              <img src={`/img/layout/icon_${name}.svg`} style={{ margin: "1em .3em .5em" }} width="50px" />
            </div>
          </a>
      ))}
      {enableFullScreen &&
        <div className="icon" onClick={handleCilck}>
          <p>{isFullScreen ? "EXIT" : "Full Screen"}</p>
          <img src={`/img/layout/icon_${isFullScreen ? "small" : "big"}.svg`}
            style={{ margin: "1em .3em .5em" }} width="50px" />
        </div>
      }
    </div>
  )
}
export const Content = ({ children, show }) => {
  return (
    <div className="fullContent" style={{ opacity: show ? 1 : 0 }}>
      {children}
    </div>
  )
}
export const BorderLayout = ({ children, show, style }) => {
  return (
    <div style={{ position: "absolute", opacity: show ? 1 : 0, zIndex: show ? 1 : -1, inset: 0, padding: "0 1em 1em", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="containerInside aq" style={style}>
        <div className="aqContainer" >
          {children}
        </div>
      </div>
    </div >
  )
}
