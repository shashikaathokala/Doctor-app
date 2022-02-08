const app = require('./server')
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;



const uri = process.env.Atlas_URI;
mongoose.connect(uri,{useNewUrlParser: true}
    );
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connection has been established");
})


// app.use('/insurance')

