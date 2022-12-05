import React, { useState, useEffect } from 'react'
import './index.scss'
import ExpCards from './ExpCards';
import { Link } from 'react-router-dom'

// Firebase
import { database } from '../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const Experience = () => {

  const [Experience, setExperience] = useState([])
  

  // Image Collection
  const imageCollectionRef = collection(database, "Experience")
  useEffect(() => {
    onSnapshot(imageCollectionRef, snapshot => {
      setExperience(snapshot.docs.map(doc => {
        return {
          expId: doc.expId,
          ...doc.data()
        }
      }))
    })
  }, [])

  return (
    <div className='section exp'>
      <div className='exp-title'>
      <p>WORK EXPERIENCE</p>
      </div>

      <div className='exp-portrait'>
        {Experience.slice(0,5).sort((a, b) => a.dateCreated > b.dateCreated ? 1 : -1).map((exp) => (
          <ExpCards className='exp-image' exp={exp} key={exp.expId} />
        ))}
      </div>

      <div className='exp-port'>
          <Link 
          to="/ExpPage"
          style={{textDecoration: "none"}}
          className='port-link'>
          <button className='port-button'>See More</button>
          </Link>
      </div>
      
    </div>
  )
}

export default Experience