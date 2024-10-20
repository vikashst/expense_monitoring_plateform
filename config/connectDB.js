const mongoose = require('mongoose')
const colors = require('colors')

const connectDB =async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Cloud Server is running on:- ${mongoose.connection.host}`.bgGreen.bold) // "mongoose.connection.host" is used to check weather your connection "Local-host" or "cloud".
    }catch(error){
        console.log(`${error}`.bgRed)
    }
}

module.exports = connectDB  //Here, we are exporting our "connectDB" function.