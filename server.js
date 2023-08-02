const express = require('express')
const cors = require('cors')
require("dotenv/config")

const app = express()

// middleware

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors());
// routers
const router = require('./routes/router.js')
app.use('/', router)



//port

const PORT = process.env.PORT || 8080

//server

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})