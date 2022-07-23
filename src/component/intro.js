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
      <h1>!</h1>
      <h2>
        <KeyInMultiText finished={() => setStep(1)}>
          建議使用電腦瀏覽器來獲取更好的體驗 <br />
          手機瀏覽器建議點選右上角全螢幕模式來觀看網頁<br />
          *full screen is not available in iphone<br />
        </KeyInMultiText>
      </h2>
      {step > 0 && <div className="button" onClick={onClick}>OK</div>}
    </div>
  )
}

export const StratWord = ({ onClick }) => {
  const [step, setStep] = useState(0)
  return <div className="introText">
    <h1>
      <KeyInMultiText finished={() => setStep(1)}>
        公會成員們，亦或是路過的冒險者們大家好！<br />
        本冒險者公會有新任務發布！
      </KeyInMultiText>
    </h1>
    {step > 0 &&
      <h2>
        <KeyInMultiText finished={() => setStep(2)}>
          {"[任務名稱]"}<br />
          {"Shoto’s Birthday Adventure"}<br />
          <br />
          {"[任務目的]"} <br />
          {"為我們最 cool 最可愛的會長 Shoto 慶生"}<br /> <br />
        </KeyInMultiText>
      </h2>
    }
    {step > 1 && <div className="button" onClick={onClick}>Next</div>}
  </div>
}

export const MissionHint = ({ onClick }) => {
  const [step, setSteps] = useState(0)
  useEffect(() => {
    if (step == 1) {
      setTimeout(() => {
        setSteps(2)
      }, 500);
    }
    if (step == 6) {
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
          <KeyInMultiText finished={() => setSteps(step + 1)}>
            記住要找的任務
            <br />
            Remember to find mission
          </KeyInMultiText>
        </h1>
      </div>
      {step > 0 && <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {Arr.map(({ url, text }, i) =>
          <div className="introBox" key={i}>
            <img src={url} alt="" />
            {step > 1 &&
              <KeyInMultiText finished={() => setSteps(step + 1)}>
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
    return () => {
      clearTimeout(timer)
    }
  }, [texts])
  return <span>{texts}</span>
}
