import React, { useState } from 'react'
import edumateLogo from '../assets/edumate-logo.svg'
import './SignupForm.css'
import { Link } from 'react-router-dom'
const SignupForm = () => {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [conf, setConf] = useState('')
  const [error, setError] = useState('')
  const [passError, setPassError] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [visibility, setVisibility] = useState('password')
  const passw = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/
  const userName = /^[A-Za-z0-9_]{3,15}$/
  const emailid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  
  function getName(e){
    setName(e.target.value)
    if (!userName.test(e.target.value)){
      setNameError("The username must be 3-15 characters long, containing only letters, numbers, and the underscore (_) symbol")
    }
    else{
      setNameError('')
    }
  }
  function getEmail(e){
    setEmail(e.target.value)
    if (!emailid.test(e.target.value)){
      setEmailError("Please enter a valid email address (e.g., user@example.com).")
    }
    else{
      setEmailError('')
    }
  }
  function getPass(e){
    setPass(e.target.value)
    if (!passw.test(e.target.value)){
      setPassError("Password must contain minimum 8 characters and atleast one uppercase character, lowercase character, symbol, number")
    }
    else{
      setPassError('')
    }
  }
  function getConf(e){
    setConf(e.target.value)
  }
  function handlesubmit(e){
    e.preventDefault()
    if (name === '' || email === '' || pass === '' || conf === ''){
      setError('*Please fill all the fields')
      return
    }
    if (pass !== conf){
      setError("*Passwords donot match")
      return
    }
    const temp = localStorage.getItem('account')
    const users = JSON.parse(temp) || []
    const user = {
      name: name,
      email: email,
      password: pass
    }
    users.push(user)
    localStorage.setItem('account', JSON.stringify(users))  
  }
  function check(e){
    if (e.target.checked){
      setVisibility('text')
    }
    else{
      setVisibility('password')
    }
  }
  return (
    <div id='signup-page'>
      <div id='navbar'>
        <img src={edumateLogo} alt='logo'/>
        <h2>EduMate</h2>
        <p>Learn today. Achieve tomorrow</p>
      </div>
      <form id='signup-card' onSubmit={handlesubmit}>
        <div id='card-head'>
          <h1>Let's get started</h1>
          <p>Please enter your details</p>
        </div>
        <div id='card-name'>
          <label>Username</label>
          <input type="text" placeholder='Enter Username' value={name} onChange={getName}/>
          {nameError && (<p id="name-error">{nameError}</p>)}
        </div>
        <div id='card-email'>
          <label>Email Id</label>
          <input type="email" placeholder='Enter your Email id' value={email} onChange={getEmail}/>
          {emailError && (<p id="email-error">{emailError}</p>)}
        </div>
        <div id='card-password'>
          <label>Password</label>
          <input type={visibility} placeholder='Password' value={pass} onChange={getPass}/>
          {passError && (<p id="password-error">{passError}</p>)}
        </div>
        <div id='card-confirm-password'>
          <label>Confirm Password</label>
          <input type={visibility} placeholder='Confirm Password'value={conf} onChange={getConf}/>
        </div>
        <div id='show-password'>
          <input type="checkbox" onChange={check}/>
          <span>Show Password</span>
        </div>
        <div id='card-button'>
          {error && <p id="error">{error}</p>}
          <button type='submit'>Sign Up</button>
        </div>
        <div id='acc-exists'>
          <p>Already have one ?</p>
          <span id='log-in'>
            <Link to="/">Log In</Link>
          </span>
        </div>
      </form>
    </div>
  )
}

export default SignupForm
