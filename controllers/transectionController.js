const transectionModel = require("../models/transectionModel.js");
const moment = require("moment");

//This controller is for getting all transections.
const getAllTransection = async (req, res) => {
  try {
    const { frequency, selectedDate, type } = req.body;
    const transections = await transectionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              //This is for
              $gte: moment().subtract(frequency, "days").toDate(), //Here we are using "gte(greater than equal-to)" mongoDB query to find data.
            },
          }
        : {
            date: {
              $gte: selectedDate[0],
              $lte: selectedDate[1],
            },
          }),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transections);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//This controller is for Edit your transection.
const editTransection = async(req,res)=> {
    try{
        await transectionModel.findOneAndUpdate({_id:req.body.transectionId}, req.body.payload)
        res.status(200).send('Edited Successfully');
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}

//This controller is for Delete your transection.
const deleteTransection = async(req,res)=> {
    try{
        await transectionModel.findOneAndDelete({_id:req.body.transectionId})
        res.status(200).send('Transection Deleted');
    }catch(error){
        console.log(error)
        res.status(500).json(error)
    }
}


//This controller is for adding a new transection.
const addTransection = async (req, res) => {
  try {
    const newTransection = new transectionModel(req.body);
    await newTransection.save();
    res.status(201).send("Transection Created");
  } catch (error) {
    console.log(error);
    res.satus(500).json(error);
  }
};

module.exports = { getAllTransection, addTransection, editTransection, deleteTransection };

