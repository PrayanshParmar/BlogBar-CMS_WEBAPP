const mongoose = require('mongoose');

const DB= process.env.DB_TEST;

mongoose.connect(DB).then(() => {
    console.log('Connected Succesfully!');
}).catch((err) =>console.log("Connection Failed"));