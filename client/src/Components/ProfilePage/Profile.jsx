import React, { useEffect, useState } from 'react'
import './Profile.css'
import {AiOutlinePlus} from 'react-icons/ai'
import {FaPencilAlt} from 'react-icons/fa'
import {MdOutlineDoneOutline} from 'react-icons/md'
import { useSelector } from 'react-redux';
import image1 from '../../resources/man.PNG'
import { upload } from '@testing-library/user-event/dist/upload';
import { ToastContainer, toast } from 'react-toastify';
import {GrMoney} from 'react-icons/gr'
import {loadStripe} from '@stripe/stripe-js';
import {FaWallet} from 'react-icons/fa'

function Profile() {  
  

let stripePromise; 

const getStripe =()=>{
if(!stripePromise)
stripePromise = loadStripe("pk_test_51M6X0VAupznwwlIIlOLP7C9dlhaGgWCP9FSCus1sbTbKNNbYZZcJZ1bdTJ8rzWp5ELwbUzZWKcXZep4j2X2kn3HI00lB6W6gJi");

return stripePromise;
}
  

   const item ={
    price : "price_1N4OzrAupznwwlIIya5UhsMw",
    quantity : 1
   } 


   const checkoutOptions = {
    lineItems  : [item],
    mode : "payment",
    successUrl : `${window.location.origin}/`,
    cancelUrl : `${window.location.origin}/`,

  };
  

  const redirectToCheckout = async () => {
    console.log("redirectToCheckout");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
  };


  const [image, setImage] = useState(image1);
  const UserProfile = useSelector((state)=>{ return state.user.data })
  const [bioText, setBioText] = useState("Hi Honey");

  const [bio, setBio] = useState({});



  const fullName = UserProfile.Name;
  const namesArray = fullName.split(' ');
  const firstName = namesArray[0];
  const lastName = namesArray[namesArray.length - 1];

  const [EditButton, setEditButton] =useState(0)
  const [DegreeEdit, setDegreeEdit] = useState("null");
  const [SemesterEdit, setSemesterEdit] = useState("null");
  const [TypeEdit, setTypeEdit] = useState("null");
  const [campus, setCampus] = useState("null");
  const [SubmitBtn, setSubmitButton] =useState(0);

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






  const Bio_Component =(props2)=>{

    const [eVal, setEval ] =useState(props2.value);

    const handleBioChange=(e)=>{
    setEval(e.target.value);
    }

    const go=()=>{
      props2.func(eVal);
    }

    if(EditButton)
    return(
      <div className='Wrapper'>
       <textarea name="" onChange={handleBioChange} value={eVal} className='Bio_Area' id="" cols="30" rows="10"></textarea>
       <button className="text-input-button" onClick={()=>{go()}}><MdOutlineDoneOutline size={15} /></button>
      </div>
        
    )
    else
    return(
      <h6>{eVal}</h6>
    )
  }


  const Att_Comp =(props)=>{
    const [eVal, setEVal]= useState(props.value);

    const go=()=>{
      props.func(eVal);
      console.log("Had Hai = ",eVal);
    }

    const change=(e)=>{
    setEVal(e.target.value);
    }

    if(EditButton)
    return(
      <div className='Wrapper'>
        <input value={eVal} onChange={change} className='EditText_mini' type="text" /> 
        <button className="text-input-button" onClick={()=>{go()}}><MdOutlineDoneOutline size={15} /></button>
      </div>
        
    )
    else
    return(
      <h1>{props.value}</h1>
    )
  }

  const EditClick =()=>{
    if(!EditButton) setEditButton(1); else setEditButton(0);
  }


  useEffect(() => {
    const fetchData2 = async () => {
      const response2 = await fetch(`http://localhost:8080/nuroms/bio/get/${UserProfile._id}`);
      const data2 = await response2.json();
      setBio(data2);
      setDegreeEdit(data2.Degree);
      setTypeEdit(data2.TypeEdit);
      setCampus(data2.Campus);
      setBioText(data2.BioText);
      setTypeEdit(UserProfile.UserType);
      setSemesterEdit(data2.Semester);
    };
    fetchData2();

  }, []);




  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/nuroms/image/get/${UserProfile._id}`);
      const data = await response.json();
      if(data.Image==null)
      setImage(image1);
      else
      setImage(data.Image);
    };
    fetchData();

  }, []);



  const handleImageChange = e => {

    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend =()=>{
      console.log("Hello",reader.result);
      setImage(reader.result);
     
    };
    reader.onerror = error =>{
      console.log("Error" ,error);
    }; 

  }

  const changeIt0 =(val)=>{
    setBioText(val);
  }

  const changeIt1 =(val)=>{
    setDegreeEdit(val);
  }
  const changeIt2 =(val)=>{
    setSemesterEdit(val);
  }
  const changeIt3 =(val)=>{
    setTypeEdit(val);
  }
  const changeIt4 =(val)=>{
    setCampus(val);
  }

 const uploadButton = async ()=> {

   if(SubmitBtn) setSubmitButton(0); else {setSubmitButton(1); setEditButton(0)};
   console.log("Anique", image);
    let imgDoc = {
      base64:image,
      imgHolder:UserProfile._id,
    }

    console.log("UFF ALAH")
    console.log(imgDoc);
   
    try{
      const response = await fetch('http://localhost:8080/nuroms/image/put',{
          method:'PUT',
          body:JSON.stringify(imgDoc),
          headers: {
              'Content-Type':'application/json'
          }
          })

      const data = await response.json();
      console.log(data);
      
        // window.location.reload();
    }catch(error)
    {
        alert(error);
    }







    let BioDoc = {

      BioText : bioText,
      Campus  : campus,
      Semester : SemesterEdit,
      UserId :  UserProfile._id,
      Degree :  DegreeEdit,
      UserType : TypeEdit,

      
    }

    try{
      const response2 = await fetch('http://localhost:8080/nuroms/bio/put',{
          method:'PUT',
          body:JSON.stringify(BioDoc),
          headers: {
              'Content-Type':'application/json'
          }
          })

      const data2 = await response2.json();
      console.log(data2);
      handleCongratulation("Profile Updated Successfully")
    }
    catch(error)
    {
        alert(error);
    }
  }


  return (
    <div className='ProfilePage'>
        <div className="ProfileOutlook">
          <div className='ProfileOverview'>
            <div className="TextualInformation">
              <div className="ProName">
                <h1>{firstName}</h1><br />
                <h1>{lastName}</h1>
              </div>
              <div className="ProEmail">
                <h4>{UserProfile.Email}</h4>
              </div>
              <div className="ProBio">
                <Bio_Component value={bioText} func={changeIt0}/>
              </div>

              <div className='DivCols'>
                <div className='Semester'>
                  <Att_Comp value={DegreeEdit} func={changeIt1}/>
                  <p>Degree</p>
                </div>
                <div className='Semester'>
                <Att_Comp value={SemesterEdit} func={changeIt2}/>
                  <p>Semester</p>

                </div>
                <div className='Semester'>
                <Att_Comp value={TypeEdit} func={changeIt3}/>
                  <p>Type</p>
                </div>
                <div className='Semester'>                 
                <Att_Comp value={campus} func={changeIt4}/>
                  <p>Campus</p>
                </div>
               
              </div>
             
            </div>
            <div className="ImageContainer">
              <div className='ImageCircle-Outer'>
                <div className='ImageCircle-Inner'>
                  <div className='round-image'>
                    <img src={image}  alt="" />
                  </div>
                </div>
              </div>
              <input type="file" id="input" onChange={handleImageChange} />
              <label htmlFor="input" className='Add-Button'>
                <div className='-Btn'>
                  <AiOutlinePlus size={20} />
                </div>
              </label>
            </div>
            <div className='edit-button'>
          <button className='Pencil-button' onClick={()=>{EditClick()}}><FaPencilAlt size={25} /></button>
           </div>

           <div className='done-button'>
          <button className='Pencil-button' onClick={()=>{uploadButton()}} ><MdOutlineDoneOutline size={25} /></button>
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
           
          </div>
        


        </div>

                
      
        <div className="Wallet">
          <div className='Wallet-cont'>
            <div className='wallet-heading'>
              <FaWallet size={30}  style={{color : 'brown'}}/>
              <h3>&nbsp;&nbsp;Wallet</h3>
            </div>
            <div className="sepe"></div>
            <div className='Money'>
               
                <h2>&nbsp;Rs {UserProfile.Wallet}.00 </h2>
                <button className='Buy-Button' onClick={redirectToCheckout} >
                  +
                </button>
            </div>
            {/* <div className="sepe"></div> */}
            <p className='info-p'>You Need to Buy Nuroms Ruppes to Enroll in Coaching Sessions & Send Coaching Requests</p>
          </div>
        </div>
      
    </div>
  )
}


export default Profile