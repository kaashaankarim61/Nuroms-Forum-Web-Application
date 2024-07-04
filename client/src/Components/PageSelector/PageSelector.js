import '../../App.css';
import LoginPage from '../LoginPage/LoginPage';
import Dashboard from '../Dashboard/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { setNavigation } from  '../../store/slices/navigationSlice'
import { useState } from 'react';
import PostPage from '../PostPage/PostPage';
import Profile from '../ProfilePage/Profile';
import CreateRequestPage from '../CreateRequestPage/CreateRequestPage'
import MyCoachingRequest from '../MyRequests/MyCoachingRequest';
import './PageSelector.css'

import ViewCoachings from '../ViewCoachingServices/ViewCoachings';
import NotificationBox from '../NotificationBox/NotificationBox';
function PageSelector() {
    const dispatch = useDispatch();

    function Page(){
        const data = useSelector((state)=>{ return state.navigation.data })
        console.log("dT" ,data);
        if(data==0){
          return(
            <div className='LoginPageLay'>
                <LoginPage/>      
            </div>           
          )
        }
        else if(data==1) {
          return(
            <div className="FullPageLay">
              <PostPage/>
            </div>
          )
        }
        else if(data==4){
          return(
            <div className="FullPageLay">
              <ViewCoachings/>
            </div>
          )
        }
        else if(data==5){
          return(
            <div className="FullPageLay">
              <Profile/>
            </div>
          )
        }
        else if(data==6){
          return(
            <div className="FullPageLay">
              <CreateRequestPage/>
            </div>
          )
        }
        else if(data==7){
          return(
            <div className="FullPageLay">
              <MyCoachingRequest/>
            </div>
          )
        }
        else if(data==8){
          return(
            <div className="FullPageLay">
              <NotificationBox/>
            </div>
          )
        }
      

    }


    return (
        <>
          <Page/>
        </>
    )
}

export default PageSelector
