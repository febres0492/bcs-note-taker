const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

let PORT = 5010

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// sending notes.html
app.get('/notes', (req, res) =>{
    console.log(`returning public/notes.html`)
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// sending notes in database
app.get('/api/notes', (req, res) => {
    console.log('returning /api/notes')
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error("Error:", err)
            return
        }
        // adding inndex id to notes
        data = JSON.parse(data).reduce((acu, cur, i) => {
            cur.id = i
            console.log(acu)
            return [...acu, cur]
        },[])
        console.log(data)
        res.json(data)
    })
})

app.get('/paths', (req, res) => {
    res.sendFile(path.join(__dirname, ))
})

app.post('/api/notes', (req, res) => {
    console.log(`adding note`, req.body)
    const db = require('./db/db.json')
    db.push(req.body)
    console.log('db',db)

    // whiting to db.json
    fs.writeFile('./db/db.json', JSON.stringify(db, null, 4), (err) => {
        if (err) {
            console.error("Error:", err)
        }
    })
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
