import { member } from "@lib/type"
import { useState } from "react"

const teamTag = (() => {
  const arr = ["all"]
  member.map(({ team }) => {
    team.map(type => {
      arr.indexOf(type) == -1 && arr.push(type)
    })
  })
  return arr
})()

export default function Home() {
  const [selectedTag, setSelectedTag] = useState("all")
  return (
    <div className={"containerInside"} style={{
      border: "4px solid var(--theme-c)",
      background: "center / cover no-repeat url(./img/index/guild.png)",
      position: "relative"
    }}>
      <div className="overlay" />
      <div style={{ position: "absolute", display: "flex", inset: 0, padding: "2em", flexDirection: "column" }}>
        <div className="teamTagContainer" style={{ display: "flex", flexWrap: "wrap" }}>
          {teamTag.map(type => (
            <div className={"teamTag" + (selectedTag == type ? " focus" : "")} key={type}
              onClick={() => setSelectedTag(type)}
            >
              {type.toUpperCase()}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, overflow: "auto", paddingRight: "1em" }}>
          {member.map(({ team, ...data }, i) => (selectedTag == "all" || team.indexOf(selectedTag) > -1) && <MemberBlock key={i} team={team} {...data} />)}
        </div>
      </div>
    </div>
  )
}
const MemberBlock = ({ icon, name, team, link, text }) => {
  return (
    <div className="memberBlock" >
      <div className="memberIcon" style={{ background: `center / cover no-repeat url(/img/team/${icon})` }} />
      <div className="textBlock">
        <h3>{name}{team.map(data => <span>{data}</span>)}</h3>
        <div>{text.map((word, i) => <span key={i}>{word}<br /></span>)}</div>
        <div>{ }</div>
      </div>
    </div>
  )
}
