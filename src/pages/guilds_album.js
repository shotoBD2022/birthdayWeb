import { BorderLayout } from "@constant/layout";
import { useEffect, useState } from "react";
import pancakeList from "@lib/pancake.json";
import { KeyInMultiText, KeyInWord } from "@component/intro";
import { getCookie, setCookie } from "cookies-next";

export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    setShowIntro(!getCookie("guilds_album"))
  }, [])

  return <>
    <Content show={!showIntro} />
    {showIntro && <Intro onClick={() => { setShowIntro(false); setCookie("guilds_album", true) }} />}
  </>
}

export const Content = ({ show }) => {
  const [imgProps, setImgProps] = useState([]);
  const [showSingle, setShowSingle] = useState(-1)

  useEffect(() => {
    const arr = pancakeList.map(({ author, newName }, i) => ({
      url: `/img/guilds_album/${newName}`,
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
    <div className={"pancake img card" + (show ? " show" : "")}
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
      <h1 style={{ marginBottom: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(1)}>
        {"[Quest 2]"}<br />
        {"出遊！鬆餅男孩的願望！"}
      </KeyInMultiText></h1>

      {step > 0 && <h2 style={{ marginTop: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(2)}>
        {"On a quest! Pancake boy’s wishes!"}<br />
      </KeyInMultiText></h2>}

      {step > 1 && step < 4 && < KeyInMultiText finished={() => setStep(3)}>
        {"偉大的公會長說過：「我喜歡吃鬆餅」"}<br />
        {"偉大的公會長也說過：「今年夏天我想要去海邊玩」"}<br />
        {"如果四處探險是他的願望，那就敲敲門板，讓我們 Let's goooooo！"}<br />
        <br />
        {"The great Guild Leader once said: “I love pancakes!”"}<br />
        {"The great Guild Leader had also said: “I want to go to the beach this summer!”"}<br />
        {"If adventures are his wish, then knock the door we have to move, Let’s gooooo!!"}<br />
      </KeyInMultiText>}

      {step > 3 && < KeyInMultiText finished={() => setStep(5)}>
        {"在本次企劃中，我們想邀請大家一起帶 Shoto 去吃好吃鬆餅，"}<br />
        {"或是帶 Shoto 出去玩並分享照片！"}<br />
        {"列印我們可愛的 shoto 跟鬆餅或是風景合照！"}<br />
        <br />
        {"For this quest, we’d like to invite everyone to take Shoto out for delicious pancakes "}<br />
        {"or take him for a trip and share your photos!"}<br />
        {"Print out our cute Shoto and take him out for pancakes and a trip!"}<br />
      </KeyInMultiText>}

      {step == 3 && <div className="button" onClick={() => setStep(4)}><KeyInWord>{"next"}</KeyInWord></div>}
      {step > 4 && <div className="button" onClick={onClick}><KeyInWord>{"觀看任務成果 View quest results"}</KeyInWord></div>}
    </div >
  )
}
