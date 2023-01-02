const express = require("express");
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        console.log(newNote);

        db.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(db), (err) => {(err) ? console.log(err) : console.log('success')});

        res.status(201).json(newNote);

    } else {
        res.status(500).json('Error saving your note');
    }
});

app.listen(PORT, ()=> console.log(`listening on PORT: ${PORT}`));
