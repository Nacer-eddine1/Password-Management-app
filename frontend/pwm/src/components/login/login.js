import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import './login.css';
import axios from 'axios';
import { Link } from "react-router-dom"


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    // Set initial error values to empty
    setEmailError("")
    setPasswordError("")

    // Check if the user has entered both fields correctly
    if ("" === email) {
        setEmailError("Please enter your email")
        return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        setEmailError("Please enter a valid email")
        return
    }

    if ("" === password) {
        setPasswordError("Please enter a password")
        return
    }

    // if (password.length < 7) {
    //     setPasswordError("The password must be 8 characters or longer")
    //     return
    // }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password
      }, { withCredentials: true });

      // Successful login
      if (response.status === 200) {
        
        // Redirect to home page using React Router
        navigate('/');
        // window.location.href = '/';
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
          });
        // console.log('Login successful');
        // alert('Login successful');
      }
    } catch (error) {
      // Failed login
      if (error.response && error.response.status === 403) {
        // setError('Invalid email or password');
        // alert('Invalid email or password');
        toast.error('Invalid email or password', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
          });

      } else {
        console.error('Login failed:', error);
        // setError('Something went wrong. Please try again later.');
        // alert('Something went wrong. Please try again later.');
        toast.error('Something went wrong. Please try again later', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          // transition: Bounce,
          });

      }
    }
  };

  return (
    <div className='body'>
      <div id="container" className="container h-width py-5 login-component">
        <div className="title"><h1>Log In</h1></div>
        <div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </div>
        <div className="register">
        <Link to='/signup' className='signup'><a id="forgotten" className="forgot">Not registered? Create your account.</a></Link>
          
          </div>
        <div className="inp py-3">
          <form onSubmit={handleLogin}>
            <div className="infield">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
              <p></p>
              <label className="errorLabel">{emailError}</label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label></label>
              <label className="errorLabel">{passwordError}</label>
            </div>
            <a href="#" className="forgot">Forgot your password?</a>
            <button className="login" type="submit">Log In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
