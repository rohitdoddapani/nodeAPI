const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = require('./config/db').database;


//Database connection
mongoose.connect( process.env.MONGO_URI || db,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => {
        console.log("Database connected successfully")
    })
    .catch((err) => {
        console.log("unable to connect to database ")
    });

//Defining the PORT
const port = process.env.PORT || 5000;

//initialize cors module
app.use(cors());

// Initialize bodyparser middleware
app.use(bodyParser.json())

//using Routes
app.use('/api/users',require('./routes/users'))

//heroko step-3
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, 'client','build','index.html'));
    })
}

//listening to server
app.listen(port,() => {
    console.log("server started on port ",port);
});
