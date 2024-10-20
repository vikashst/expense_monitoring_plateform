const mongoose = require('mongoose')
const { type } = require('os')

//Design Schema
const userSchema = new mongoose.Schema({        //This defines a new schema using Mongoose's Schema constructor.
    name : {
        type : String,
        required : [true, "name is required"]
    },
    email : {
        type : String,
        required : [true, "email is required"],
        unique : true,
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
},
{timestamps : true} //While Creating a record, it will also capture "date".
);


//Export

const userModel = mongoose.model('users', userSchema)   //Ist Param:- "users" is the name of the collection in the MongoDB database.    IInd Param:- "userSchema" is the schema that defines the structure of the documents in this collection.
module.exports = userModel  //Here, "module.exports" exports the "userModel" so that it can be used in other parts of the application.
