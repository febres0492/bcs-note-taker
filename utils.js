const fs = require('fs')

function getDB(callback){
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
            console.error("Error:", err)
            return
        }
        callback(null, JSON.parse(data))
    })
}

function writeToDB(data){
    fs.writeFile('./db/db.json', JSON.stringify(data, null, 4), (err) => {
        if (err) { console.error("Error:", err) }
    })
}

module.exports = {
    getDB, writeToDB
}