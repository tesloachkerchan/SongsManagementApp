const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();
const songRoute = require('./routes/songs');

const app = express()
// middle ware
app.use(cors())
app.use(express.json());
//route 
app.use('/api/v1/song',songRoute)
mongoose.connect('mongodb://127.0.0.1:27017/songApp')
    .then(() => {
        console.log('mongodb connected!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(4000, () => {
    console.log('server is running!')
})