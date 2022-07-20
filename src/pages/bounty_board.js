import { BorderLayout } from "@constant/layout";
import { imgAuthorList } from "@lib/type";
import { useEffect, useState } from "react";

export default function Home() {
  const [imgProps, setImgProps] = useState([]);
  const [showSingle, setShowSingle] = useState(-1)

  useEffect(() => {
    const arr = imgAuthorList.map((author, i) => ({
      url: `/img/bounty_board/pic${i + 1}.png`,
      author,
      scale: Math.random() * 0.1 + 1,
      rotate: Math.random() * 10 * (i % 2 * 2 - 1)
    }))
    setImgProps(arr)
  }, [])

  return <BorderLayout>
    <div className="content" style={{ alignItems: "center", justifyContent: "space-evenly", paddingTop: "2em" }}>
      {imgProps.map((props, i) => <ImgCard key={i} {...props} onClick={() => setShowSingle(i)} />)}
    </div>
    {showSingle > -1 &&
      <div className="showCardContainer">
        <div style={{ position: "absolute", inset: 0 }} onClick={() => setShowSingle(-1)} />
        <ImgCard show {...imgProps[showSingle]} />
      </div>
    }
  </BorderLayout >
}

const ImgCard = ({ url, author, show, scale, rotate, ...props }) => {
  return (
    <div className={"img card" + (show ? " show" : "")}
      style={show ? {} : { transform: `rotate(${rotate}deg) scale(${scale})` }} {...props} >
      <img src={url} />
      {author && <div style={{ textAlign: "right", marginTop: ".5em" }}>by.{author}</div>}
    </div>
  )
}