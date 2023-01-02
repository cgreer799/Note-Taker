const express = require("express");
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const db = require('./db/db.json');
const store = require('./db/store');

const app = express();
const router = express().router();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/api/notes', (req, res) => {
    store
    .getNotes()
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post('/api/notes', (req, res) => {
    store
      .addNote(req.body)
      .then((note) => res.json(note))
      .catch((err) => res.status(500).json(err));
});

router.delete('/api/notes/:id', (req, res) => {
store
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
});

app.listen(PORT, ()=> console.log(`listening on PORT: ${PORT}`));
