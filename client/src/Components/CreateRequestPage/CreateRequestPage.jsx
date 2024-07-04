import React, { useEffect, useState } from 'react'
import './CreateRequestpage.css'
import { ToastContainer, toast } from 'react-toastify';
import '../../Components/LoginPage/TextBox.css'
import PictureFrame from '../../PictureRoundFrame/PictureFrame'
import { useDispatch, useSelector } from 'react-redux'
import image1 from '../../resources/man.jpg'

import { setUser } from '../../store/slices/userSlice'

function TeacherComponent(props){
   

  
    const [image,setImage] =useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:8080/nuroms/image/get/${props.val._id}`);
          const data = await response.json();
          if(data.Image==null)
          setImage(image1);
          else
          setImage(data.Image);
        };
        fetchData();
    
      }, []);


    return(
        <div className='T_Item' onClick={()=>{props.func(props.val.Name, props.val.Email,props.val._id, image)}}>
            <div className='Teacher-Component'>
                <PictureFrame width={`50px`} padding1={`2px`} padding2={`2px`} backgroundColor={`#FBAB7E`} backgroundImage={`linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)`} image={image} />
                <div className="Teacher-Name-Email">
                    <h1>{props.val.Name}</h1>
                    <p>{props.val.Email}</p>
                </div>
            </div>     
            <div className="Teacher-Name-Email">
                    <h1>Type</h1>
                    <p>{props.val.UserType}</p>
            </div>     
        </div>
    )
}


function CreateRequestPage() {
    const dispatch =useDispatch();

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
    


    const UserProfile = useSelector((state)=>{ return state.user.data })
    const [duration, setDuration] = useState("");
    const [topic, setTopic] =useState("");
    const [brief,setBrief] = useState("")
    const [course,setCourse]=useState("");
    const [date, setDate]=useState(0);
    const [closingDate, setClosingDate]=useState(0);
    const [Visibility, setVisibility]=useState(0);
    const [sessionType, setSessionType]=useState(0);
    const [biddingPrice, setBiddingPrice]=useState(500);
    const [requestOwner, setRequetOwner]=useState(UserProfile._id);
    const [Instructor, setInstructor]=useState("All");
    const [status,setStatus] =useState("InActive");


    const [InsName, setInsName] =useState("Instructor");
    const [InsEmail, setInsEmail] =useState("Select Instructor");
    const [InsImage, setInsImage] =useState(image1);


    const [InstructorArray, setInstructorArray] =useState([]);

    const [active1, setActive1]  =useState(0);
    const [active2, setActive2]  =useState(0);
    const [active3, setActive3]  =useState(0);
    const [active4, setActive4]  =useState(0);
    const [active5, setActive5]  =useState(0);

    const HandleVisibility1 = () =>{
        if(active1==0){
        setActive1(1);//private
        setVisibility(1);
        setActive2(0);}  
      
    }

    const setInstructorNameAndEmail = (insName, insEmail ,insId ,ins_image) => {
        setInsName(insName);
        setInsEmail(insEmail);
        setInsImage(ins_image);
        setInstructor(insId);
    }

    const HandleVisibility2 = () =>{
    
        if(active2==0){
        setActive1(0);
        setVisibility(0);//public
        setActive2(1);}  
    }


    const HandleVisibility3 = () =>{
    
        if(active3==0){
        setActive3(1);
        setSessionType(0);
        setActive4(0);
        setActive5(0);
        }  
    }

    const HandleVisibility4 = () =>{
    
        if(active4==0){
            setActive3(0);
            setSessionType(1);
            setActive4(1);
            setActive5(0);
            }  
    }

    const HandleVisibility5 = () =>{

        if(active5==0){
            setActive3(0);
            setSessionType(2);
            setActive4(0);
            setActive5(1);
            }  
        }


    const handleTopic =(e)=>{
        setTopic(e.target.value);
    }

    const HandleCourse =(e)=>{
        setCourse(e.target.value);
    }

    const HandleDuration =(e)=>{
        setDuration(e.target.value);
    }

    const HandleClosingDate =(e)=>{
        setClosingDate(e.target.value);
    }

    const HandleBrief =(e)=>{
        setBrief(e.target.value);
    }

    const HandleBiddingPrice =(e)=>{
        setBiddingPrice(e.target.value);
    }


    const Validate = (req) =>{

    }



    useEffect(() => {
        fetch('http://localhost:8080/nuroms/user/instructors')
          .then(response => response.json())
          .then((data) => {setInstructorArray(data);
        
            console.log("Pichli",data);
            const filteredArray = data.filter(item => item._id !== UserProfile._id);
            setInstructorArray(filteredArray);
            console.log("Agli",filteredArray);
          })
          .catch(error => console.error(error));




      }, []);



    const OnSubmit =async()=>{


        if(biddingPrice<=UserProfile.Wallet && topic!=''){

            try {
                let user = {
                    Email : UserProfile.Email,
                    Wallet : UserProfile.Wallet - biddingPrice
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


            console.log(closingDate);
            const date = new Date(closingDate);
            date.setHours(23, 59, 0); // Set time to 11:59 PM
            const isoClosing = date.toISOString(); // Convert to ISO datetime string in UTC time zone
            const currentDate = new Date();
            const isoCurrent = currentDate.toISOString();
    
            let Request = {
                Topic : topic,
                Course : course,
                Brief : brief,
                Duration : duration,
                DateCreated : isoCurrent,
                ClosingDate : isoClosing,
                Visibility : Visibility,
                SessionType  : sessionType,
                BiddingPrice : biddingPrice,
                RequestOwner  : requestOwner,
                Instructor: Instructor,
                Status : status
            }
    
            console.log("Request",Request);
    
    
            try{
    
                console.log("Sending");
                const response = await fetch('http://localhost:8080/nuroms/request/add',{
                method:'POST',
                body:JSON.stringify(Request),
                headers: {
                    'Content-Type':'application/json'
                }
                })
                const data = await response.json();

                try{
                    let participation ={
                      reqId : data._id,
                      participantId : UserProfile._id
                   
                    }
                    const response2 = await fetch('http://localhost:8080/nuroms/participation/add',{
                      method:'POST',
                      body:JSON.stringify(participation),
                      headers: {
                          'Content-Type':'application/json'
                      }
                      })
                      const data2 = await response2.json();
                      console.log(data2);  
                    }catch(error){
                      alert(error);
                    }




                if(data.Error!=null){
                    handleFailure(data.Error);
                   
                }
                else
                handleCongratulation("Your Request Is Uploaded")
                setTimeout(() => {
                    window.location.reload()
                }, 5000);
              
                console.log(data);
    
    
            }
            catch(err){
                handleFailure(err)
    
            }



        }else{
            handleFailure("Your Request cannot be sent.\n\n You dont have enough money in your wallet or invalid topic\n")


        }
    
       
       
      

    }




    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
      if(!isChecked)
      {
        setInsName("All");
        setInsEmail("Request to All ") 
        setInstructor("All");
      }
    }






  return (
    <div className='CreateRequestPage'>
        <div className='RequestSection'>
            <div className="IntroSection">
                <div className="Brief-Div">
                    <div className="Heading">
                        {/* <div className='hexagon'>
                        </div> */}
                    </div>
                    <div className="InfoBox" style={{marginTop:"30px"}}>
                        <div className="CourseCol">
                            <div className='col'>
                            <input  className='textbox' value={topic}  onChange={handleTopic} style={{fontWeight:"400",fontSize:"15px", background: "transparent"}} placeholder='Topic'  type="text" /><span className="focus-border"></span>
                            </div>           
                        </div>
                    </div>
                    <div className="InfoBox" style={{marginTop:"20px"}}>
                        <div className="CourseCol">
                            <div className='col'>
                            <input  className='textbox' value={course} onChange={HandleCourse} style={{fontWeight:"400",fontSize:"15px", background: "transparent"}} placeholder='Course/Field' type="text" /><span className="focus-border"></span>
                            </div>           
                        </div>
                    </div>
                    <div className="InfoBox-Brief">
                        <textarea name="" className='Brief-Area' value={brief} onChange={HandleBrief} placeholder='Breif' id="" cols="30" rows="10"></textarea>       
                    </div>
                    
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
            <div className="PriceSection">
                <div className="PriceBox">
                    <div className="Pricing-Div">
                        <div className="Heading">
                        {/* <div className='hexagon'> </div> */}
                        </div>
                        <div className='Instructor-Selected'>
                        <PictureFrame width={`60px`} padding1={`4px`} padding2={`2px`} backgroundColor={`#FBAB7E`} backgroundImage={`linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)`} image={InsImage}  />
                        <div className="Instructor-Name-Email">
                            <h1>{InsName}</h1>
                            <p>{InsEmail}</p>
                        </div>
                        <div className='Resetting'>
                            <p>All</p>
                            <input type="checkbox" onChange={handleCheckboxChange} />
                        </div>
                        </div>
                        <div className="PriceSelection">
                            <div className="Price-Statement">
                                <h1>Set</h1>
                                <h1>Bidding</h1>
                                <h1>Price</h1>
                            </div>
                            <input className='Price-Input' type="number" value={biddingPrice} onChange={HandleBiddingPrice} />
                            <h1>/-</h1>
                        </div>
                        <div className="Submission-button">
                            <button className='BTN-SUBMIT' onClick={()=>{OnSubmit()}}>Submit</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="AttributeSection">
                <div className="Attribute-Setting">

                    <div className="Att-Heading">
                       {/* <div className='hexagon'>
                        </div> */}
                    </div>

                    <div className="Section-Row">
                    <div className="Inner-Section">

                        <h1>Duration</h1>
                        <p>*Set expected duration of the requested session</p>
                        <input className='Duration-Box' type="number" value={duration} onChange={HandleDuration} />

                    </div>
                    <div className="Inner-Section">
                        <h1>Closing Date</h1>
                        <p>*Set Closing date for the requested session</p>
                        <input className='Date-Box' value={closingDate} onChange={HandleClosingDate} type="date" />

                    </div>
                    <div className="Inner-Section">
                    <h1>Visibility</h1>
                        <p>*Specify whether your request will be visible to public or not</p>
                        <button className={!active1 ? 'Selection-button' : 'Selection-button-active'} onClick={()=>{HandleVisibility1()}} >Private</button>
                        <button className={!active2 ? 'Selection-button' : 'Selection-button-active'} onClick={()=>{HandleVisibility2()}} >Public</button>

                    </div>
                    <div className="Inner-Section">
                    <h1>Session Type</h1>
                        <p>*Set the Session Type</p>
                        <button className={!active3 ? 'Selection-button-2' : 'Selection-button-2-active'} onClick={()=>{HandleVisibility3()}}> Coaching </button>
                        <button className={!active4 ? 'Selection-button-2' : 'Selection-button-2-active'} onClick={()=>{HandleVisibility4()}}> Informative </button>
                        <button className={!active5 ? 'Selection-button-2' : 'Selection-button-2-active'} onClick={()=>{HandleVisibility5()}}> Seminar  </button>

                    </div>
                    </div>
                    

                </div>

            </div>
        </div>

        <div className="TeacherSection">
            <div className='TeacherContainer'>
                <div className="TeacherBox">
                    <div className="Heading"></div>
                    {/* <div className='Tabs'>
                        <button className='tab-button'>Online</button>
                        <div className='btn-Sp'></div>
                        <button className='tab-button' >All</button>

                    </div> */}
                    <div className="TeacherItems">

                    {InstructorArray.map(val=>{
                    return(
                        <TeacherComponent key={val._id} val={val} func={setInstructorNameAndEmail} /> 
                    )
                    })}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CreateRequestPage




