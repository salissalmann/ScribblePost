const ConnectToMongo = require('./Mongo');

const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json())

ConnectToMongo();

//Routing.
app.use(cors());
app.use('/authorization' , require('./routes/Authorization'))
app.use('/notes' , require('./routes/Notes'))

app.listen( 3001 , ()=> {console.log("LISTENING AT PORT: 3001")} )
