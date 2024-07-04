import React from 'react'
import './PictureCircle.css'


function PictureCircle(props) {
  return (
    <div className="PictureCont extra-small">
    <div className="PictureCircleSmall">
        <div className="PictureFrame">
          <img src={props.Img} className='CreateCommentBox-image' alt="" />
        </div>
    </div>
    </div>
  )
}

export default PictureCircle
