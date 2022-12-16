import React, { useState } from 'react'
import './index.scss'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { notification, Input, Modal, Form, Button, ConfigProvider } from 'antd';  

// Firebase
import { database, storage } from '../../../../firebase';
import { doc, Timestamp, updateDoc, deleteDoc } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject} from 'firebase/storage';
const { TextArea } = Input;
const { confirm } = Modal;

const ExpCards = ({exp}) => {
  const [modal, setModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [loading, setLoading] = useState(false)
  
    const showModal = () => {setModal(true);};
    const handleOk = () => {setModal(false);};
    const handleCancel = () => {setModal(false);};
    const showUpdate = () => {setUpdateModal(true);};
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

    // Delete Image/Experience
    const desertRef = ref(storage, `/Experience/${exp.title}${exp.expId}`);

    const removeExp = id => {
      setLoading(true)

      setTimeout(() => {
        deleteDoc(doc(database, "Experience", id))
        deleteObject(desertRef).then(()=>{
          notification.open({
            message:  <> <p className=''> Experience Deleted </p> </>,
            description:
            'Your Experience has been deleted permanently',
          });
        })
        .catch((error)=>{
          notification.open({
            message:  <> <p className=''> Error Deleting the Experience </p> </>,
            description:
            'Please delete again the Experience',
          });
        })
        setLoading(false)
      }, 2000)
    }
        
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
    
    function showDeleteConfirm() {
      confirm({
        title: 'Are you sure to delete this Experience?',
        icon: false,
        content: 'You will not be seeing the Experince again',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          setModal(false)
          removeExp(exp.expId)
        },
        onCancel() {},
      });
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
          <p className='modal-id'> {exp.expId} </p>
          <p className='modal-title'> <b>{exp.title}</b> </p> 
          <p className='modal-when'> {exp.when} </p> 
          <p className='modal-date'> { exp.dateCreated.toDate().toDateString()} </p>
          <img src={exp.imageUrl} alt='img' className='modal-image' />
          <p className='modal-details'>{exp.details} </p> 
          <div className='exp-modal-button'>
            <button onClick={()=>showUpdate()} className="card-update-button"><FontAwesomeIcon icon={faPenToSquare} size="xl"/></button>
            <button onClick={()=>showDeleteConfirm()} className="card-delete-button"><FontAwesomeIcon icon={faTrashCan} size="xl"/></button>
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