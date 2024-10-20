const express = require('express')  //Importing "express" package.
const { loginController, registerController } = require('../controllers/userController.js')     //Importing "loginController" from "controllers" to perform "login" functionality.

//Router object (To perform routing)
const router = express.Router()

//Routers:-
//1. POST || LOGIN USER     Note:- Here "POST" means method will be "POST" for this operation.
router.post('/login', loginController)

//2. POST || REGISTER USER
router.post('/register', registerController)

module.exports = router