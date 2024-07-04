import React, { useState } from 'react'
import './PictureFrame.css'
import Avatar from '../../src/resources/man.jpg'




const PictureFrame =(props)=>{

  
    const width_ = props.width;
    const padding_1 = props.padding1;
    const padding_2 = props.padding2;
    const backgroundColor_ =props.backgroundColor;
    const backgroundImage_ = props.backgroundImage_;

    const InnerStyles = {
      padding: padding_2
    };
    

    const OuterStyles = {
      padding: padding_1,
      width:width_,
      height:width_,
      backgroundColor:backgroundColor_,
      backgroundImage:backgroundImage_,
      
    };

    return(
        <div className="Outer-Circle-Poster" style={OuterStyles} >
           <div className="Inner-Circle-Poster" style={InnerStyles}>
           <img src={props.image}  alt="" />
          </div>
        </div>
      )
    }

export default PictureFrame
