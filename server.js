const express = require('express')
const path = require('path')
const U = require('./utils')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 5010

app.use(express.static('public'))

// home page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')))

// sending notes.html
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')) )

// api for sending notes in database
app.get('/api/notes', (req, res) => {
    U.getDB((err, db)=>{
        if (err){ console.error(err); return}
        res.json(db)
    })
})

// api for adding notes to DB
app.post('/api/notes', (req, res) => {
    U.getDB((err, db)=>{
        if (err){ console.error(err); return}
        const note = {...req.body, id: db.length}// adding id to new note
        db.push(note)
        U.writeToDB(db)
        res.json(note)// sending new note
    })
})

// api to delete notes
app.delete('/api/notes/:id', (req, res) =>{
    const id = req.params.id
    U.getDB((err, db)=>{
        if (err){ console.error(err); return}
        db = db.filter(note => note.id != id )// filterting out note
        U.writeToDB(db)// updating db
        res.json(db)// sending updated db
    })
})

// Fallback route for when a user attempts to visit routes that don't exist
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')) )

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
)
