const express = require('express');   // simply we are importing the express so wen can use its all libraries.
const app = express();
const port = process.env.port || 8080   //Used for server port
//install nodemon so we dont need to run again and again app.js.
//nodemon helps in live changes 
//nodemon app.js  (command to run app.js using nodemon)
const authRoute = require('./routes/auth-gaurd'); //importing routes from auth-gaurd.js
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const user = require('./models/user');

mongoose.connect('mongodb://localhost:27017/EternalLight', (err)=>{
    if(err){
        console.log('Database Connection Failed!');
    }else{
        console.log('Database Connection Success!');
    }
});

JWT_SECRET="8asdsfsd9sdgs98fgddugs";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use('/auth',authRoute);
app.get('/',(req,res) => {
    res.send('Welcome to the Node Server!!!');
});




app.listen(port, ()=>{
    console.log('Node server Connectd at port :', port);
})

