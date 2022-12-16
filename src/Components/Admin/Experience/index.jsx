import React, { useState, useEffect } from 'react'
import './index.scss'

// Firebase
import { database, storage } from '../../../firebase'
import { collection, onSnapshot, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

// Ant Design
import { Button, Input, notification, Form, Modal, ConfigProvider, DatePicker } from 'antd'

import { v4 as uuidv4 } from 'uuid'
import moment from 'moment';
import ExpCards from './ExpCards';

const { TextArea } = Input;
const expId = "exp-" + uuidv4().slice(0, 2);

const AdminExperience = () => {

  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };
  const handleOk = () => {
    setModal(false);
  };

  const [loading, setLoading] = useState(false);
  const [Experience, setExperience] = useState([])
  const [image, setImage] = useState(null)
  const [form, setForm] = useState({
    expId: expId,
    details: "",
    title: "",
    imageUrl: "",
    when: "",
    dateCreated: Timestamp.now().toDate()
  })
  

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

  // Handle Date Select
  function pickDate(date, dateString) {
    setForm({ ...form, when: dateString })
  }
  const currentDate = (current) => {
    let customDate = moment();
    return current && current > moment(customDate);
  }

  // Handle Image
  const handleImage = e => {
    setImage(e.target.files[0])
  }

  // Handle Submit
  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (
        !form.details ||
        !form.title ||
        !form.when ||
        !image

      ) {
        notification.open({
          message: <> <p className=''>  Invalid Form </p> </>,
          description:
            'Please make sure that you have completed the entire form.',
        });

        setLoading(false)
        return
      }

      const storageRef = ref(storage, `/Experience/${form.title}${form.id}`);
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
            setForm({
              expId: "exp-" + uuidv4().slice(0, 5),
              details: "",
              title: "",
              imageUrl: "",
              when: "",
              dateCreated: serverTimestamp(),
            })

            setLoading(false)
            setModal(false)
            notification.open({
              message: <> <p className=''> Image Added </p> </>,
              duration: 10,
              description:
                'Your Image has been published publicly',
            })
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const imageCollectionRef = collection(database, "Experience")
            addDoc(imageCollectionRef, {
              dateCreated: Timestamp.now().toDate(),
              expId: form.expId,
              details: form.details,
              title: form.title,
              when: form.when,
              imageUrl: downloadURL,
            })
          });
        });
    }, 2000)
  }

  return (
    <div className='section admin-exp'>
      <div className='admin-exp-title'>
      <p>WORK EXPERIENCE</p>
      </div>
      
      <div className='admin-exp-button'>
        <button onClick={showModal}>Add Experience</button>
      </div>

      <div className='admin-exp-portrait'>
        {Experience.sort((a, b) => a.dateCreated > b.dateCreated ? 1 : -1).map((exp) => (
          <ExpCards className='exp-image' exp={exp} key={exp.expId} />
        ))}
      </div>

      <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#9f7582',
        }
      }}>
        <Modal 
        title={false} 
        open={modal}
        closeIcon={false}
        onOk={handleOk} 
        onCancel={handleOk}
        style={{top:'100px'}}
        closable={true}
        footer={[
            <Button 
            key="cancel"
            type="primary" 
            onClick={handleOk}
            disabled={loading}>Cancel</Button>,
            <Button
            type='primary'
            key="submit"
            onClick={handleSubmit}>
            {loading ? <p>Adding Image</p> : <p>Add Image</p>}
            </Button>
          ]} >
          <Form 
          onSubmitCapture={handleSubmit}
          autoComplete="off">

            {/* Title */}
            <p>Experience Title</p>
            <Form.Item 
            name="title"
            rules={[{ required: true, message: 'Please add title' }]}>
              <Input 
              placeholder='Title'
              value={form.title}
              disabled={loading}
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              onChange={e => setForm({ ...form, title: e.target.value })}
              />
            </Form.Item>

            {/* When */}
            <p>Date Happened</p>
            <Form.Item
              name="date"
              rules={[{ required: true, message: 'Please select date' }]}
            >
              <DatePicker type='date'
                value={form.when}
                onChange={pickDate}
                disabled={loading}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                disabledDate={currentDate}
              />
            </Form.Item>

            {/* Details */}
            <p>Details</p>
            <Form.Item 
            name="detail"
            rules={[{ required: true, message: 'Please add some details' }]}>
              <TextArea 
              placeholder='Details'
              value={form.details}
              disabled={loading}
              onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
              onChange={e => setForm({ ...form, details: e.target.value })}/>
            </Form.Item>

            {/* Experience Image */}
            <p>Experience Image</p>
            <Form.Item name="image">
              <Input 
              type='file'
              name='image'
              disabled={loading}
              accept='image/*'
              onChange={handleImage}
              required/>
            </Form.Item>
          </Form>
        </Modal>
      </ConfigProvider>

      
    </div>
  )
}

export default AdminExperience