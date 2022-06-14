const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const router = express.Router()
const api = require('./routes/api')
const app = express()

app.use(express.json())

mongoose.connect("mongodb://localhost/React_Bank_Data")

app.use('/',api)

const port = 6060
app.listen(port)





