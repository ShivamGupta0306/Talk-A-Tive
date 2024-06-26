const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async() =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB Connection: ${conn.connection.host}`)
    } catch(err) {
        console.log("error", err.message);
        process.exit();
    }
}

module.exports = connectDB;
