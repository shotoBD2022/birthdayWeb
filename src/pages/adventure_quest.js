import { useEffect, useState } from "react";
import textList from "@feature/adventure_quest/texts.json";
import { BorderLayout } from "@constant/layout";
import { KeyInMultiText, KeyInWord } from "@component/intro";
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
      <h1 style={{ marginBottom: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(1)}>
        {"[Quest 1-1]"}<br />
        {"???????????????????????????????????????(????????????)"}
      </KeyInMultiText></h1>

      {step > 0 && <h2 style={{ marginTop: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(2)}>
        {"Wanted! Birthday message and Celebration arts!(Birthday message)"}<br />
      </KeyInMultiText></h2>}
      {step > 1 && < KeyInMultiText finished={() => setStep(3)}>
        {"?????????????????????????????????????????????????????????????????????????????????"}<br />
        {"??????????????? Shoto's Birthday Adventure ?????????????????????????????????????????????"}<br />
        <br />
        {"Anything you would like to say to the great Guild Leader? Or would like to draw him celebrating birthday?"}<br />
        {"Welcome to send all the best wishes to Shoto's Birthday Adventure!"}<br />
      </KeyInMultiText>}

      {step > 2 && <div className="button" onClick={onClick}><KeyInWord>{"?????????????????? View quest results"}</KeyInWord></div>}
    </div >
  )
}
