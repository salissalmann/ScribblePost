const mongoose = require('mongoose');

const DBstring = "mongodb+srv://salissalman:Salis2002@published.pitaad6.mongodb.net/?retryWrites=true&w=majority"
mongoose.set('strictQuery',true)

const ConnectToMongo = ()=>
{
    mongoose.connect(DBstring , ()=> { console.log("CONNECTED TO DATABASE SUCCESSFULLY") })
}

module.exports = ConnectToMongo;