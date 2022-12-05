import React from 'react'
import './index.scss'
import AdminExperience from './Experience'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-regular-svg-icons'

const Admin = () => {
  return (
    <div>
      <div className='back-button'>
          <Link to="/Login">
          <button><FontAwesomeIcon icon={faArrowAltCircleLeft} size="2xl" color='#9f7582'/></button>
          </Link>
        </div>
        <AdminExperience />
    </div>
  )
}

export default Admin