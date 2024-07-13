import styles from "@/styles/home.module.less";
import { useEffect, useState } from "react";
import { MarkdownParse } from "../utils";


const marked = new MarkdownParse()

const Home = () => {
  const [text, setText] = useState("")
  const [html, setHTML] = useState("")
  
  useEffect(()=>{
    fetch("/demo.md").then(response=>{
      return response.text()
    }).then(text=>{
      setText(text)
    })
  }, [])

  useEffect(()=>{
    marked.parseToHTML(text).then((html: string)=>{
      // console.log("parse: ", html)
      setHTML(html)
    })
  }, [text])

  return (
    <div className={styles.pageHome}>
      <div className={`${styles.editor} ${styles.columnBox}`}>
        <textarea className={styles.inputBox} value={text} onChange={(event)=>setText(event.target.value)} ></textarea>
      </div>
      <div className={`${styles.preview} ${styles.columnBox}`} dangerouslySetInnerHTML={{__html: html}}>

      </div>
    </div>
  )
}

export default Home