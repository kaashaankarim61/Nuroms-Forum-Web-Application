import React from 'react'
import '../LoginPage.css'
import '../../GlobalStyles/Loader.css'
import '../TextBox.css'
import logo from '../../../resources/Nuroms_Logo.png'
import { useState } from 'react'
import { setFormType } from '../../../store/slices/formTypeSlice';
import { useDispatch, useSelector } from 'react-redux'
import { setNavigation } from '../../../store/slices/navigationSlice'
import { setUser } from '../../../store/slices/userSlice'
import { setIsLogin } from '../../../store/slices/loginSlice'


const LoginCredentials = (props)=>{


    const [Error , setError]  =useState('');
    const[Email,SetEmail]  =useState('');
    const [Password,setPassword]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    const dispatch =useDispatch();

    const SettingPassword=(e)=>{ setPassword(e.target.value);}
    const SettingEmail=(e)=>{ SetEmail(e.target.value);}
 

    const LoginButton = async (e)=>{

        setIsLoading(true);
        let Cred = {
            Email:Email,
            Password:Password
        }


        try{
            const response = await fetch(`http://localhost:8080/nuroms/user/get`,{
            method:'POST',
            body:JSON.stringify(Cred),
            headers: {
                'Content-Type':'application/json'
            }
            })
            const data = await response.json();


            if(data.Email==Email)
            {
                console.log(data);  
                dispatch(setIsLogin(1));
                dispatch(setIsLogin(1));
                dispatch(setNavigation(1));
                dispatch(setUser(data)); 
                setIsLoading(false);
            }
            else
            {
                setError(data.Error);
                setIsLoading(false);
            }
        } catch (error) {
            setError("error");
            setIsLoading(false);
        }

    }

    function Initializer(){
        if (isLoading) {
          return <div className='Loader'></div>;
        }else{
            return <div className='Loader-In-Active'></div>;
        }
      }


    return(
        <div className="LoginCrendentialArea hs">
           
            <div className="LogoImage LogoAtEnd">
                <img style={{ width: 160, height:70 }} src={logo} alt="" />
            </div>

            <div className='Login-Form-Container'>
                <div className='Login-Form' >
                    <div className='col'>
                        <input  className='textbox' value={Email} placeholder='Username' onChange={SettingEmail} name='Email' type="text" /><span className="focus-border"></span>
                    </div>
                    <div className='col'>
                        <input value={Password} className='textbox tp-mar-7' placeholder='Password' onChange={SettingPassword} name='Password' type="password" /><span className="focus-border"></span>
                    </div>
                    <div className="Login-Buttons">
                    <button className="button-65 tp-mar-20" onClick={()=>{LoginButton()}} >Login</button>
                    </div>

                    <p className='LocalError'>{Error}</p>
                    
                </div>
            </div>

            <div className="Register-Info">
            <Initializer/>
            <div className='ContentBox'>
                <p className='Register-Text'>Don't have an account yet?  </p>
                <a className='Register-Link' onClick={()=>{dispatch(setFormType(1))}}>&nbsp;Register Here</a>
            </div>  
            </div>
        </div>
    )
}


export default LoginCredentials