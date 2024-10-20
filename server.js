/* We are making this project on the basis of "MVC(Model-View-Controller)" pattern.
    The Model-View-Controller (MVC) pattern is a software architectural design that separates an application's concern into three interconnected components.
    For the folder structure, a typical MVC approach is:-
    (1) Models:- Store data-related logic, e.g., User.js, Product.js
    (2) Views:- Responsible for displaying data, e.g., UserView.js, ProductView.js
    (3) Controllers:- Handle requests, interact with models, and direct interactions to views, e.g., UserController.js, ProductController.js 
*/

const express = require('express')  //Here we are importing or initializing "express".
const cors = require('cors')    //Here Importing "cors" middleware.
const morgan = require('morgan')    //With the help of "morgan", while hitting the URL, we can see the status in console that how request sent.
const dotenv = require('dotenv')    //We use "dotenv" to avoid exposing confidential data.
const connectDB = require('./config/connectDB.js')  //Here, importing "connectDB.js" file from "config" folder.
// const colors = require('colors')  //WE use "color" to get "color & style" in your node.js console.
const path = require('path')


//6. config "dotenv" file
dotenv.config()

//7. Database calling
connectDB()


//1. Creating "REST Object" for "REST API's "
const app = express()   //Now we can use every features of "express" through this "app".

//2. Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//3. Routes:-
//user routes
app.use("/api/v1/users", require("./routes/userRoute.js"));
//transection routes
app.use("/api/v1/transections", require("./routes/transectionRoutes.js"))



//Static File(This is for deployment)
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})



//4. Port
const PORT = 8080 || process.env.PORT   // Take 8080 port, which will work in development mode. OR take port from "environment variable ==> which is "env" and this will work in production mode.

//5. Listen server
app.listen(PORT, ()=>{
    console.log(`Local Server is running on port:- ${PORT} `)
});