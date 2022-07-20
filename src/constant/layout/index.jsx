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
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", width: "100%", padding: "0 1em" }}>
      {contectValue.map(({ name, url }, i) => (
        i < 2 ?
          <Link href={url} key={name} >
            <div className="icon">
              <p>{name.toUpperCase()}</p>
              <img src={`/img/layout/icon_${name}.svg`} style={{ margin: "1em .3em" }} width="60px" />
            </div>
          </Link>
          : <a target="_blank" href={url} key={name} >
            <div className="icon">
              <p>{name.toUpperCase()}</p>
              <img src={`/img/layout/icon_${name}.svg`} style={{ margin: "1em .3em" }} width="60px" />
            </div>
          </a>
      ))}
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
export const BorderLayout = ({ children }) => {
  return (
    <div style={{ position: "absolute", inset: 0, padding: "0 1em 1em", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="containerInside aq">
        <div className="aqContainer">

          {children}
        </div>
      </div>
    </div >
  )
}