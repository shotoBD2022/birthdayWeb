import { useEffect, useState } from "react";
import textList from "@feature/adventure_quest/texts.json";
import { BorderLayout } from "@constant/layout";
import { KeyInMultiText, KeyInWord } from "@component/intro";
import { getCookie, setCookie } from "cookies-next";
import { useSize } from "@lib/hook";

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
    setShowIntro(!getCookie("magic_gramophone"))
  }, [])

  return <>
    <Content show={!showIntro} />
    {showIntro && <Intro onClick={() => { setShowIntro(false); setCookie("magic_gramophone", true) }} />}
  </>
}

export function Content({ show }) {
  const [ref, { height, width }] = useSize()

  return <div ref={ref} style={{
    position: "absolute", inset: 0,
    display: "flex", alignItems: "center", justifyContent: "center",
    opacity: show ? 1 : 0
  }}>
    <video controls width={width * 0.8} height={height * 0.8} >
      <source src="/ShotoHBD.mp4"
        type="video/mp4" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
}

const Intro = ({ onClick }) => {
  const [step, setStep] = useState(0)
  return (
    <div className="introText">
      <h1 style={{ marginBottom: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(1)}>
        {"[Quest 3]"}<br />
        {"現形！留聲機的回憶碎片！"}
      </KeyInMultiText></h1>

      {step > 0 && <h2 style={{ marginTop: 0, color: "var(--theme-c)" }}><KeyInMultiText finished={() => setStep(2)}>
        {"Memories pieces from Magic Gramophone"}<br />
      </KeyInMultiText></h2>}
      {step > 1 && <div className="button" onClick={onClick}><KeyInWord>{"Enter"}</KeyInWord></div>}
    </div >
  )
}
