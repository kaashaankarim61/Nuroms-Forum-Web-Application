import React, { useEffect, useState } from 'react'
import { setNavigation } from '../../store/slices/navigationSlice'
import './Navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { setIsLogin } from '../../store/slices/loginSlice';
import { setUser } from '../../store/slices/userSlice'
import {FiTrello} from 'react-icons/fi'
import {SlBell} from 'react-icons/sl'
import Tooltip from './Tooltip';



export default function Navbar() {

    const UserProfile = useSelector((state)=>{ return state.user.data })
    const [data, setData] =useState(0);
    const [getBit, setGetBit] =useState(1);
    const [hideN, sethideN] =useState('');



    const [nav1, setNav1 ] =useState(0);
    const [nav2, setNav2 ] =useState(0);
    const [nav3, setNav3 ] =useState(0);
    const [nav4, setNav4 ] =useState(0);
    const [nav5, setNav5 ] =useState(0);
    const [nav6, setNav6 ] =useState(0);
    const [nav7, setNav7 ] =useState(0);


    const [nac1, setnac1 ] =useState('activate');
    const [nac2, setnac2 ] =useState('');
    const [nac3, setnac3 ] =useState('');
    const [nac4, setnac4 ] =useState('');
    const [nac5, setnac5 ] =useState('');
    const [nac6, setnac6 ] =useState('');
    const [nac7, setnac7 ] =useState('');


   
    const dispatch =useDispatch();
    // dispatch(setNavigation(0));

    function logout(){
        //logout
        dispatch(setNavigation(0));
        dispatch(setIsLogin(0));
        dispatch(setIsLogin(0));
        dispatch(setUser(null)); 
        setGetBit(1);
    }

    function profilePage(){
        dispatch(setNavigation(5));
        setNav2(1); setnac2('activate');
        

        setNav1(0); setnac1('');
        setNav3(0); setnac3('');
        setNav4(0); setnac4('');
        setNav5(0); setnac5('');
        setNav6(0); setnac6('');
        

    }

    function PostPage(){
        dispatch(setNavigation(1));

        setNav1(1); setnac1('activate');
        setNav2(0); setnac2('');
        setNav3(0); setnac3('');
        setNav4(0); setnac4('');
        setNav5(0); setnac5('');
        setNav6(0); setnac6('');
       
    }

    function CoachingService(){
        dispatch(setNavigation(4));
        setNav1(0); setnac1('');
        setNav2(0); setnac2('');
        setNav3(0); setnac3('');
        setNav4(1); setnac4('activate');
        setNav5(0); setnac5('');
        setNav6(0); setnac6('');
       
    }

    function CreateRequest(){
        dispatch(setNavigation(6));
        setNav1(0); setnac1('');
        setNav2(0); setnac2('');
        setNav3(1); setnac3('activate');
        setNav4(0); setnac4('');
        setNav5(0); setnac5('');
        setNav6(0); setnac6('');
       
    }

    function MyRequests(){
        dispatch(setNavigation(7));

        setNav1(0); setnac1('');
        setNav2(0); setnac2('');
        setNav3(0); setnac3('');
        setNav4(0); setnac4('');
        setNav5(1); setnac5('activate');
        setNav6(0); setnac6('');
        
    }
    function NotificationBox(){
        dispatch(setNavigation(8));
        setGetBit(0)
        setData(0);
        sethideN('non-active');
        setNav1(0); setnac1('');
        setNav2(0); setnac2('');
        setNav3(0); setnac3('');
        setNav4(0); setnac4('');
        setNav5(0); setnac5('');
        setNav6(1); setnac6('activate');
        
    }

    async function fetchData() {
        try {
          const response = await fetch(`http://localhost:8080/nuroms/notification/get/${UserProfile._id}`);
          const json = await response.json();
          console.log("JSON Notifications  = ",json);
          setData(json.length);
          if(json.length==0){
            sethideN('non-active');
          }
        } catch (error) {
        
          console.error(error);
        }
      }
  
      

    const Menu_Items= ()=>{
       
        const LoginBit= useSelector((state)=>{ return state.loginbit.data });

        

        if(LoginBit){
            if(getBit) fetchData();
            return(
                <>
                
                  <div className={`Nav-Item  ${nac1}`} onClick={()=>{PostPage()}} >
                        <Tooltip text="Home">
                            <span className="material-symbols-outlined"  >home</span>
                        </Tooltip>  
                    </div>
                    <div className={`Nav-Item  ${nac2}`} onClick={()=>{profilePage()}} >
                        <Tooltip text="Profile">
                           <span className="material-symbols-outlined"  >account_circle</span>
                        </Tooltip>  
                       
                    </div>
                    <div className={`Nav-Item  ${nac3}`} onClick={()=>{CreateRequest()}} >
                        <Tooltip text="Create Request">
                            <span className="material-symbols-outlined">post_add</span>
                        </Tooltip>  
                    </div>
                    <div className={`Nav-Item  ${nac4}`} onClick={()=>{CoachingService()}} >
                        <Tooltip text="Public Sessions">
                             <span className="material-symbols-outlined">cast_for_education</span>
                        </Tooltip>               
                    </div>
                    <div className={`Nav-Item  ${nac5}`}  onClick={()=>{MyRequests()}} >
                    <Tooltip text="My Session">
                    <FiTrello size={20}/>
                        </Tooltip>    
                      
                    </div>
                    <div className={`Nav-Item  ${nac6}`}  onClick={()=>{NotificationBox()}} >
                        <Tooltip text="Notification">
                           <SlBell size={20}/>
                        </Tooltip>    
    
                       <div className={`badge ${hideN}`}> <p>{data}</p> </div> 
                    </div>
                </>
            )

        }
       
        else
        return(
            <>
            <div></div>
            </>
        )
    }
    


   


  return (
    <div>
        <nav className='Navbar'>
            <div className="Nav-Container">
                {/* <div className="Nav-Item" >
                    <span className="material-symbols-outlined">login</span>
                </div> */}
                <Menu_Items/>
                <div className="Nav-Last-Item" onClick={()=>{logout()}} >
                    <span className="material-symbols-outlined" >logout</span>
                </div>
            </div>
        </nav>
    </div>
  )
}
