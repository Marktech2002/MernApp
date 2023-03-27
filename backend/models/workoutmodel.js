const mongoose = require('mongoose');
const Scheme = mongoose.Schema;

const workoutSchema = new Scheme ({
    title : {
        type : String ,
        required : true 
    },
    reps : {
        type : Number ,
        required : true 
    },
    load : {
        type : Number ,
        requird : true 
    }
} ,{timestamps : true });

module.exports = mongoose.model('Workout' , workoutSchema)