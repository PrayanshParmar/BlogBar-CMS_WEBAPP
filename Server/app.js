const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
require('./db/config');
const path = require('path');




const app = express();
const PORT = process.env.PORT;



app.use(express.json());
app.use(require('./routes/route'));
app.use(express.urlencoded({extended: true}));

app.get("/",(req,res)=>{
    app.send("I am a Server")
})

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
})
