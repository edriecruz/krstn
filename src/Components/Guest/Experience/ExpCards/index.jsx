import React, { useState } from 'react'
import './index.scss'

import { Modal } from 'antd';  


const ExpCards = ({exp}) => {
  const [modal, setModal] = useState(false);
  
    const showModal = () => {setModal(true);};
    const handleOk = () => {setModal(false);};
    const handleCancel = () => {setModal(false);};

  return (
      <>
      <img className='exp-img' src={exp.imageUrl} title={exp.title} alt="img" key={exp.expId} onClick={showModal}/>

      <Modal 
      title={false} 
      footer={false}
      open={modal} 
      onOk={handleOk} 
      closeIcon={false}
      onCancel={handleCancel}
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
      closable={true}
      >             
      <div className='exp-modal'>
          <p className='modal-id'> {exp.expId} </p>
          <p className='modal-title'> {exp.title} </p> 
          <p className='modal-date'> { exp.dateCreated.toDate().toDateString()} </p>
          <img src={exp.imageUrl} alt='img' className='modal-image' />
          <p className='modal-details'>{exp.details} </p>
      </div>
      </Modal>

      </>
  )
}

export default ExpCards