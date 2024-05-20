const express = require('express')
const path = require('path')
const U = require('./utils')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let PORT = 5010

app.use(express.static('public'))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

// sending notes.html
app.get('/notes', (req, res) =>{
    console.log(`returning public/notes.html`)
    res.sendFile(path.join(__dirname, 'public/notes.html'))
})

// api for sending notes in database
app.get('/api/notes', (req, res) => {
    console.log('returning /api/notes')
    U.getNotes((err, data)=>{
        if (err){ console.error(err); return}
        res.json(data)
    })
})

// app.get('/paths', (req, res) => {
//     res.sendFile(path.join(__dirname, ))
// })

// api for adding notes to DB
app.post('/api/notes', (req, res) => {
    U.getNotes((err, db)=>{
        if (err){ console.error(err); return}
        const note = {...req.body, id: db.length}// adding id to new note
        db.push(note)
        console.log('db',db)
        U.writeToDB(db)
        res.json(note)// sending new note
    })
})

// api to delete notes
app.delete('/api/notes/:id', (req, res) =>{
    const id = req.params.id
    U.getNotes((err, db)=>{
        if (err){ console.error(err); return}
        db = db.filter(note => note.id != id )// filterting out note
        console.log('db',db)
        U.writeToDB(db)// updating db
        res.json(db)// sending updated db
    })
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
)
