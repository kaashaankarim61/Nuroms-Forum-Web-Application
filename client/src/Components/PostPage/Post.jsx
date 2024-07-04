import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import './PostPage.css'
import Comment from './Comment/Comment'
import '../GlobalStyles/Loader.css'
import '../GlobalStyles/Modal.css'
import './Post.css'
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';
import CreatePostBox from './CreatePostBox'
import CreateCommentBox from './CommentBox/CreateCommentBox'
import image1 from '../../resources/man.PNG'
import { useSelector } from 'react-redux'
import Modal from 'react-modal';


function Post(props) {
    // let commentsDisplay = ["Comments"]
    const UserProfile = useSelector((state)=>{ return state.user.data })
    const [isOpen, setIsOpen] = useState(false);
    const [commentClick, setCommentClick] = useState(false);
    const [commentClass, setCommentClass] = useState("Comments-None");
    const [noofComments, setNoofComments] = useState(0);

    const isoDateString = props.val.Date;
    const date = new Date(isoDateString);
    const dateString = date.toLocaleDateString();

    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [postUserProfile, setPostUserProfile] =useState([]);
    const [image, setImage] = useState(image1);

    const [UpVoteArray, setUpVoteArray] = useState([]);
    const [IsUpVoted, setIsUpVoted] =useState(0);
    const [upVoteActive, setUpVoteActive] = useState('');

    const [reason, setReason] = useState('');

    function handleSelectReason(event) {
      setReason(event.target.value);
    }

    function handleSubmit(event) {
      event.preventDefault();
      // handle form submission with selected reason
    }

    
    const handleOpenModal = () => {
      setIsOpen(true);
    };

    const handleCloseModal = () => {
      setIsOpen(false);
    };


    const addCommentDynammically= (newComment)=>{
      setData([...data, newComment]);
    }




    const handleSubmitReport = async() =>{

      try{
        let Report  = {
          reporterId:UserProfile._id,
          victimId:props.val.AuthorRoll,
          postId:props.val._id,
          reportType:reason
        }
      console.log("Report to be submitted",Report);

      const response = await fetch('http://localhost:8080/nuroms/report-it/add',{
      method:'POST',
      body:JSON.stringify(Report),
      headers: {
          'Content-Type':'application/json'
      }
      })
      const data = await response.json();

      handleCongratulation("Your Report is Submitted Succeddfully");
      setTimeout(() => {
        handleCloseModal();

      }, 4000);
     
      }catch(err){
        console.log(err);
        handleFailure("Your Report Cannot be submitted");
        setTimeout(() => {
          handleCloseModal();
  
        }, 4000);
      }


    }

    useEffect(()=>{
      fetch(`http://localhost:8080/nuroms/user/get/id/${props.val.AuthorRoll}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setPostUserProfile(data);
          console.log(data); 
        })
        .catch((error) => {
          console.log(error);
        });


      fetch(`http://localhost:8080/nuroms/up-votes/get/${props.val._id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setUpVoteArray(data);
        const voterExists = data.find(obj => obj.voterId === UserProfile._id);
        if(voterExists) setIsUpVoted(1);
        console.log(data); 
      })
      .catch((error) => {
        console.log(error);
      });

    },[])
  

    useEffect(()=>{
      const fetchimage = async () => {
        const response = await fetch(`http://localhost:8080/nuroms/image/get/${postUserProfile._id}`);
        const data = await response.json();
        if(data==null){
        setImage(image1);
        console.log("here We go")
        }
        else{
        setImage(data.Image);
        console.log("here We go again")
        }
      };
      fetchimage();
    },[postUserProfile])



    useEffect(() => {
      setIsLoading(true);
      fetch(`http://localhost:8080/nuroms/comment/get/${props.val._id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          const count = Array.isArray(data) ? data.length : Object.keys(data).length;
          setNoofComments(count);
          console.log(data);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }, []);
  

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




  
    function Initializer(){
      if (isLoading) {
        return <div className='Loader'></div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    }

    

    function handleComments(){
        if(!commentClick) {
        setCommentClick(true)
        setCommentClass("Comments");
        }
        else{
        setCommentClick(false)
        setCommentClass("Comments-None");
        }
    }


  async function handleUpVote(){
    if(!IsUpVoted){
      setIsUpVoted(1);
      setUpVoteActive('bt-UpVoted-By-User');
      let upVote = {
        postId:props.val._id,
        voterId:UserProfile._id,
      }
      setUpVoteArray([...UpVoteArray, upVote]);
      const response = await fetch('http://localhost:8080/nuroms/up-votes/add',{
      method:'POST',
      body:JSON.stringify(upVote),
      headers: {
          'Content-Type':'application/json'
      }
      })
      const data = await response.json();

     let notification ={
      recieverId : props.val.AuthorRoll,
      senderId :  UserProfile._id,
      meetingLink :null,
      coachingTopic : null,
      text : `${UserProfile.Name} has Liked your Post`
     }

      const response2 = await fetch('http://localhost:8080/nuroms/notification/add',{
      method:'POST',
      body:JSON.stringify(notification),
      headers: {
          'Content-Type':'application/json'
      }
      })
      const data2 = await response2.json();





    }
    else
    {
      setIsUpVoted(0);
      const filteredArray = UpVoteArray.filter(obj => obj.voterId !== UserProfile._id);
      setUpVoteArray(filteredArray);
      setUpVoteActive('');
      fetch(`http://localhost:8080/nuroms/up-votes/delete/${props.val._id}/${UserProfile._id}`, {
        method: 'DELETE'
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.error(err);
        });
    }

  }


  return (
    <div key={props.val.PostId} className="ViewPostBox">
        <div className="UserProfileInfo">
            <div className="PictureCont PosterPic">
                <div className="PictureCircle">
                    <div className="PictureFrame">
                      <img src={image}  className='CreatePostBox-image' alt="" />
                    </div>
                </div>
            </div>
            <div className="TextDetails">

                {/* <div class="tooltip user-name">Muhammad Anique
                <span class="tooltiptext">Tooltip text</span>
                </div> */}
                <p className='user-name'>{postUserProfile.Name}</p>
                <p className='user-roll'>{postUserProfile.Email}</p>
                <p className='post-date'>{dateString}</p>
            </div>
        </div>


        <div className="ViewPostText">
            <div className='View-Post-Text-Container'>
                <p className='post-content'>{props.val.PostText}</p>
            </div>
            <div className='LineBreak'>
            </div>
        </div>


        <div className="ResponseControls">
            <button className='bt-comment' onClick={()=>{handleComments()}}> {`${noofComments} \u00A0 Comments`}</button>

            <div className='CoupleButton'>
                <div className='btn-cont'>
                <button className={`bt-upvote ${upVoteActive}`} onClick={()=>{ handleUpVote()}} ><BiUpvote size={17}/>&nbsp;{`Upvote \u00A0 ${UpVoteArray.length}`}</button>
                </div>

                <div className='btn-cont'>
                <button className='bt-report' onClick={()=>{handleOpenModal()}} >Report</button>
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
                      height: '330px',
                      margin: 'auto'
                    }
                  }}
                >

                <div className="Modal_Container">
                  <div className='Modal_heading'></div>
                  <div className="Modal_Content" style={{width:'400px', padding: '20px'}}>
                  <h2>Reporting Post </h2>
                  <p style={{alignSelf:'flex-start' , fontWeight: '500' , marginBottom:'5px'}}>Select the Reason to Report the Post .</p>
                  <form className='Modal_Form' onSubmit={handleSubmit}>
                    <div className='Form_Div'> 
                      <label className='Label_Modal'>
                        <input  type="radio" name="reason" value="spam" checked={reason === 'spam'} onChange={handleSelectReason} />
                       <p>Spam</p>
                      </label>
                     
                      <label className='Label_Modal'>
                        <input type="radio" name="reason" value="inappropriate" checked={reason === 'inappropriate'} onChange={handleSelectReason} />
                        <p>Inapproriate</p>
                      </label>
                     
                      <label className='Label_Modal'>
                        <input type="radio" name="reason" value="voilation" checked={reason === 'voilation'} onChange={handleSelectReason} />
                       <p>Voilation</p>
                      </label>

                      <label className='Label_Modal'>
                        <input type="radio" name="reason" value="plagrism" checked={reason === 'plagrism'} onChange={handleSelectReason} />
                       <p>Plagrism</p>
                      </label>

                      <label className='Label_Modal'>
                        <input type="radio" name="reason" value="abusive" checked={reason === 'abusive'} onChange={handleSelectReason} />
                       <p>Abusive language</p>
                      </label>



                    </div>
                  </form>
                
                  </div>
                  <div className="Modal_Button">
                    <button className='Modal_Yes' style={{backgroundColor:'red'}} disabled={!reason} onClick={()=>{handleSubmitReport()}}>Report</button>
                    <button className='Modal_No' onClick={handleCloseModal}>Cancel</button>
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

                
            </div>
          
        </div>



        <Initializer/>
        <div className= {commentClass}>
        {data.map(val=>{
            return(
                <Comment key={val._id} val={val}/> 
            )
        })}
        <CreateCommentBox PostId={props.val._id} commentIT={addCommentDynammically} />
        </div>

        




    </div>
  )
}

export default Post
