const mongoose = require('mongoose')
require('dotenv').config();

let url = process.env.DB_URL || "mongodb+srv://Gymapp:12345@cluster0.37gwfmi.mongodb.net/?retryWrites=true&w=majority" ;
const mongoConnect= async()=>{
    mongoose.connect(url).then(()=>{
        console.log("connection Succful")
    }).catch(()=>{
        console.log("Some Error")

    })
}
module.exports  = {
    mongoConnect
}