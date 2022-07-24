import { setCookie } from "cookies-next"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const Arr = [
  { url: "/img/index/A.png", text: ["公會懸賞", "Bounty Board"] },
  { url: "/img/index/B.png", text: ["魔法留聲機", "Magic Gramophone"] },
  { url: "/img/index/C.png", text: ["公會相簿", "Guild's Album"] },
  { url: "/img/index/D.png", text: ["冒險委託版", "Adventure Quest"] },
]
export default function StartIntro({ onClick }) {
  const [step, setSteps] = useState(0)
  switch (step) {
    case 0:
      return <Warn onClick={() => setSteps(step + 1)} />
    case 1:
      return <StratWord onClick={() => setSteps(step + 1)} />
    case 2:
      return <MissionHint onClick={onClick} />
  }
}

export const Warn = ({ onClick }) => {
  const [step, setStep] = useState(0);
  return (
    <div className="introText">
      <h1 style={{ color: "var(--yellow)" }}>!</h1>
      <h2 style={{ marginBottom: 0 }}>
        <KeyInMultiText finished={() => setStep(1)}>
          建議使用電腦瀏覽器來獲取更好的體驗<br />
        </KeyInMultiText>
      </h2>
      {step > 0 && < h3 style={{ marginTop: 0 }}>
        <KeyInMultiText finished={() => setStep(2)}>
          Recommend using computer for better experience.<br />
        </KeyInMultiText>
      </h3>}
      {step > 1 && <h2 style={{ marginBottom: 0 }}>
        <KeyInMultiText finished={() => setStep(3)}>
          若使用手機瀏覽器建議點選右上角全螢幕模式來觀看網頁<br />
        </KeyInMultiText>
      </h2>}
      {step > 2 && <h3 style={{ marginTop: 0 }}>
        <KeyInMultiText finished={() => setStep(4)}>
          For mobile devices, we suggest viewing with full screen mode on upper right corner.<br />
        </KeyInMultiText>
      </h3>}

      {step > 3 && <h3 style={{ color: "var(--yellow)" }}>
        <KeyInMultiText finished={() => setStep(5)}>
          *iPhone並不支援全螢幕模式<br />
          *Full screen not available on iPhone<br />
        </KeyInMultiText>
      </h3>}
      {step > 4 && <div className="button" onClick={onClick}>OK</div>}
    </div >
  )
}

export const StratWord = ({ onClick }) => {
  const [step, setStep] = useState(0)
  return <div className="introText">
    <h2 style={{ marginBottom: 0 }}>
      <KeyInMultiText finished={() => setStep(1)}>
        {"公會成員們，亦或是路過的冒險者們大家好！"}<br />
        {"本冒險者公會有新任務發布！"}<br />
      </KeyInMultiText>
    </h2>
    {step > 0 && <h3 style={{ marginTop: 0 }}>
      <KeyInMultiText finished={() => setStep(2)}>
        {"Hello, Guildies or travelers passing by! New quest for the Adventurer’s Guild!"}<br />
      </KeyInMultiText>
    </h3>}

    {step > 1 && <h3 style={{ color: "var(--theme-c)", marginBottom: ".25em" }}><KeyInMultiText finished={() => setStep(3)}>
      {"[任務名稱 Main Quest]"}<br />
    </KeyInMultiText></h3>}
    {step > 2 &&
      <h3>
        <KeyInMultiText finished={() => setStep(4)}>
          {"Shoto’s Birthday Adventure"}<br /><br />
        </KeyInMultiText>
      </h3>
    }
    {step > 3 &&
      <h3 style={{ color: "var(--theme-c)", marginBottom: ".25em" }}><KeyInMultiText finished={() => setStep(5)}>
        {"[任務目的 Quest Info]"}<br />
      </KeyInMultiText></h3>}
    {step > 4 && <h3>
      <KeyInMultiText finished={() => setStep(6)}>
        {"為我們最 cool 最可愛的會長 Shoto 慶生"}<br />
        {"Celebrate birthday for our coolest and cutest Guild Leader Shoto."}<br />
        <br />
      </KeyInMultiText>
    </h3>
    }
    {step > 5 && <div className="button" onClick={onClick}>Next</div>}
  </div>
}

export const MissionHint = ({ onClick }) => {
  const [step, setSteps] = useState(0)
  const stepCount = useRef(0)
  useEffect(() => {
    if (step == 1) {
      setTimeout(() => {
        setSteps(2)
      }, 500);
    }
    if (step == 6 || step == 5) {
      setTimeout(() => {
        setSteps(7)
      }, 500);
    }
  }, [step])

  return (
    <div className="introText" style={{
      display: 'flex', flexDirection: "column", alignItems: "center",
      alignSelf: "flex-start", paddingTop: "3vh"
    }}>
      <div>
        <h1>
          <KeyInMultiText finished={() => setSteps(++stepCount.current)}>
            {"尋找目標"}
            <br />
            {"Target to find"}
          </KeyInMultiText>
        </h1>
      </div>
      {step > 0 && <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {Arr.map(({ url, text }, i) =>
          <div className="introBox" key={i}>
            <img src={url} alt="" />
            {step > 1 &&
              <KeyInMultiText finished={() => {
                stepCount.current++;
                setSteps(stepCount.current)
              }}>
                {text}
              </KeyInMultiText>
            }
          </div>
        )}
      </div>}
      {step > 6 &&
        <Link href={"/"}  >
          <div className="button" onMouseDown={() => { onClick(); setCookie("visited", true) }} >進入公會</div>
        </Link>
      }
    </div >
  )
}

export const KeyInMultiText = ({ children, finished = () => { } }) => {
  const [columns, setColumns] = useState([])
  const [columnLength, setColumnLength] = useState(1)
  useEffect(() => {
    if (columnLength > children.length) {
      finished(true)
      return
    }
    setColumns(children.slice(0, columnLength))
    typeof (children[columnLength - 1]) !== "string" && setColumnLength(columnLength + 1)
  }, [columnLength])

  return (
    columns.map((data, i) => typeof (data) == "string" ?
      <KeyInWord key={i} finished={() => setColumnLength(columnLength + 1)}>{data}</KeyInWord> :
      <br key={i} />
    )
  )
}

export const KeyInWord = ({ children, delayTime = 50, finished = () => { } }) => {
  const [texts, setTexts] = useState("");
  const wordLength = useRef(0)

  useEffect(() => {
    if (wordLength.current > children.length) {
      finished(true)
      return
    }
    const timer = setTimeout(() => {
      wordLength.current++;
      if (wordLength.current > children.length) { finished(true) }
      setTexts(children.slice(0, wordLength.current))
    }, delayTime);

    const pass = () => {
      wordLength.current = children.length
    }
    window.addEventListener("click", pass)
    window.addEventListener("touchstart", pass)
    return () => {
      window.removeEventListener("touchstart", pass)
      clearTimeout(timer)
    }
  }, [texts])



  return <span>{texts}</span>
}
