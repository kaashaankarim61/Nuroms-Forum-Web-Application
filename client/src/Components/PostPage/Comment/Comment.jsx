import React, { useEffect, useState } from 'react'
import './Comment.css'
import PictureCircle from '../../PictureCircle/PictureCircle'; 



function Comment(props) {


  const [data, setData] = useState([]);

  useEffect(() => {
    
    fetch(`http://localhost:8080/nuroms/user/get/id/${props.val.CommenteeRoll}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
       console.log("Error");     
      });
  }, []);

  const [image, setImage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`http://localhost:8080/nuroms/image/get/${data._id}`);
          const data1 = await response.json();
          if(data1==null)
          ;
          else
          setImage(data1.Image);
        };
        fetchData();
    
      }, [data]);


  return (
    <React.Fragment key={props.val._id}>
      <div className="Comment-Cont">
        <div className="Commentee-Info">
          <PictureCircle Img={image}/>
         <div className="Commentee-Details">
          <p className='Commentee-Name' >{data.Name}</p>
          <p className='Comment-Content'>{props.val.CommentText}</p>
         </div>
         
        </div> 
      
          
      </div>
    </React.Fragment>
  )
}

export default Comment
