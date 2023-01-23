import React from 'react'
import './index.scss'
import Home from './Home'
import Info from './Info'
import Experience from './Experience'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft} from '@fortawesome/free-regular-svg-icons'
import { Link } from 'react-router-dom'

const Guest = () => {
  return (
    <div className='Guest'>
        <div className='back-button'>
          <Link to="/">
          <button><FontAwesomeIcon icon={faArrowAltCircleLeft} size="2xl" color='#9f7582'/></button>
          </Link>
        </div>
        <div className='left-design'>
        FIGHT WITH FAITH
        </div>
        <div className='right-design'>
        EST. 2022
        </div>

      <Home />
      <Info />
      <Experience />
    </div>
    
  )
}

export default Guest