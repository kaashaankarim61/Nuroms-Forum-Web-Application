import React, { useEffect, useRef } from 'react'
import '../LoginPage.css'
import '../TextBox.css'
import logo from '../../../resources/Nuroms_Logo.png'
import { useState } from 'react'
import { EmailCheck, RollExtract, PhoneCheck, PasswordCheck, DegreeCheck } from '../ValidityCheck'
import { setFormType } from '../../../store/slices/formTypeSlice';
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {image} from '../../../resources/man.jpg';
import Modal from 'react-modal';



function RegisterForm(props) {

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
    

    const dispatch =useDispatch();

    //userDetails
    const [isOpen, setIsOpen] = useState(false);
    const [activeCheckbox, setActiveCheckbox] = useState(null);
    const[Name,setName]=useState('');
    const[Email,SetEmail]  =useState('');
    const [RollNo,setRollNo]=useState('');
    const[Password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const[Phone,setPhone]=useState('');
    const[Degree,setDegree]=useState('');
    const[UserType,setUserType]=useState(activeCheckbox);
    const[Status,setStatus]=useState('under_verfication');
    const[AccountType,setAccountType]=useState('user');
    const[OTP_, setOTP] =useState(Math.floor(Math.random() * 9000) + 1000);

    const[Error, setError] = useState("")   
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [input4, setInput4] = useState('');
    const secondInput = useRef(null);
    const thirdInput = useRef(null);
    const fourthInput = useRef(null);
  
    function handleInputChange(e, inputNumber) {
      const value = e.target.value;
      switch (inputNumber) {
        case 1:
          setInput1(value);
          if (value.length === 1) {
            secondInput.current.focus();
          }
          break;
        case 2:
          setInput2(value);
          if (value.length === 1) {
            thirdInput.current.focus();
          }
          break;
        case 3:
          setInput3(value);
          if (value.length === 1) {
            fourthInput.current.focus();
          }
          break;
        case 4:
          setInput4(value);
          break;
        default:
          break;
      }
    }
  
    function concatenate() {
      const result = `${input1}${input2}${input3}${input4}`;
      console.log(result); // or do something else with the result
    }



    const SettingConfirmPassword=(e)=>{ setConfirmPassword(e.target.value);}
    const SettingPassword=(e)=>{ setPassword(e.target.value);}
    const SettingPhone=(e)=>{ setPhone(e.target.value);}
    const SettingEmail=(e)=>{ SetEmail(e.target.value);}
    const SettingName=(e)=>{ setName(e.target.value);}
    const SettingDegree=(e)=>{ setDegree(e.target.value);}


     


   const  Validate = async ()=>{
        if(Email === '' || Degree === '' || Password === '' || Phone === '')
        {
            console.log("Error");
            setError("Error : All Entries are Required")    

        }
        else{
            if(EmailCheck(Email)===0){
                setError("Invalid Email Format");
            }
          
            else {
                if(PhoneCheck(Phone)===0)
                setError("Invalid Phone Format");
                else{
                    if(DegreeCheck(Degree)===0)
                    setError("Invalid Degree");
                    else {
                        if(Password!==confirmPassword){
                            setError("Password Does Not Match");
                        }else{  

                          if(Password.length<=5)
                          setError("Password lenght must be greater than 5")
                          else
                          return 1;
                        }
                    }

                }

            }
            
        }

        return 0;

    }

    const openModalAfterValidate = async()=>{
      const done = await Validate();
    // if(done){ handleOpenModal() }
    }

    const handleOpenModal = async() => {
      handleRegisterSubmit();
      setIsOpen(true);

    };

    const handleCloseModal = () => {
      setIsOpen(false);
    };


    const handleCheckboxChange = (e) => {
      const checkboxName = e.target.name;

      if (checkboxName === activeCheckbox) {
        // The active checkbox was clicked again, so deactivate it
        setActiveCheckbox(null);
      } else {
        // Another checkbox was clicked, so activate it and deactivate the previous one
        setUserType(checkboxName);
        setActiveCheckbox(checkboxName);
      }

      console.log(checkboxName);
    };



    const verifyOTP = async (e) =>{
        let User  = {
            Email : Email,
            otp:OTP_,
        }
        console.log(User);
        console.log("Sending");
        const response = await fetch(`http://localhost:8080/nuroms/user/update/status`,{
        method:'PUT',
        body:JSON.stringify(User),
        headers: {
            'Content-Type':'application/json'
        }
        })
        const data = await response.json();
        handleCongratulation("Your Account is Successfully Verified");
        setTimeout(() => {
            dispatch(setFormType(0));
          }, 4000);

    }

    

    const handleRegisterSubmit = async (e)=>{

        const done = await Validate();
        if(done){
            let User  = {
                Name:Name,
                Email:Email,
                RollNo:RollExtract(Email),
                Degree:Degree,
                Status:Status,
                Phone:Phone,
                Password:Password,
                AccountType:AccountType,
                UserType:UserType,
                OTP:OTP_,
            }
            console.log(User);

            console.log("Sending");
            const response = await fetch('http://localhost:8080/nuroms/user/add',{
            method:'POST',
            body:JSON.stringify(User),
            headers: {
                'Content-Type':'application/json'
            }
            })
            const data = await response.json();


            if(response.status==201)
            {
              setError("");
              handleCongratulation("Your Account is Registered");
             
            }
            else
            {
                console.log("Account Already Exist or Network Error ");
                setError("Account Already Exist or Network Error");
            }



            let imgDoc = {
                base64:null,
                imgHolder:data._id,
              }
             
            try{
              const response2 = await fetch('http://localhost:8080/nuroms/image/add',{
                  method:'POST',
                  body:JSON.stringify(imgDoc),
                  headers: {
                      'Content-Type':'application/json'
                  }
                  })
      
              const data2 = await response2.json();
              console.log(data2);
                  
                  // window.location.reload();
              }catch(error)
              {
                  alert(error);
              }


              let bio = {
                BioText  : "No Bio Added",
                Campus : null,
                UserId: data._id,
                Semester : null, 
                Years : null,
                Degree :  Degree,
                UserType :  data.UserType
              }




              try{
                const response3 = await fetch('http://localhost:8080/nuroms/bio/add',{
                    method:'POST',
                    body:JSON.stringify(bio),
                    headers: {
                        'Content-Type':'application/json'
                    }
                    })
        
                const data3 = await response3.json();
                console.log(data3);
                    
                    // window.location.reload();
                }catch(error)
                {
                    alert(error);
                }    



                let notification ={
                  recieverId : data._id,
                  senderId :  "64551cc5021b515552f98085",
                  meetingLink :null,
                  coachingTopic : null,
                  text : `Welcome to Nuroms ! We are glad to have you on our platform`
                 }
            
                  const response4 = await fetch('http://localhost:8080/nuroms/notification/add',{
                  method:'POST',
                  body:JSON.stringify(notification),
                  headers: {
                      'Content-Type':'application/json'
                  }
                  })
                  const data4 = await response4.json();      
           
        }


    }
  
  return (
    <div className="RegisterFormArea hs" >
            
            <div className="LogoImage LogoAtStart">
                <img style={{ width: 160, height:70 }} src={logo} alt="" />
            </div>

            <div className='Register-Form-Container'>
                <div className='Register-Form'>
                    <div className='col'>
                        <input  type="text" value={Name} onChange={SettingName}  className='textbox' placeholder='Name' name='Name' /><span className="focus-border"></span>
                    </div>
             
                    <div className='col'>
                        <input  onChange={SettingEmail}  value={Email} className='textbox tp-mar-7' placeholder='Email' name='Email' type="text" /><span className="focus-border"></span>
                    </div>

                    <div className='col'>
                        <input  onChange={SettingDegree} value={Degree}  className='textbox tp-mar-7' placeholder='Degree' name='Degree' type="text"  /><span className="focus-border"></span>
                    </div>

                    <div className='col'>
                        <input onChange={SettingPhone} value={Phone}  className='textbox tp-mar-7' placeholder='Phone' name='Phone' type="text"  /><span className="focus-border"></span>
                    </div>

                    <div className='col'>
                        <input onChange={SettingPassword} value={Password}  className='textbox tp-mar-7' placeholder='Password' name='Password' type="password"  /><span className="focus-border"></span>
                    </div>

                    <div className='col'>
                        <input  className='textbox tp-mar-7' placeholder='Confirm Password' onChange={SettingConfirmPassword} value={confirmPassword}  type="password" /><span className="focus-border"></span>
                    </div>

                    <div className='col' style={{ marginTop: 12}}>
                        <div className='CheckBoxes'>
                            <label className='Label1'>
                                <input
                               
                                type="checkbox"
                                name="Student"
                                checked={activeCheckbox === 'Student'}
                                onChange={handleCheckboxChange}
                                />
                                &nbsp;&nbsp;Student
                            </label>
                            <label className='Label1'>
                                <input
                                type="checkbox"
                                name="Instructor"
                                checked={activeCheckbox === 'Instructor'}
                                onChange={handleCheckboxChange}
                                />
                                &nbsp;&nbsp;Instructor
                            </label>
                        </div>
                    </div>

                   
                    <div className="Login-Buttons">
                    <button className="button-65 tp-mar-20" onClick={()=>{openModalAfterValidate()}} >Register</button>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={handleCloseModal}
                        contentLabel="Report Modal"
                        style={{
                            overlay: {
                            backgroundColor: 'rgba(0, 0, 0, 0.5)'
                            },
                            content: {
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            padding:'0px',
                            width: '450px',
                            height: '290px',
                            margin: 'auto'
                            }
                        }}
                        >

                        <div className="Modal_Container">
                        <div className='Modal_heading'></div>
                        <div className="Modal_Content" style={{width:'400px', padding: '20px'}}>
                        <h2>OTP Verification</h2>
                        <p style={{alignSelf:'center' , fontWeight: '500' , marginBottom:'15px'}}>Verify the OTP sent your Account .</p>
                        <form className='Modal_Form'>
                            <div className='OTP_div'> 
                            <input type="text" className='OTP_box' value={input1} maxLength="1" onChange={(e) => handleInputChange(e, 1)} />
                            <input type="text" className='OTP_box' value={input2} maxLength="1" onChange={(e) => handleInputChange(e, 2)} ref={secondInput} />
                            <input type="text" className='OTP_box' value={input3} maxLength="1" onChange={(e) => handleInputChange(e, 3)} ref={thirdInput} />
                            <input type="text" className='OTP_box' value={input4} maxLength="1" onChange={(e) => handleInputChange(e, 4)} ref={fourthInput} onBlur={concatenate} />
                                    
                            </div>
                        </form>
                        
                        </div>
                        <div className="Modal_Button">
                            <button className='Modal_Yes' onClick={()=>{verifyOTP()}}>Verify OTP</button>
                            <button className='Modal_No' onClick={handleCloseModal}>Cancel</button>
                        </div>
                        <style>
                                {`
                                .Toastify__toast-container {
                                    margin-top: 20px;
                                    margin-right: 50px;
                                }
                                `}
                            </style>

                        <ToastContainer />
                        </div>
                        
                    </Modal>
                   
                    </div> 

                    <p className='LocalError'>{Error}</p>
                    <ToastContainer />

                


                </div>
            </div>
            <div className="Login-Info">
            <p className='Login-Text'>Already have an account? </p>
            <a className='Login-Link'  onClick={()=>{dispatch(setFormType(0))}}  >&nbsp;Login Here</a>
            </div>

        
        </div>
  )
}

export default RegisterForm

