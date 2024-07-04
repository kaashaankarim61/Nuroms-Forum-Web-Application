import React, { useEffect, useRef, useState } from 'react'
import './PostPage.css'
import '../LoginPage/TextBox.css'
import CreatePostBox from './CreatePostBox'
import '../GlobalStyles/Loader.css'
import Post from './Post'
function PostPage() {


  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  const addPostDynammically= (newPost)=>{
    setData([newPost,...data]);
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/nuroms/post/get-all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        console.log(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);


  function Initializer(){
    if (isLoading) {
      return <div className='Loader'></div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  }
  


  return (
    <div className="PostPageGrid">
     
     <div className='TrendingContainer'>
            <div className="TrendingHashtags">
            </div>
            <div className="TrendingFaculty">
            </div>
        </div>
        <div className='PostContainer hs'>
            <CreatePostBox  postIT ={addPostDynammically}/>
            <Initializer/>
            {data.map(val=>{
            return(
                <Post key={val._id} val={val}/> 
            )
            })}
        </div>
        <div className='TrendingContainer'>
            <div className="TrendingHashtags">
            </div>
            <div className="TrendingFaculty">
            </div>
        </div>
        
    </div>
  )
}

export default PostPage
