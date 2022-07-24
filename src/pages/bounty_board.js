import { KeyInMultiText, KeyInWord } from "@component/intro";
import { BorderLayout } from "@constant/layout";
import { imgAuthorList } from "@lib/type";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";

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
    const arr = imgAuthorList.map((data, i) => ({
      url: `/img/bounty_board/pic${i + 1}.png`,
      ...data,
      scale: Math.random() * 0.1 + 1,
      rotate: Math.random() * 10 * (i % 2 * 2 - 1)
    }))
    console.log(arr)
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

const ImgCard = ({ url, name, link, show, scale, rotate, ...props }) => {
  const [showHint, setShowHint] = useState(false)
  return (
    <div className={"img card" + (show ? " show" : "")}
      style={show ? {} : { transform: `rotate(${rotate}deg) scale(${scale})` }} {...props} >
      <img src={url} />
      <div style={{ display: "flex", marginTop: ".5em", alignItems: "center" }}>

        {show && ["plurk", "twitter", "facebook"].map(type =>
          link[type] && <a key={type} href={link[type]}
            target="_blank" rel="noreferrer noopener">
            <div className="icon">
              <Image src={`/img/layout/icon_${type}_B.svg`} width={30} height={30} />
            </div>
          </a>
        )}
        {
          show && link.discord &&
          <div className="icon">
            <div style={{
              position: "absolute", top: "-30px", textAlign: "center", backgroundColor: "#55555599",
              borderRadius: "10px", padding: ".25em 1em", color: "#fff", left: "-29px", whiteSpace: "nowrap",
              opacity: showHint ? 1 : 0, transition: "1s ease"
            }}>{link.discord}</div>
            <Image src={`/img/layout/icon_discord_B.svg`} width={30} height={30}
              onClick={() => { setShowHint(!showHint) }} />
          </div>
        }
        <span style={{ flex: "1 1 0", textAlign: "right" }}>by.{name}</span>
      </div>
    </div>
  )
}

const Intro = ({ onClick }) => {
  const [step, setStep] = useState(0)
  return (
    <div className="introText">
      <h1 style={{ marginBottom: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(1)}>
        {"[Quest 1-2]"}<br />
        {"募集！祝福話語與慶祝圖像！(慶祝圖像)"}
      </KeyInMultiText></h1>

      {step > 0 && <h2 style={{ marginTop: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(2)}>
        {"Wanted! Birthday messages and Celebration arts!(Celebration arts)"}<br />
      </KeyInMultiText></h2>}

      {step > 1 && < KeyInMultiText finished={() => setStep(3)}>
        {"有什麼想對偉大的會長說？或是想描繪會長的生日慶祝肖像？"}<br />
        {"歡迎投稿到 Shoto's Birthday Adventure 任務組，一起獻上最誠摯的祝福！"}<br />
        <br />
        {"Anything you would like to say to our great Guild Leader?"}<br />
        {" Or drawing him to celebrate his birthday?"}<br />
        {"Welcome to send all the best wishes to Shoto's Birthday Adventure!"}<br />
      </KeyInMultiText>}

      {step > 2 && <div className="button" onClick={onClick}><KeyInWord>{"觀看任務成果 View quest results"}</KeyInWord></div>}
    </div >
  )
}
