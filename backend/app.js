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
app.use('/api/v1/song', songRoute)
MONGO_URL = process.env.MONGO_URL;
const port = process.env.PORT || 8000; 
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('mongodb connected!')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('server is running!')
})