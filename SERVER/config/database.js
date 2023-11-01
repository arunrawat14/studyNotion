const mongoose  = require('mongoose');
require("dotenv").config();

exports.dbconnect = ()=> {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> {
        console.log('Connected to database')
    })
    .catch((err)=> {
        console.log("Database Connection Failed")
        console.error(err)
        process.exit(1);
    })
}


