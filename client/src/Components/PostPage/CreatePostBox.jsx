import React, { useEffect } from 'react'
import './PostPage.css'
import { useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import image1 from '../../resources/man.PNG'



function CreatePostBox(props) {



    const [value, setValue] = useState("");
    const textareaRef = useRef(null);
    const [postClass, setPostClass] = useState('PostTextit')
    const [buttonClass, setButtonClass]=useState('buttoncorner');
    const UserProfile = useSelector((state)=>{ return state.user.data })
    const [image, setImage] = useState(image1);
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


    const UploadPost = async()=>{
        setValue('');
        const currentDate = new Date();
        const isoDate = currentDate.toISOString();
        console.log("Profiel = ",UserProfile);
        let Post = {
            AuthorRoll: UserProfile._id,
            Date: isoDate,
            PostText: value,
            Priority: `${-9}`,
            Status: "active"
        }
        console.log("Post",Post);
        

        try{
            const response = await fetch('http://localhost:8080/nuroms/post/add',{
                method:'POST',
                body:JSON.stringify(Post),
                headers: {
                    'Content-Type':'application/json'
                }
                })

            const data = await response.json();
            console.log(data);
           props.postIT(Post);
            // window.location.reload();
        }catch(error)
        {
            alert(error);
        }
      

 
    }

    function handleChange(event) {
        setValue(event.target.value);
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        
    }

    function handleWidth(e){
        console.log("Clicked");
        setPostClass('PostTextitActive');
        setButtonClass('buttonCornerUP')
    }


  return (

    <>
     <div className="CreatePostBox">
        <div className="PictureCont MyPic">
            <div className="PictureCircle">
            <div className="PictureFrame">
                <img src={image} className='CreatePostBox-image' alt="" />
            </div>
            </div>
        </div>
        
        <div className="PostTextCont">
            <div className={postClass}>
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
        <button className='uploadButton' onClick={()=>{UploadPost()}}>
            Upload
        </button>
        </div>
        
       
     </div>
    </>
  )
}

export default CreatePostBox
