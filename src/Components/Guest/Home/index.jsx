import React from 'react'
import './index.scss'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

// Images
import IMGHOME from '../../../Assets/Images/IMG_HOME.jpg' 

const Home = () => {

  return (
    <div className='section home'>
      <div className='home-img'>
        <img src={IMGHOME} alt='Home-Img' className='this-home-img'/>
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