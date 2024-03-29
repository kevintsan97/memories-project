// import express from 'express';
// import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
// import cors from 'cors';
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const postRoutes = require('./routes/posts')
const userRoutes = require('./routes/users')

const app = express()

// Get secret
require ('dotenv').config()

app.use(bodyParser.json({limit : "30mb",extended: true}));
app.use(bodyParser.urlencoded({limit : "30mb",extended: true}));
app.use(cors());


///
app.use('/posts', postRoutes)
app.use('/users',userRoutes)
///

app.get('/',(req,res)=>{
        res.send('APP IS RUNNING');
});

const CONNECTION_URL=process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
        .then (()=> app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)))
        .catch((error) => console.log("db connection error - " +error.message));

