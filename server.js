const express = require('express')
const app = express()
const port = process.env.PORT ||  5000
const connectToDB = require("./config/db")


// CONNECTING TO DATABASE
connectToDB()

app.use(express.json({extended:false}))

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}`))
