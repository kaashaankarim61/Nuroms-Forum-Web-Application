import React, { useEffect, useState } from 'react'
import './Notification.css'
import '../../PostPage/Comment/Comment.css'
import image from '../../../resources/man.jpg'
import PictureFrame from '../../../PictureRoundFrame/PictureFrame'
import { useSelector } from 'react-redux'




function Notification(props) {

  const UserProfile = useSelector((state)=>{ return state.user.data });
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [IMG, setIMG] =useState(image);


  useEffect(() => {
    async function fetchData() {
      try {
        const response2 = await fetch(`http://localhost:8080/nuroms/user/get/id/${props.val.SenderId}`);
        const json2 = await response2.json();
        console.log("JSON User Notification = ",json2);
        setData2(json2);
      } catch (error) {
        console.error(error);
      }      

      try {
        const response3 = await fetch(`http://localhost:8080/nuroms/image/get/${props.val.SenderId}`);
        const json3 = await response3.json();
        console.log("JSON Image  = ",json3);
        setData3(json3);
        if(json3.Image!=null)
        setIMG(json3.Image);
      } catch (error) {
        console.error(error);
      }

    }

    fetchData();
  }, []);



function MeetingLink(){
    return(
        <>
         <div className='MeetNotBox'>
            <div className='Attr_Note'>
              <h6>Meeting Link : </h6><a href={props.val.MeetingLink}>{props.val.MeetingLink}</a>
            </div>
            <div className='Attr_Note'>
              <h6>Coaching Topic : </h6><a href="">{props.val.CoachingTopic}</a>
            </div>
        </div>
         <div className='Time_Note'>
            <h6>Time : </h6><p>{props.val.MeetingTime}</p>
         </div>
        
        
        </>
       
    )
}


function OfferAcceptence(){
    return(
        <>
         <div className='MeetNotBox'>
            <div className='Attr_Note' style={{flexDirection: 'column'}}>
            <h6 style={{fontWeight  : 600 , alignSelf : "flex-start", marginBottom: "5px"}}>Dear {UserProfile.Name},</h6>
            <h6 style={{marginRight :"10px"}} >{props.val.Text}</h6>
            </div>
            <div className='Attr_Note'>
              <h6>Coaching Topic : </h6><a href="">{props.val.CoachingTopic}</a>
            </div>
        </div>
         {/* <div className='Time_Note'>
            <h6> Closing Date: </h6><p>{props.val.MeetingDate}</p>
         </div>   */}
        </>
       
    )
}


function Notification_Selector(){
  if(props.val.MeetingLink!=null)
  return(
      <MeetingLink/>
  )
  else if(props.val.MeetingLink==null && props.val.CoachingTopic!=null)
  return(
    <OfferAcceptence/>
  )
  else
  return(
    <Simple_Notification/>
  )
}


function Simple_Notification(){
  return(
      <>
       <div className='MeetNotBox'>
          <div className='Attr_Note'>
            <h6 style={{fontWeight  : 600}}>Dear {UserProfile.Name},</h6>
          </div>
          <div className='Attr_Note'>
            <h6>{props.val.Text}</h6>
          </div>
      </div>
      </>
     
  )
}






  return (
    <div className='Notification_Cont_T'>
         <div className="Sender-Details">
            <PictureFrame width={`45px`} padding1={`2px`} padding2={`1px`} backgroundColor={`#FBAB7E`} backgroundImage={`linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)`} image={IMG}  />
            <p className='Commentee-Name' >{data2.Name}</p>
        </div> 
        <div className="Message_Note">
            <Notification_Selector/>
        </div>
      
    </div>
  )
}

export default Notification
