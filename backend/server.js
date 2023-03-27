require('dotenv').config()

const express = require('express') ;
const workoutRoutes = require('./routes/workouts')
const mongoose = require('mongoose');

const app = express();

//middleware 
app.use(express.json()) ;

app.use((req , res ,next) => {
   console.log(req.path ,req.method);
   next();
})

//routes 
app.use('/api/workouts' , workoutRoutes);

// connect to database
mongoose.connect(process.env.MONG_URL)
.then(()=> {

    //port connecting 
    app.listen(process.env.PORT , ()=> {
        console.log("Connected to DB & Server is on port", process.env.PORT ); 
    });

})

.catch((error)=> { 
    console.log(error);
})

