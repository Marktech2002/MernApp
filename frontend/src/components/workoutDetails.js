
const WorkoutDetails = ({workout}) => {
      const handleClick = async ()=> {
          const response = await fetch('/api/workouts/' + workout._id , {
             method : 'DELETE'
          });

            const json = await response.json();
            if(response.ok) {
               console.log("Delete succesfully" , json) 
            }
            if(!response.ok) {
                 
            }
      }
     
      return ( 
          <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Loads in (kg): </strong>{workout.load}</p>
            <p><strong>Reps : </strong>{workout.reps}</p>
            <p>{workout.createdAt}</p>
            <span onClick={handleClick}>Delete</span>
          </div>

      )
}  

export default WorkoutDetails ;