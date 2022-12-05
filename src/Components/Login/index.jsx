import React, {useContext, useState} from 'react'
import './index.scss'
import { Link, useNavigate } from 'react-router-dom'

import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AuthContext } from '../../Context/AuthContext'

const Login = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const navigate = useNavigate();

    const {dispatch} = useContext(AuthContext)

    const handleLogin = (e) => {
      e.preventDefault();

      signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
        dispatch({type:"LOGIN", payload:user});
        navigate("/Admin");
      }).catch((error) => {
        setError(true);
      })
    }

  return (
    <div className='login'>
        <div className='login-title'>
        Kristine Cruz's Portfolio
        </div>
            <form onSubmit={handleLogin} className='login-form'>
                <input type="email" placeholder='EMAIL' onChange={e=>setEmail(e.target.value)} className='login-email'/>
                <input type="password" placeholder='PASSWORD' onChange={e=>setPass(e.target.value)} className='login-pass'/>
                <button type='submit' className='login-button'>LOGIN</button>
                {error && <span>Wrong Email or Password!</span>}
                <Link
                to="/Guest"
                style={{textDecoration: "none"}}
                className='guest-link'>
                <button className='login-guest'>Visit as Guest</button>
                </Link>
            </form>
    </div>
  )
}

export default Login