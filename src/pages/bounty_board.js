import { BorderLayout } from "@constant/layout";
import { imgAuthorList } from "@lib/type";
import { useMemo } from "react";

export default function Home() {
  return <BorderLayout>
    <div className="content" style={{ alignItems: "center", justifyContent: "space-evenly",paddingTop:"2em" }}>
      {imgAuthorList.map((author, i) => <ImgCard key={i} url={`/img/bounty_board/pic${i + 1}.png`} author={author} />)}
    </div>
  </BorderLayout >
}

const ImgCard = ({ url, author }) => {
  const transform = useMemo(() => ({ scale: Math.random() * 0.1 + 1, rotate: Math.random() * 10 - 5 }), [])
  // const transform = useMemo(() => ({ scale: 1, rotate: 0}), [])
  return (
    <div className=" card" style={{ transform: `rotate(${transform.rotate}deg) scale(${transform.scale})`,maxWidth:"80%" }}>
      <img src={url} style={{ maxHeight: "20vh", maxWidth: "100%" }} />
      {author && <div style={{ textAlign: "right", marginTop: ".5em" }}>by.{author}</div>}
    </div>
  )
}