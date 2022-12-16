import React from 'react'
import './index.scss'

const Info = () => {
  return (
    <div className='section info'>
      <div className='info-img'>
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/krstn-f3236.appspot.com/o/Home%26Info%2FIMG_INFO.jpg?alt=media&token=ea0d61fa-9d54-48d1-9a57-d496ee05a5f2" 
          alt='Info-Img' 
          className='this-info-img'/>
      </div>

      <div className='info-content'>
        <div className='info-title'>
          <p className='title-name'>I'm kristine cruz</p>
          <p className='title-hello'>HELLO</p>
        </div>

        <div className='info-sub-desc'>
          <p> BA International Studies - International Development and Cooperation Track</p>
          <p>Far Eastern University</p>
          <p>Events & Podcast Host</p>
        </div>

        <div className='info-desc'>
          <p className='desc-text'>Hey! I'm Kristine but you can just simply call me Tin. :) I started my journey as a host in 2015. I hosted school programs and was roughly around 15 years old at that time. Eventually, I hosted different events such as grad balls, debuts, school fairs, concerts, and etc. The very thrust of my hosting is about telling a story that positively connects with the audience. Expect genuine, fun and bubbly energy when you work with me!</p>
        </div>
      </div>
    </div>
  )
}

export default Info