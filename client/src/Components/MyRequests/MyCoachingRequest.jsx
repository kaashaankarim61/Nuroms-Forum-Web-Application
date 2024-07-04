import React, { useEffect, useState } from 'react'
import '../ViewCoachingServices/ViewCoachings.css'
import image from '../../resources/course.png'
import PictureFrame from '../../PictureRoundFrame/PictureFrame'
import CoachingRequest from '../CoachingRequest/CoachingRequest'
import InActiveCoachingRequest from '../InActiveCoachingRequest/InActiveCoachingRequest'
import {BsGridFill} from 'react-icons/bs'
import { useSelector } from 'react-redux'


function MyCoachingRequest() {
  
    const UserProfile = useSelector((state)=>{ return state.user.data })


   const [data, setData] = useState([]);
   useEffect(() => {
    fetch(`http://localhost:8080/nuroms/request/get-owner/${UserProfile._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const filteredData = data.filter(item => item.Status !== "Closed");
        setData(filteredData);
       
      })
      .catch((error) => {
      });
  }, []);



  const [data2, setData2] = useState([]);
  useEffect(() => {
   fetch(`http://localhost:8080/nuroms/request/get-ins/${UserProfile._id}`)
     .then((response) => {
       if (!response.ok) {
         throw new Error("Failed to fetch data");
       }
       return response.json();
     })
     .then((data) => {
      const filteredData = data.filter(item => item.Status !== "Closed");
       setData2(filteredData);
     
     })
     .catch((error) => {
     });
 }, []);


 const [data3, setData3] = useState([]);
 useEffect(() => {
  fetch(`http://localhost:8080/nuroms/request/get-closed/${UserProfile._id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      setData3(data);
    
    })
    .catch((error) => {
      console.log(error);
    });
}, []);



    const [rcvBtn, setRcvBtn] = useState(0);
    const [allBtn, setAllBtn] = useState(1);
    const [sentbtn, setSentBtn] = useState(0);
    const [pbtn,setpbtn] =useState(0);
  
  
    const [ac1,setAc1] =useState('Flt-Active')
    const [ac2,setAc2] =useState('')
    const [ac3,setAc3] =useState('')
    const [ac4,setAc4] =useState('')
  
  
    const handleCoachAll=()=>{
  
      if(allBtn==0){
        setAllBtn(1);
        setRcvBtn(0);
        setSentBtn(0);
        setpbtn(0);
  
        setAc1('Flt-Active');
        setAc2('');
        setAc3('');
        setAc4('')
      }
      
      else{
        setAllBtn(1);
        setRcvBtn(0);
        setSentBtn(0);
        setpbtn(0);
  
  
        setAc1('Flt-Active');
        setAc2('');
        setAc3('');
        setAc4('')
       
  
      }
  
    }
  
    const handleCoachRcv=()=>{
  
      if(!rcvBtn){
        setAllBtn(0);
        setRcvBtn(1);
        setSentBtn(0);
        setpbtn(0);
        setAc1('');
        setAc2('');
        setAc4('')
        setAc3('Flt-Active');
      }
      else
      {
        setAllBtn(1);
        setRcvBtn(0);
        setpbtn(0);
        setSentBtn(0);
        setAc1('Flt-Active');
        setAc2('');
        setAc3('');
        setAc4('')
  
      }
  
  
    }
  
    const handleCoachSent=()=>{
  
  
      if(!sentbtn){
        setAllBtn(0);
        setRcvBtn(0);
        setSentBtn(1);
        setpbtn(0);
  
  
        setAc1('');
        setAc2('Flt-Active');
        setAc3();
        setAc4('')
        
      }else{
        setAllBtn(1);
        setRcvBtn(0);
        setSentBtn(0);
        setpbtn(0);
  
        setAc4('')
        setAc1('Flt-Active');
        setAc2('');
        setAc3('');
  
      }
  
  
    }


    const handleP=()=>{
  
  
      if(!sentbtn){
        setAllBtn(0);
        setRcvBtn(0);
        setSentBtn(0);
        setpbtn(1);
  
  
        setAc1('');
        setAc2('');
        setAc3('');
        setAc4('Flt-Active')
        
      }else{
        setAllBtn(1);
        setRcvBtn(0);
        setSentBtn(0);
        setpbtn(0);
  
        setAc4('Flt-Active')
        setAc1('');
        setAc2('');
        setAc3('');
  
      }
  
  
    }
  
  

  
    return (
      <div className="CoachingServicePage">
        <div className="FilterBar">
          <div className='Bar'>
            <div className="Filter-Options">
              <button className={`Flt-Btn ${ac1}`}  onClick={()=>{handleCoachAll()}}  ><BsGridFill size={20}/></button>
              <div className='Bt-sp'></div>
              <button className={`Flt-Btn ${ac2}`}   onClick={()=>{handleCoachSent()}} >Sent Request</button>
              <div className='Bt-sp'></div>
              <button className={`Flt-Btn ${ac3}`}   onClick={()=>{handleCoachRcv()}}  >Recieved Request</button>
              <div className='Bt-sp'></div>
              <button className={`Flt-Btn  ${ac4}`} onClick={()=>{handleP()}}>Enrolled Session</button>
            </div>
          </div>
  
        </div>
        <div className="Scrollable_Service_Container">  
       
        { data.map(val=>{
              if((sentbtn==1 || allBtn==1) && data.length>0)
              return(
                  <CoachingRequest key={val._id} val={val} bit={1}/> 
              )
              else if(sentbtn==1 && data.length==0)
              return(
                  <h1>No request Sent</h1> 
              )
             })
        }
        
        { data2.map(val=>{
              if((rcvBtn==1 || allBtn==1)  && data2.length>0)
              return(
                  <InActiveCoachingRequest  key={val._id} val={val} /> 
              )
              else if(rcvBtn==1 && data2.length==0)
              return(
                <h1>No Reuest Recieved</h1>
              )
             })
        }

        { data3.map(val=>{
              if((pbtn==1 || allBtn==1) && data3.length>0)
              return(
                  <CoachingRequest key={val._id} val={val} bit={0}/> 
              )
              else if(pbtn==1 && data3.length==0)
              return(
                  <h1>No Req Found</h1> 
              )
             })
        }



    
        </div>
      </div>
      
    )
}

export default MyCoachingRequest
