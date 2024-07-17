import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../api/api';
import { toast } from 'react-toastify'

const RegisterPage = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
 
  const handleNavigation = (e) =>{
    e.preventDefault()
    createUser(username, email, password)
    .then((res) =>{
      console.log(res);
      toast.success('Registered');
      navigate('/');
    })
    .catch((err) => {
      console.log(err);
      toast.error('Please try again later')
    })
    
  }

  return (
    <>
      <div style={styles.mainContainer}>
        <div style={styles.loginBox}>
          <h2>Signup to Create an Account</h2>
          <p>Already have an account? <b onClick={() => navigate('/')} style={{ cursor: "pointer" }}>Login up</b></p>
          <form style={styles.formContent}>
            <input style={styles.buttonHeight} onChange={(e) => setUsername(e.target.value)} type='name' placeholder='Username'></input>
            <input style={styles.buttonHeight} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email Address'></input>
            <input style={styles.buttonHeight} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password'></input>

            <button style={styles.buttonHeight} onClick={handleNavigation}>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100vh"
  },

  loginBox: {
    border: "2px solid black",
    width: "40%",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },

  formContent: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: "40px"
  },

  buttonHeight: {
    height: "40px"
  }
}

export default RegisterPage
