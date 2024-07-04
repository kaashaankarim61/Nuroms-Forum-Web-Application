import React, { useEffect, useState } from 'react'
import '../ViewCoachingServices/ViewCoachings.css'
import './CoachingRequest.css'
import image from '../../resources/man.jpg'
import PictureFrame from '../../PictureRoundFrame/PictureFrame'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../store/slices/userSlice'

function CoachingRequest(props) {

  const isoDateString = props.val.DateCreated;
  const date = new Date(isoDateString);
  const DateCreated_= date.toLocaleDateString().split('/').join('-');;
  const dispatch =useDispatch();

  const [parBit, setparBit] =useState(0);

  const isoDateString2 = props.val.ClosingDate;
  const date2 = new Date(isoDateString2);
  const Closingdate = date2.toLocaleDateString().split('/').join('-');;
  
  console.log("The Obj",props.val);
  const UserProfile = useSelector((state)=>{ return state.user.data });

  const str = props.val.Topic;
  const words = str.split(" ");
  const midpoint = Math.floor(words.length / 2);
  const firstHalf = words.slice(0, midpoint).join(" ");
  const secondHalf = words.slice(midpoint).join(" ");

  const [insImage, setInsImage] =useState(image);
  const [ownerImage, setOwnerImage] =useState(image);

  const [reqOwner,setReqOwner]  =useState({});
  const [instructor, setInstructor] =useState({});
  const [ParticipantData, setP_Data] =useState(0);


  function Accpetence_Check_Component(){

    const [isOpen, setIsOpen] = useState(false);
    const [chngBid,setchngBid] =useState('');

    const handleOpenModal = () => {
      setIsOpen(true);
    };

    const handleCloseModal = () => {
      setIsOpen(false);
    };


    const handleCancel = async ()=>{
      fetch(`http://localhost:8080/nuroms/request/delete/${props.val._id}`, {
        method: 'DELETE'
      })
      .then(res => {
        alert("Request is Cancelled");
        handleCongratulation("Your Request is Cancelled Successfully");
        setTimeout(() => {
          window.location.reload()
      }, 4000);
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      });

     

    }

    const handleChangePrice = async ()=>{

      try {

        let upReq ={
          id : props.val._id,
          BiddingPrice : chngBid,

        }

        const response = await fetch('http://localhost:8080/nuroms/request/put/price',{
          method:'PUT',
          body:JSON.stringify(upReq),
          headers: {
              'Content-Type':'application/json'
          }
          })
          handleCongratulation("The Request is Updated Successfully");
          setTimeout(() => {
            window.location.reload()
          }, 4000);
          const data = await response.json();
          console.log(data);  

        
      } catch (error) {
        
      }


    }

    
    const handleCongratulation = (string) => {
      toast.success(string, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    };

    const handleFailure = (string) => {
    toast.error(string, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    };


    const handleChng =(e)=>{
      setchngBid(e.target.value);
    }


    if(props.val.Status=="Active")
    return(
      <p className='Acceptence_Message'>Your Request Is being Accepted wait for Instructor to generate link</p>
    )
    else if(props.val.Status=="Closed"){
      return(
        <p className='Acceptence_Message'>Link = <a href="https://meet.google.com/dab-hcsp-pte">https://meet.google.com/dab-hcsp-pte</a></p>
      )
    }
    else
    return(
      <div style={{display : "flex", flexDirection : "row", width : "100%"}}>
      <button className='Enroll-button' onClick={handleCancel}>Cancel</button>
      <button className='Enroll-button' style={{marginLeft: "10px"}} onClick={handleOpenModal} >Edit</button>
      <Modal
              isOpen={isOpen}
              onRequestClose={handleCloseModal}
              contentLabel="Example Modal"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)'
                },
                content: {
                  backgroundColor: '#fff',
                  borderRadius: '10px',
                  padding:'0px',
                  width: '450px',
                  height: '270px',
                  margin: 'auto'
                }
              }}
            >

              <div className="Modal_Container">
                <div className='Modal_heading'></div>
                <div className="Modal_Content">
                <h2>Edting Request</h2>
                <p>Enter the Updated Bidding Price in the following box </p><br />
                <input type="text" placeholder='Enter' className='chnge-bid-box' onChange={handleChng} value={chngBid} />
                <br />
              
                </div>
                <div className="Modal_Button">
                  <button className='Modal_Yes' onClick={()=>{handleChangePrice()}}>Update</button>
                  <button className='Modal_No' onClick={handleCloseModal}>Close</button>
                </div>
                <style>
                {`
                    .Toastify__toast-container {
                        margin-top: 5px;
                        margin-right: 30px;
                    }
                `}
                </style>

                <ToastContainer />
              </div>
              
            </Modal>
      </div>
      

    )
  }



  function Request_Component_For_Owner(){
    

    function C1(){
      const handleEnrollNow =async()=>{

        if(UserProfile.Wallet>=props.val.BiddingPrice){

              try {
                let user = {
                    Email : UserProfile.Email,
                    Wallet : UserProfile.Wallet - props.val.BiddingPrice
                }

                const response9 = await fetch('http://localhost:8080/nuroms/user/update/wallet',{
                method:'PUT',
                body:JSON.stringify(user),
                headers: {
                    'Content-Type':'application/json'
                }
                })
                const data9 = await response9.json();
            } catch (error) {
                
            }



          let participation = {
            reqId : props.val._id,
            participantId  : UserProfile._id,
          }
            
          
          const response2 = await fetch(`http://localhost:8080/nuroms/participation/add`,{
          method:'POST',
          body:JSON.stringify(participation),
          headers: {
              'Content-Type':'application/json'
          }
          })
          const data2 = await response2.json();
  
          toast.success("You have Enrolled in Request", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
  
          window.location.reload();

        }else{
          <ToastContainer/>
          toast.failure("You Dont have Enough Money", {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

        }

      

      }

      
      if(parBit==0 && props.val.Status!="Closed")
      return(
        <>
         <button className='Enroll-button' onClick={handleEnrollNow}>Enroll Now</button>
         <ToastContainer/>
        </>
       
      )
      else if(props.val.Status!="Closed" && parBit==1)
      return(
        <p className='Acceptence_Message'>you have Enrolled wait for the link</p>
      )
      else
      return(
        <p className='Acceptence_Message'>The Link is <a style={{color: 'white', textDecoration:"underline"}} href='https://meet.google.com/dab-hcsp-pte'>The Link is https://meet.google.com/dab-hcsp-pte</a></p>
      )
    }


    if(props.bit==0)
    return(

      <div className="RequestContainer-2">
        <div className="Det">
          <div className="Buy">
          <h1>Rs. {props.val.BiddingPrice}/-</h1><p>Per Student</p>
          </div>
        </div>
        <C1/>
      </div>

    )
    else if(props.bit==1)
    return(
      <div className="RequestContainer-2">
      <div className="Det">
        <div className="Buy">
        <h1>Rs. {props.val.BiddingPrice}/-</h1><p>Per Student</p>
        </div>
      </div>
      < Accpetence_Check_Component/>
    </div>
    )

  }



  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/nuroms/user/get/id/${props.val.RequestOwner}`);
        const json = await response.json();
        setReqOwner(json);
        console.log(reqOwner);

        try{
          const ImgResponse = await fetch(`http://localhost:8080/nuroms/image/get/${json._id}`);
          const img = await ImgResponse.json();
          console.log("AYI HAI IMAGE = ",img);
          console.log();
          console.log();
          console.log();
          if(img.Image==null){}
          else
          setOwnerImage(img.Image);
        }
        catch(error){
          console.error(error);
        }
          

       

        try{
          const ParticipationResponse = await fetch(`http://localhost:8080/nuroms/participation/get/${props.val._id}`);
          const participants = await ParticipationResponse.json();
          console.log("PALO PALO = ",participants);
          const filteredData = participants.filter(item => item.participantId === UserProfile._id);
          if(filteredData.length>0)
          setparBit(1);
          else 
          setparBit(0);




          if(participants.length>=0)
          setP_Data(participants.length);
        }
        catch(error){
          console.error(error);
        }



      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:8080/nuroms/user/get/id/${props.val.Instructor}`);
        const json = await response.json();
        setInstructor(json);

        console.log("Ins",instructor);

        try{
          const ImgResponse = await fetch(`http://localhost:8080/nuroms/image/get/${json._id}`);
          const img = await ImgResponse.json();
          if(img.Image==null){}
          else
          setInsImage(img.Image);
        }
        catch(error){
          console.error(error);
        }

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();


  }, []);




  const SessionType =()=>{
    if(props.val.SessionType ==0)
    return(
    <>Coaching</>
    )
    else if(props.val.SessionType==1)
    return(
      <>Informative</>
    )
    else if(props.val.SessionType==2)
    return(
      <>Seminar</>
    )
  }


  return (

    <div className='CoachingServiceContainer'>    
      <div className="Coaching-Request-Container">
        <div className='RequestContainer'>
          <div className='ImageCover'>
          </div>
          <div className='RequestDetails'>
            <h2>{firstHalf}</h2>
            <h2>{secondHalf}</h2>
            <p className='course-info'>{props.val.Course}</p>
            <p className='bid-overview'>{props.val.Brief}</p>
            </div>
          <div className='Separator'>
            <div className="Sp-line">
            </div>
          </div>


          <div className="Other-Details">

            <div className="Owner-Details">
              <PictureFrame  backgroundColor={`#FBAB7E`} backgroundImage={`linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)`} image={ownerImage}/>
              <div className='User-Poster-Details'>
                <h6>{reqOwner.Name}</h6>
                <p>{reqOwner.Email}</p>
              </div>
            </div>


            <div className="Request-Attributes">
              <div className="inner-div-1">  
                <p className='Big-Num'>{props.val.Duration}</p>
                <p className='little-text'>duration</p>
              </div>
              <div className="inner-div-2">
                <div className="child-div">
                  <h2> {DateCreated_}</h2>
                  <p>   Request Date </p>
                </div>
               <div className="Sp"> </div>
                <div className="child-div">
                  <h2>  {Closingdate} </h2>
                  <p> Closing Date </p>
                </div>
              </div>
            </div>


            <div className="Request-Attributes">
              <div className="inner-div-2">
                <div className="child-div">
                  <h2><SessionType/></h2>
                  <p>Session Type  </p>
                </div>
                <div className="Sp"> </div>
                <div className="child-div">
                  <h2> {props.val.Status} </h2>
                  <p> Status </p>
                </div>
              </div>
              <div className="inner-div-1">
                <p className='Big-Num'>{ParticipantData}</p>
                <p className='little-text'>Students</p>
              </div>
            </div>

            


          </div>
          <div className='Separator'>
            <div className="Sp-line">
            </div>
          </div>


          <div className='Instructor-Details'>
          <PictureFrame width={`100px`} padding1={`4px`} padding2={`4px`} backgroundColor={`#FBAB7E`} backgroundImage={`linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)`} image={insImage} />
          <h1>{instructor.Name}</h1>
          <h2>Instructor (FAST LHR)</h2>
          <p>{instructor.Email}</p>
          </div>



          <div className='Separator'>
            <div className="Sp-line">
            </div>
          </div>
          <Request_Component_For_Owner/>
        </div>
      </div>
    </div>
  )
}

export default CoachingRequest
