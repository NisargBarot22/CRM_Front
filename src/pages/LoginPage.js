import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api/api';
import { toast } from 'react-toastify'

const LoginPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleNavigation = () =>{
    navigate('/register');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(userName.length > 0 || password.length > 0){
      login(userName, password)
      .then((res) => {
        console.log(res);
        toast.success('Welcome')
        localStorage.setItem('token', res.access_token);
        navigate('/dashboard')
      })
      .catch((err) => {
        toast.error('Invalid Credentials')
        console.log(err);
      })
    }else{
      toast.error('Fields Empty')
    }
    
    
  }

  return (
    <>
    <div style={styles.mainContainer}>
      <div style={styles.loginBox}>
        <h2>Login to your Account</h2>
        <p>Don't have an account yet? <b onClick={handleNavigation} style={{cursor: "pointer"}}>Sign up</b></p>
        <form style={styles.formContent} onSubmit={handleSubmit}>
          <input style={styles.buttonHeight} value={userName} type='email' placeholder='Email Address' onChange={(e) => setUserName(e.target.value)}></input>
          <input style={styles.buttonHeight} value={password} type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>

          <button style={styles.buttonHeight} >Submit</button>
        </form>
      </div>
    </div>
    </>
  )
}

const styles = {
  mainContainer:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh"
  },

  loginBox:{
    border: "2px solid black",
    width: "40%",
    height: "450px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly"
  },

  formContent:{
    display: "flex",
    flexDirection: "column",
    width: "80%",
    gap: "40px"
  },

  buttonHeight:{
    height: "40px"
  }
}

export default LoginPage
