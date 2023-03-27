const express = require('express');

const router = express.Router();
const { createWorkout , 
       getSingleWorkout ,
       getWorkouts, 
       deleteWorkout,
       updateWorkout} =  require('../controllers/workoutContollers');

//get all workouts
router.get('/' , getWorkouts);

//get a single workout 
router.get('/:id' , getSingleWorkout);

//post a new workouts 
router.post('/', createWorkout);

//delete a workout
router.delete('/:id', deleteWorkout);

//update a workout
router.patch ('/:id', updateWorkout);

module.exports = router ;