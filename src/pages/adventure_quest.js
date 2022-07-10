import { useEffect, useMemo, useRef, useState } from "react";
import Text from "@feature/adventure_quest/texts.json";

export default function Home() {
  const [showSingle, setShowSingle] = useState(-1)
  const [textList, setTextList] = useState([])
  useEffect(() => {
    setTextList(Text)
  }, [])
  const [imgUpdate, setImgUpdate] = useState(false)
  const imgCount = useMemo(() => parseInt(Math.random() * 4), [imgUpdate])

  return <div style={{ position: "absolute", inset: 0, padding: "0 1em 1em", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div className="containerInside aq">
      <div className="aqContainer">
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
        <img src={`/img/adventure_quest/cha_${imgCount}.png`}
          style={{ [imgCount % 2 == 1 ? "left" : "right"]: "-3em" }} />
      </div>
    </div>
  </div >
}

const Card = ({ children, name, show, ...props }) => {
  return (
    <div className={`card${show ? " show" : ""}`} {...props} >
      <div>
        {children && children.map(text => <>{text}<br /></>)}
      </div>
      {name && <div style={{ textAlign: "right", marginTop: ".5em" }}>by.{name}</div>}
    </div>
  )
}
