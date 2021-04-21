const express = require('express')
const app = express()
const port = process.env.PORT ||  5000
const connectToDB = require("./config/db")
const path = require("path")


// CONNECTING TO DATABASE
connectToDB()

app.use(express.json({extended:false}))

app.use('/api/users',require('./routes/users'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/contacts',require('./routes/contacts'));


if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res) => {
        res.sendFile(path.resolve(__dirname + 'client' , 'build' , 'index.html'))
    })
}


app.listen(port, () => console.log(`Example app listening on port ${port}`))
