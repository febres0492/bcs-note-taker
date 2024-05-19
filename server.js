const express = require('express');
const path = require('path');
const fs = require('fs')

const app = express()
let PORT = 5010

app.use(express.static('public'))

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) =>{
    console.log(`returning public/notes.html`)
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error("Error:", err)
            return
        }
        console.log('returning /api/notes')
        res.json(JSON.parse(data))
    })
})

app.get('/paths', (req, res) => {
    res.sendFile(path.join(__dirname, ))
})

app.post('/api/notes', (req, res) => {
    console.log('res', req)
    console.log('------------------------------------------------------------')
    console.log('------------------------------------------------------------')
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
