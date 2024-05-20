const express = require('express');
const path = require('path');
const U = require('./utils')

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
    U.getNotes((err, data)=>{
        if (err){ console.error(err); return}
        res.json(data)
    })
})

// app.get('/paths', (req, res) => {
//     res.sendFile(path.join(__dirname, ))
// })

// adding note to DB and sending
app.post('/api/notes', async (req, res) => {
    U.getNotes((err, db)=>{
        if (err){ console.error(err); return}
        
        // adding id to new note
        const note = {...req.body, id: db.length}
        db.push(note)
        console.log('db',db)
        U.writeToDB(db)

        res.json(note)
    })
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
