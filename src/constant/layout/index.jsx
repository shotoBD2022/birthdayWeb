import Link from "next/link"
import { useEffect, useState } from "react"

export default function Container({ children }) {
  const [windowHeight, setWindowHeight] = useState(0)
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
  { name: "team", url: "/" },
  { name: "plurk", url: "https://www.plurk.com/ShotoHBD2022" },
  { name: "twitter", url: "https://twitter.com/2022_HBD/" },
]
export const Contects = () => {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", inset: ".5em 0 auto" }}>
      {contectValue.map(({ name, url }) => (
        <Link href={url} key={name} >
          <div className="icon">
            <p>{name.toUpperCase()}</p>
            <img src={`/img/icon_${name}.svg`} style={{ margin: "1em .3em" }} width="60px" />
          </div>
        </Link>
      ))}
    </div>
  )
}