import React from 'react'
import './index.scss'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Home = () => {

  return (
    <div className='section home'>
      <div className='home-img'>
        <img 
          src="https://firebasestorage.googleapis.com/v0/b/krstn-f3236.appspot.com/o/Home%26Info%2FIMG_HOME.jpg?alt=media&token=65ac3f35-e14c-4e82-bc93-d77ba8786265" 
          alt='Home-Img' 
          className='this-home-img'
          loading='lazy'/>
        
      </div>

      <div className='home-title'>
        <p className='title-name'>Kristine Cruz</p>
        <div className='title-social'>
          <div className='social-icons'>
            <a href='https://www.instagram.com/kristinecrz/' target="_blank" rel="noreferrer noopenner" className='icon'><FontAwesomeIcon icon={faInstagram} size="xl"/></a>
            <a href='https://twitter.com/kristinecrz' target="_blank" rel="noreferrer noopenner" className='icon'><FontAwesomeIcon icon={faTwitter} size="xl"/></a>
            <a href='https://www.youtube.com/@kristinecrz8587' target="_blank" rel="noreferrer noopenner" className='icon'><FontAwesomeIcon icon={faYoutube} size="xl"/></a>
          </div>
          <p className='social-name'>@kristinecrz</p>
        </div>
      </div>
    </div>
  )
}

export default Home