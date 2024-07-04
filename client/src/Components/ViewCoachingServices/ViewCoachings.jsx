import React, { useEffect, useState } from 'react'
import './ViewCoachings.css'
import image from '../../resources/course.png'
import PictureFrame from '../../PictureRoundFrame/PictureFrame'
import CoachingRequest from '../CoachingRequest/CoachingRequest'
import InActiveCoachingRequest from '../InActiveCoachingRequest/InActiveCoachingRequest'
import {BsGridFill} from 'react-icons/bs'
import { useSelector } from 'react-redux'




function ViewCoachings() {
  const UserProfile = useSelector((state)=>{ return state.user.data })
  const [ data, setData]  =useState([]);
  const [data2, setData2] =useState([]);
  const [reqBtn, setReqBtn] = useState(0);
  const [allBtn, setAllBtn] = useState(1);
  const [sessbtn, setSessBtn] = useState(0);


  const [ac1,setAc1] =useState('Flt-Active')
  const [ac2,setAc2] =useState('')
  const [ac3,setAc3] =useState('')


  const handleCoachAll=()=>{

    if(allBtn==0){
      setAllBtn(1);
      setReqBtn(0);
      setSessBtn(0);

      setAc1('Flt-Active');
      setAc2('');
      setAc3('');
    }
    
    else{
      setAllBtn(0);
      setReqBtn(0);
      setSessBtn(0);


      setAc1('');
      setAc2('');
      setAc3('');
     

    }

  }

  const handleCoachReq=()=>{

    if(!reqBtn){
      setAllBtn(0);
      setReqBtn(1);
      setSessBtn(0);
      setAc1('');
      setAc2('');
      setAc3('Flt-Active');
    }
    else
    {
      setAllBtn(0);
      setReqBtn(0);
      setSessBtn(0);
      setAc1('');
      setAc2('');
      setAc3('');

    }


  }

  const handleCoachSess=()=>{


    if(!sessbtn){
      setAllBtn(0);
      setReqBtn(0);
      setSessBtn(1);


      setAc1('');
      setAc2('Flt-Active');
      setAc3();
      
    }else{
      setAllBtn(0);
      setReqBtn(0);
      setSessBtn(0);

      setAc1('');
      setAc2('');
      setAc3('');

    }


  }


    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:8080/nuroms/request/get-public-active');
          const json = await response.json();
          console.log("JSON Data2  = ",json);
          const updatedUsers = json.filter(user => user.RequestOwner !== UserProfile._id).filter(user => user.Instructor !== UserProfile._id);
          console.log("Updated Data 2", updatedUsers);
          setData2(updatedUsers);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }, []);



    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch('http://localhost:8080/nuroms/request/get-public-inactive');
          const json = await response.json();
          console.log("JSON = ",json);
          const updatedUsers = json.filter(user => user.RequestOwner !== UserProfile._id);
          console.log("Updated", updatedUsers);
          setData(updatedUsers);
        } catch (error) {
          console.error(error);
        }
      }

      fetchData();
    }, []);


  return (
    <div className="CoachingServicePage">
      <div className="FilterBar">
        <div className='Bar'>
          <div className="Filter-Options">
            <button className={`Flt-Btn ${ac1}`}  onClick={()=>{handleCoachAll()}}  ><BsGridFill size={20}/></button>
            <div className='Bt-sp'></div>
            <button className={`Flt-Btn ${ac2}`}   onClick={()=>{handleCoachSess()}} >Coaching Sessions</button>
            <div className='Bt-sp'></div>
            <button className={`Flt-Btn ${ac3}`}   onClick={()=>{handleCoachReq()}}  >Coaching Requests</button>
          </div>
        </div>

      </div>
      <div className="Scrollable_Service_Container">

        {data2.map(val=>{
              if((sessbtn==1 || allBtn==1) && data2.length>0)
              return(
                  <CoachingRequest key={val._id} val={val} bit={0}/> 
              )
              else if(sessbtn==1 && data2.length==0)
              return(
                <h1>No Puclic Requests</h1>
              )
        })}


        {data.map(val=>{
              if((reqBtn==1 || allBtn==1)  && data.length>0)
              return(
                  <InActiveCoachingRequest key={val._id} val={val}/> 
              )
              else if(reqBtn==1 && data.length==0)
              return(
                <h1>No Puclic Requests   {console.log("hi")}</h1>
              )
        })}


      </div>
    </div>
    
  )
}

export default ViewCoachings
