const express = require("express");
const fs = require('fs');
const uuid = require('uuid')
const path = require('path');
const db = require('./db/db.json')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static('public'));
app.listen(PORT, ()=> console.log(`listening on PORT: ${PORT}`))