const Workout = require('../models/workoutmodel');
const mongoose = require('mongoose');

//get all workouts 
const getWorkouts = async (req , res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts);
}

//get a single workout
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error :"`No such workouts"});
    }

    const singleWorkout = await Workout.findById(id) ;
    if(!singleWorkout) {
        return res.status(400).json({msg : "wahala ti wa oo , no such workouts"});
    }
    res.status(200).json(singleWorkout);
}

//create a workout 
const createWorkout = async (req , res)=> {
    const {title , reps , load} = req.body ;

    // error handling on forms
    let emptyFields = [];
    if(!title) {
        emptyFields.push('tile') ;
    }
    if(!reps) {
        emptyFields.push('reps') ;
    }
    if(!load) {
        emptyFields.push('load') ;
    }
    if(!emptyFields.length > 0) { return res.status(400).json({error : 'Please fill in all fields', emptyFields})} ;
    

    // add to db
    try { 
       const workout = await Workout.create({title , reps , load}) ;
       res.status(200).json(workout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
//delete a workout 
const deleteWorkout = async (req , res )=> {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error :"`No such workouts"});
    }
    const workout = await Workout.findOneAndDelete({_id : id}) ;
    if(!workout) {
        return res.status(400).json({msg : "wahala ti wa oo , no such workouts"});
    }
    res.status(200).json(workout);
}

//update a workout 
const updateWorkout = async (req , res) => {
    const { id } = req.params; 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error :"`No such workouts"});
    }

    const workout = await Workout.findOneAndUpdate({_id : id} , {
        ...req.body
    })

    if(!workout) {
        return res.status(400).json({msg : "wahala ti wa oo , no such workouts"});
    }
}
module.exports = {
    getWorkouts ,
    getSingleWorkout,
    createWorkout ,
    deleteWorkout ,
    updateWorkout
}