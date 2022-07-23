import { KeyInMultiText } from "@component/intro";
import { BorderLayout } from "@constant/layout";
import { imgAuthorList } from "@lib/type";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    setShowIntro(!getCookie("bounty_board"))
  }, [])

  return <>
    <Content show={!showIntro} />
    {showIntro && <Intro onClick={() => { setShowIntro(false); setCookie("bounty_board", true) }} />}
  </>
}

export function Content({ show }) {
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

  return <BorderLayout show={show}>
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

const Intro = ({ onClick }) => {
  const [step, setStep] = useState(0)
  return (
    <div className="introText">
      <h1><KeyInMultiText finished={() => setStep(1)}>
        {"[Mission 1]"}<br />
        {"募集！祝福話語與慶祝圖像！(慶祝圖像)"}
      </KeyInMultiText></h1>
      {step > 0 && < KeyInMultiText finished={() => setStep(2)}>
        有什麼想對偉大的會長說？或是想描繪會長的生日慶祝肖像？<br />
        歡迎投稿到 Shoto's Birthday Adventure 任務組，一起獻上最誠摯的祝福！<br />
      </KeyInMultiText>}
      {step > 1 && <div className="button" onClick={onClick}>觀看任務成果</div>}
    </div >
  )
}
