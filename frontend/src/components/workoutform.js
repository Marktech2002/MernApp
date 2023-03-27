import { useState } from "react";


const WorkoutForm = () => {
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields , setEmptyFields] = useState([])
   
    // handles the form subsmission
    const handleSubmit  = async (e) => {
      e.preventDefault(); 
      const workouts = {title , load , reps}  ;
      const response = await fetch('/api/workouts' , {   // post request to post endpoint
            method : 'POST',
            body : JSON.stringify(workouts) ,
            headers : {
                'content-Type' : 'application/json' 
            }
      });

      const json = await response.json(); // json format

      if(!response.ok) {
       setError(json.error);
       setEmptyFields(json.emptyFields);
      }  

      if(response.ok) {
        setError(null);
        setTitle('');
        setLoad('');
        setReps('');
        setEmptyFields([]);
        console.log ("new workout created successfully" , json)
      }  

    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Workouts</h3>
            <label>Exercise Title :</label>
            <input type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' :  ''}
            />

            <label>Load in kg :</label>
            <input type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' :  ''}
            />

            <label>Reps :</label>
            <input type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' :  ''}
            />
            <button>Add a workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )   
}

export default WorkoutForm;