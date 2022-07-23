import { useEffect, useState } from "react";
import textList from "@feature/adventure_quest/texts.json";
import { BorderLayout } from "@constant/layout";
import { KeyInMultiText } from "@component/intro";
import { getCookie, setCookie } from "cookies-next";

const decoValue = (pos) => [
  { name: "A", style: { width: "3em", top: "-2.5em", left: "-1em" } },
  { name: "A", style: { width: "3em", bottom: "12em", right: "-1em" } },
  { name: "B", style: { width: "5em", top: "-1.5em", right: "2em" } },
  { name: "C", style: { width: "3em", top: "30%", right: "-1.5em" } },
  { name: "D", style: { width: "3em", top: "60%", left: "-1.5em" } },
  { name: "E", style: { width: "3em", top: "-1.5em", right: "-1.5em" } }
]
const pos = [50, 30, 10, 70, 101, -2, 85]


export default function Home() {
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    setShowIntro(!getCookie("adventure"))
  }, [])

  return <>
    <Content show={!showIntro} />
    {showIntro && <Intro onClick={() => { setShowIntro(false); setCookie("adventure", true) }} />}
  </>
}

export function Content({ show }) {
  const [showSingle, setShowSingle] = useState(-1)
  const [imgCount, setImgCount] = useState(-1)
  const [imgPos, setImgPos] = useState({})
  const [decoArry, setDecoArray] = useState([])

  useEffect(() => {
    const count = parseInt(Math.random() * 5)
    setImgCount(count)
    setTimeout(() => {
      setImgPos({ [count % 2 == 1 ? "left" : "right"]: "-3em", opacity: 1 })
    }, 200);
  }, [])

  useEffect(() => {
    if (decoArry.length > 6) return
    const timer = setTimeout(() => {
      decoArry.push(Math.random() * 2 + 1)
      setDecoArray([...decoArry])
    }, 2000);
    return () => clearTimeout(timer)
  }, [decoArry])

  return <BorderLayout show={show}>
    <div className="content">
      {textList.map((({ text, name }, i) =>
        <Card key={i} name={name} onClick={() => setShowSingle(i)}>
          {text}
        </Card>
      ))}
    </div>
    {showSingle > -1 &&
      <div className="showCardContainer">
        <div style={{ position: "absolute", inset: 0 }} onClick={() => setShowSingle(-1)} />
        <Card name={textList[showSingle].name} show>
          {textList[showSingle].text}
        </Card>
      </div>
    }
    {imgCount > -1 && <div className="imgContainer" style={imgPos}>
      <img src={`/img/adventure_quest/cha_${imgCount}.png`} />
    </div>}
    {decoValue(imgCount % 2 == 1).map(({ name, style }, i) =>
      <img key={i} src={`/img/adventure_quest/deco_${name}.png`} style={style} />
    )}
    {decoArry.map((data, i) => <Deco width={`${data}em`} left={pos[i]} key={i} />)}
  </BorderLayout>
}

const Card = ({ children, name, show, ...props }) => {
  return (
    <div className={`text card${show ? " show" : ""}`} {...props} >
      <div>
        {children && children.map((text, i) => <span key={i}>{text}<br /></span>)}
      </div>
      {name && <div style={{ textAlign: "right", marginTop: ".5em" }}>by.{name}</div>}
    </div>
  )
}

const Deco = ({ width, left }) => {
  return <img className="fallingPice" src={`/img/adventure_quest/deco_E.png`}
    style={{ width, left: `${left}%` }} />
}

const Intro = ({ onClick }) => {
  const [step, setStep] = useState(0)
  return (
    <div className="introText">
      <h1><KeyInMultiText finished={() => setStep(1)}>
        {"[Mission 1]"}<br />
        {"募集！祝福話語與慶祝圖像！(祝福話語)"}
      </KeyInMultiText></h1>
      {step > 0 && < KeyInMultiText finished={() => setStep(2)}>
        有什麼想對偉大的會長說？或是想描繪會長的生日慶祝肖像？<br />
        歡迎投稿到 Shoto's Birthday Adventure 任務組，一起獻上最誠摯的祝福！<br />
      </KeyInMultiText>}
      {step > 1 && <div className="button" onClick={onClick}>觀看任務成果</div>}
    </div >
  )
}
