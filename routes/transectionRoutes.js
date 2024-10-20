const express = require('express')  //Importing "express" package.
const { addTransection, getAllTransection, editTransection, deleteTransection, } = require('../controllers/transectionController.js')


//Router object (To perform routing)
const router = express.Router()

//Routers:-
//1. POST || ADD TRANSECTION     Note:- Here "POST" means method will be "POST" for this operation.
router.post('/add-transection', addTransection)

//3. POST || EDIT TRANSECTION     Note:- Here "POST" means method will be "POST" for this operation.
router.post('/edit-transection', editTransection)

//4. POST || DELETE TRANSECTION     Note:- Here "POST" means method will be "POST" for this operation.
router.post('/delete-transection', deleteTransection)

//2. POST || GET ALL TRANSECTIONS
router.post('/get-transection', getAllTransection)

module.exports = router