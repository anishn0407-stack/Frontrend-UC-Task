import React, { useState } from 'react'
import loginImage from '../assets/login-hero.png'
import edumateLogo from '../assets/edumate-logo.svg'
import './LoginForm.css'
import './Popup.css'
import { Link } from 'react-router-dom'

const LoginForm = () => {

  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [popup, setPopup] = useState(false)
  const [popup1, setPopup1] = useState(false)
  const [visibility, setVisibility] = useState('password')

  function getEmail(e){
    setEmail(e.target.value)
  }
  function getPass(e){
    setPass(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    const temp = localStorage.getItem("account")
    const users =  JSON.parse(temp) || []
    const user = users.find((u) => {
      return u.email === email && u.password === pass;
    })
    if(user){
      setPopup1(true)
    }
    else{
      setPopup(true)
    }
  }
  function check(e){
    if(e.target.checked){
      setVisibility('text')
    }
    else{
      setVisibility('password')
    }
  }
  
  return (
    <div id='login-page'>

      <div id='navbar'>
        <img src={edumateLogo} alt='logo'/>
        <h2>EduMate</h2>
        <p>Learn today. Achieve tomorrow</p>
      </div>

      <div id='login-container'>

        <div id='login-left'>
          <div id='login-left-image'>
            <img src={loginImage} alt="Login illustration" />
          </div>
        </div>

        <div id='login-right'>
          <h1 id='login-right-head'>Welcome Back</h1>
          <p id='login-right-para'>Please enter your details</p>
          <form id='login-right-form' onSubmit={handleSubmit}>
            <div id='form-group'>
              <label>Email</label>
              <input type="email" id='form-email' value={email} onChange={getEmail}/>
            </div>
            <div id='form-group'>
              <label>Password</label>
              <input type={visibility} id='form-password' value={pass} onChange={getPass}/>
            </div>
            <div id='remember-me'>
              <input type="checkbox" onChange={check}/>
              <span>Show Password</span>
            </div>
            <button type='submit'>Log In</button>
          </form>
          <div id='no-account'>
            <p>Don't have an account ?</p>
            <span id='sign-up'>
              <Link to="/signup">Sign Up</Link>
            </span>
          </div>

        </div>

      </div>

      {popup && (
        <div id="error-popup-overlay">
          <div id="error-popup">
            <div id="error-icon">✕</div>
            <h2>ERROR</h2>
            <p>Invalid email or password.</p>
            <button onClick={() => setPopup(false)}>
              Try Again
            </button>
          </div>
        </div>
      )}

      {popup1 && (
        <div id="success-popup-overlay">
          <div id="success-popup">
            <div id="success-icon">✓</div>
            <h2>Login Successful</h2>
            <button onClick={() => setPopup1(false)}>
              Ok
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default LoginForm


