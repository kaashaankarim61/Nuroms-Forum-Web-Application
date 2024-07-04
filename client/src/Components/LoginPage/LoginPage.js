import React from 'react'
import './LoginPage.css'
import './TextBox.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNavigation } from  '../../store/slices/navigationSlice'
import { setFormType } from '../../store/slices/formTypeSlice';
import RegisterForm from './RegisterForm/RegisterForm'
import LoginCredentials from './LoginCredentials/LoginCredentials';

function LoginPage() {


    const dispatch =useDispatch();
    const FORM_TYPE = useSelector((state)=>{ return state.formtype.data })
    const NAV = useSelector((state)=>{ return state.navigation.data })
 

 
 

    // const changeNavigation = ()=>{

    //     dispatch(setNavigation(1));
    // }



    const changeFormType = ()=>{

        console.log('FormType = ',FORM_TYPE);
        if(FORM_TYPE==0)
        dispatch(setFormType(1));
        else 
        dispatch(setFormType(0));
    }





    const CredentialSection =()=>{

        if(FORM_TYPE==0){
            return(
                <LoginCredentials ChangeForm = {changeFormType}/>)

        }else{
            return(
                <RegisterForm   ChangeForm = {changeFormType} />
            )
        }

    }


  return (
   
    <div className='LoginBackground'>
        <div className="LoginContainer">
            <CredentialSection/>
            <div className="LoginImage"></div>
        </div>
    </div>
  )
}

export default LoginPage
