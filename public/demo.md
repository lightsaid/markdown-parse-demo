# Example Markdown

This is example markdown...

## Table 

show table style.

| col | col | col | col | col | col |
| - | - | - | - | - | - |
| content | content | content | content | content | content |
| content | content | content | content | content | content |
| content | content | content | content | content | content |
| content | content | content | content | content | content |

## JavaScript Code

show javascript code style.

```javascript
import styles from "@/styles/home.module.less";
import { useEffect, useState } from "react";
import { MarkdownParse } from "../utils";

const marked = new MarkdownParse()

const Home = () => {
  const [text, setText] = useState("")
  const [html, setHTML] = useState("")
  

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

```

## Golang Code

show golang code style.

```go
package main

import (
	"context"
	"database/sql"
	"errors"
	"log"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

var db *sql.DB

func openSQLite() {
	var err error
	db, err = sql.Open("sqlite3", "./store.db")
	if err != nil {
		log.Fatalln("fail to open db: ", err)
	}
}

func insertdb(url, data string) (int64, error) {
	querySQL := `insert into store(url, data) values ($1, $2)`

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	stmt, err := db.PrepareContext(ctx, querySQL)
	if err != nil {
		return 0, err
	}
	defer stmt.Close()

	res, err := stmt.ExecContext(ctx, url, data)
	if err != nil {
		return 0, err
	}

	_, err = res.RowsAffected()
	if err != nil {
		return 0, err
	}

	newId, err := res.LastInsertId()
	if err != nil {
		return 0, err
	}

	if newId <= 0 {
		return 0, errors.New("get lastInsertId error")
	}

	return newId, nil
}

func querydb(url string) (*Model, error) {
	var querySQL = `select id, url, data from store where url = $1 order by created_at DESC limit 1`

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	stmt, err := db.PrepareContext(ctx, querySQL)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	m := new(Model)
	row := stmt.QueryRow(url)
	err = row.Scan(
		&m.ID,
		&m.URL,
		&m.Data,
	)
	if err != nil {
		return nil, err
	}
	return m, nil
}

```
