import React, { useState } from 'react'
import './index.scss'

import { notification, Input, Modal, Form, Button, ConfigProvider } from 'antd';  

// Firebase
import { database, storage } from '../../../../firebase';
import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const { TextArea } = Input;

const ExpCards = ({exp}) => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false)
  
    const showModal = () => {setModal(true);};
    const handleOk = () => {setModal(false);};
    const handleCancel = () => {setModal(false);};
    const updateOk = () => {setUpdateModal(false);};

    const [image, setImage] = useState(null)
    const [updateForm, setUpdateForm] = useState({
        expId: exp.expId,
        author: exp.author,
        dateCreated: Timestamp.now().toDate(),
        details: exp.details,
        imageUrl: exp.imageUrl,
        title: exp.title
    })
        
    // Handle Image upon Updating Image
    const handleImage = e => {
    setImage(e.target.files[0])
    }

    // Updating Image/Experience
    const updateExp = (id) => {
      setLoading(true)
      setTimeout(() => {
  
        try {
          const storageRef = ref(storage, `/Experience/${updateForm.title}${updateForm.expId}`);
          const uploadTask = uploadBytesResumable(storageRef, image);
  
          uploadTask.on(
              "state_changed",
              (snapshot) => {
                const prog = Math.round(
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                console.log(prog)
              },
              (error) => console.log(error),
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  image ? 
                  updateDoc(doc(database, "Experience", id), {
                    ...updateForm,
                    expId: updateForm.expId,
                    dateCreated: Timestamp.now().toDate(),
                    details: updateForm.details,
                    imageUrl:downloadURL,
                    title: updateForm.title
                  })
                  :
                  updateDoc(doc(database, "Experience", id), {
                    ...updateForm,
                    expId: updateForm.expId,
                    dateCreated: Timestamp.now().toDate(),
                    details: updateForm.details,
                    imageUrl:updateForm.imageUrl,
                    title: updateForm.title
                  });
  
                  setModal(false)
                  setUpdateModal(false)
                  notification.open({
                    message:  <> <p className=''> Image Updated </p> </>,
                    description:
                    'Your image has been updated',
                  });
                });
              });
        } catch (error) {
          notification.open({
            message:  <> <p className=''> Error updating the image </p> </>,
            description:
            'Please update the image again',
          });
      }
        setLoading(false)
      }, 1000)
    }

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
          <img src={exp.imageUrl} alt='img' className='modal-image' />
          <div>
            <p className='modal-id'> {exp.expId} </p>
            <p className='modal-date'> Date Created: { exp.dateCreated.toDate().toDateString()} </p>
            <br/> <br />
            <p className='modal-title'> <b>{exp.title}</b> </p> 
            <p className='modal-when'> {exp.when} </p> 
            <p className='modal-details'>{exp.details} </p> 
          </div>

      </div>
      </Modal>

      { /* Modal Add Announcement */}
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#9f7582',
        }
      }}>
      <Modal 
        title={false} 
        open={updateModal} 
        closeIcon={true}
        destroyOnClose={true}
        onCancel={updateOk}
        style={{top:'10px'}}
        footer={[
          <Button 
          key="cancel"
          type="primary" 
          onClick={updateOk}
          disabled={loading}>Cancel</Button>,
          <Button
          type='primary'
          key="submit"
          onClick={e => e.preventDefault(updateExp(exp.expId))}>
          {loading ? <p>Updating Image</p> : <p>Update Image</p>}
          </Button>
        ]}
        >
          <>
          <form autoComplete="off">
                
            {/* Title */}
            <p className=''> Title </p> 
            <Form.Item name="title" >
              <Input placeholder="Title" className=''
              defaultValue={updateForm.title}
              value={updateForm.title}
              disabled={loading}
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              onChange={e => setUpdateForm({...updateForm, title: e.target.value})}/>
            </Form.Item>
              
            {/* Details */}
            <p className=''>Details</p> 
            <Form.Item
              name="details"
              rules={[{ required: true, message: 'Please input the details' }]}>
              <TextArea placeholder="Details" 
                defaultValue={updateForm.details}
                value={updateForm.details}
                disabled={loading}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                onChange={e => setUpdateForm({...updateForm, details: e.target.value})}/>
            </Form.Item>

            <div className=''>
              <p className=''> Experience </p> 
              <input type='file' name='image' 
                 disabled={loading} accept="image/*"
                onChange={ handleImage }
              />
            </div>
          </form>
          </>
      </Modal>
      </ConfigProvider>
      </>
  )
}

export default ExpCards