const userModel = require('../models/userModels.js')




//login callback function for "login"
const loginController =async (req, res)=>{
    try{
        const {email, password} = req.body; //Here we age getting "email & password" values from "client-side" through " 'body' or 'req.body' "
        const user = await userModel.findOne({email, password});    //Here we are matching obtained "email & password" in our database. If matched then it will return "true" else will return "false". 
        if(!user){
            return res.status(404).send('User not found.')
        }
        res.status(200).json({
            success : true,
            user,
        });
    }catch(error){
        res.status(400).json({
            success : false,
            error,
        })
    }
}

//register callback function for "register"
const registerController =async (req, res)=>{
    try{
        const newUser = new userModel(req.body);    //Here we create "newUser" and storing user data inside "userModel" and that "user data" is comming from "clint side" through ".body".
        await newUser.save();   //Here we are saving the data of "newUser".
        res.status(201).json({
            success : true,
            newUser,
        });

    }catch(error){
        res.success(400).json({
            success : false,
            error,
        })
    }
}


module.exports = {loginController, registerController};     //While giving multiple exports, we use "{}" to export.