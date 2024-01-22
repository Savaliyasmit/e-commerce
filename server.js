require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT 
const morgan =require('morgan')
const connect = require('./db/db.js')
const {UserRouter, ProductRouter}= require('./routes/users/index.routes.js')

const path = require('path')
const imagePath = path.join(__dirname,'images').replace(/\\/g,'/')

// middelware
app.use(morgan("dev"));
app.use(express.json());
app.use('/images',express.static(imagePath));


// base routes and combinedroutes
app.use('/api/v1/users',UserRouter)
app.use('/api/v1/admin',ProductRouter)

app.listen(port,()=>{console.log(`server was conncted localhost:${port}`);})

connect()
.then(()=>console.log("DB was conncted"))
.catch((error)=>console.log(console.log("DB failed to connect"),error))
