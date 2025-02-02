const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config() //loads environment variables from a .env file into process.env

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json()) //middleware to parse JSON

const subscribersRouter = require('./routes/subscribers')

app.use('/subscribers', subscribersRouter) 

app.listen(5000, () => console.log("Server Started"))
