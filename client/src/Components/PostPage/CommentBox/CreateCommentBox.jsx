import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import '../Comment/Comment.css'
import './CreateCommentBox.css'
import PictureCircle from '../../PictureCircle/PictureCircle';
import {AiOutlineSend} from 'react-icons/ai';

const CreateCommentBox = (props) => {


    const [value, setValue] = useState("");
    const textareaRef = useRef(null);
    const [commentClass, setCommentClass] = useState('CommentTextit')
    const [picDivClass, setPicDivClass] = useState('picdiv');
    const [buttonClass, setButtonClass]=useState('buttoncornerComment');

    const [areaActive, setAreaActive]  =useState(0);


    const UserProfile = useSelector((state)=>{ return state.user.data })


    const [image, setImage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:8080/nuroms/image/get/${UserProfile._id}`);
          const data = await response.json();
          if(data==null)
          ;
          else
          setImage(data.Image);
        };
        fetchData();
    
      }, []);





    const UploadComment = async()=>{
        console.log("Profiel = ",UserProfile);
        let Comment = {
            CommenteeRoll: UserProfile._id,
            PostId: props.PostId,
            CommentText: value,
            Priority: `${-9}`,
            Status: "active"

        }
        console.log("Comment",Comment);
        

        try{
            const response = await fetch('http://localhost:8080/nuroms/comment/add',{
                method:'POST',
                body:JSON.stringify(Comment),
                headers: {
                    'Content-Type':'application/json'
                }
                })

            const data = await response.json();
            console.log(data);
           props.commentIT(Comment);
            // window.location.reload();
        }catch(error)
        {
            alert(error);
        }
    
        
        setCommentClass('CommentTextit');
        setPicDivClass('picdiv');
        setButtonClass('buttoncornerComment')
        setValue("");
            
 
    }

    function handleChange(event) {
        setValue(event.target.value);
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        
    }

    function handleWidth(e){
        if(areaActive==0){
        setCommentClass('CommentTextitActive');
        setPicDivClass('picdiv-static');
        setButtonClass('buttonCornerUPComment')
        }
       
    }

  return (
    <div className="CreateCommentBox">
            <div className={picDivClass}>
            <PictureCircle Img={image}/>
            </div>
            <div className="CommentTextCont">
                <div className={commentClass}>
                    <textarea
                    className="autogrow-textarea"
                    ref={textareaRef}
                    value={value}
                    onChange={handleChange}
                    onClick={handleWidth}
                    />
                </div>
            </div>

            <div className={buttonClass}>
                <button className='sendButton' onClick={()=>{UploadComment()}}>
                   <AiOutlineSend size={27}/>
                </button>    
            </div>   
    </div>)
  
}

export default CreateCommentBox
