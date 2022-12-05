import React, { useState, useEffect} from 'react'
import './index.scss'
import { Link } from 'react-router-dom'
import ExpCards from '../ExpCards'

// Firebase
import { database  } from '../../../../firebase'
import { collection, onSnapshot } from 'firebase/firestore'

const ExpPage = () => {

  const [Experience, setExperience] = useState([])

  // Image Collection
  useEffect(() => {
    const imageCollectionRef = collection(database, "Experience")
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
    <div className='exppage'>
      <div className='exppage-header'>
        <Link to='/Guest' className='link'>
          <button className='return-button'>Return</button>
        </Link>

        <div className='exppage-title'>
          <p>Experiences</p>
        </div>

        <div className='exppage-button'>
        </div>
      </div>

      <div className='whole-exppage'>
        {Experience.sort((a, b) => a.dateCreated > b.dateCreated ? 1 : -1).map((exp) => (
          <ExpCards className='exp-image'  exp={exp} key={exp.expId} />
        ))}
      </div>

    </div>
  )
}

export default ExpPage