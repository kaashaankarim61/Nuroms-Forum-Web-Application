import React, { useEffect, useState } from 'react'
import './NotificationBox.css'
import Notification from './Notification/Notification'
import { useSelector } from 'react-redux';

function NotificationBox() {


  

  const UserProfile = useSelector((state)=>{ return state.user.data });

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/nuroms/notification/get/${UserProfile._id}`);
        const json = await response.json();
        console.log("JSON Notifications  = ",json);
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError("Eroor");
        console.error(error);
      }
    }

    fetchData();
    
  }, []);


  function Initializer(){
    if (isLoading) {
      return <div className='Loader'></div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  }



  return (
    <div className="Notification_Page">
       <div className="Notification_Cont">
        <div className="n_heading">
            <h1>Notification</h1>
        </div>

        <div className='Notification_inner_Container'>
        {/* <Notification val={vali}/> */}
        <Initializer/>
            {data.map(val=>{
            return(
                <Notification key={val._id} val={val}/> 
            )
            })}
        </div>
        </div>
       
    </div>
  )
}

export default NotificationBox






