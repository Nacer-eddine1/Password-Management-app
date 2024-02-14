import React, { useState } from 'react';
import './signup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGooglePlusG, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom"



const Signup = () => {
  const [first_name, setFirst_Name] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [first_nameError, setFirst_NameError] = useState('');
  const [last_nameError, setLast_NameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Reset errors
    setFirst_NameError('');
    setLast_NameError('');
    setEmailError('');
    setPasswordError('');

    // Validation
    const nameRegex = /^[a-zA-Z]{5,15}$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    // Check if the user has entered first name field correctly
    if (!first_name.match(nameRegex)) {
      if (!first_name) {
        setFirst_NameError('Please enter your first name');
      } else if (first_name.length < 5 || first_name.length > 15) {
        setFirst_NameError('First name should be between 5 and 15 characters');
      } else if (!/^[a-zA-Z]+$/.test(first_name)) {
        setFirst_NameError('First name should contain only letters');
      }
      return;
    }

    // Check if the user has entered last name field correctly
    if (!last_name.match(nameRegex)) {
      if (!last_name) {
        setLast_NameError('Please enter your last name');
      } else if (last_name.length < 5 || last_name.length > 15) {
        setLast_NameError('Last name should be between 5 and 15 characters');
      } else if (!/^[a-zA-Z]+$/.test(last_name)) {
        setLast_NameError('Last name should contain only letters');
      }
      return;
    }

    // Check if the user has entered email field correctly
    if (!email.match(emailRegex)) {
      if (!email) {
        setEmailError('Please enter your email');
      } else {
        setEmailError('Please enter a valid email');
      }
      return;
    }

    // Check if the user has entered password field correctly
    if (!password.match(passwordRegex)) {
      if ("" === password) {
        setPasswordError("Please enter a password")
        return
      }
      if (password.length < 8) {
        setPasswordError('Password should be at least 8 characters long');
      }
      if (!/(?=.*[a-z])/.test(password)) {
        setPasswordError('Password should contain at least one lowercase letter');
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordError('Password should contain at least one uppercase letter');
      }
      if (!/(?=.*\d)/.test(password)) {
        setPasswordError('Password should contain at least one number');
      }
      if (!/(?=.*[!@#$%^&*])/.test(password)) {
        setPasswordError('Password should contain at least one special character');
      }
      return;
    }


    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
      });

      // Check if registration was successful
      if (response.status === 201) {
        // Redirect to home page using React Router
        navigate('/login');
        // window.location.href = '/';
        toast.success('Signup successful!');
        // Redirect or show success message
        // console.log('Registration successful');
      }
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 400) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response from server:', error.response.data);
        toast.error('Login failed');
        // setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        // setError('No response received from server. Please try again later.');
        toast.error('No response received from server. Please try again later.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        // setError('An unexpected error occurred. Please try again later.');
        toast.error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='body'>
      <div id="container-signup" className="container h-width py-5 register-component">
        <div className="title"><h1>Signup</h1></div>
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
          <Link to='/login' className='login'><a id="forgotten" className="forgot">Already have an account?</a></Link>
        </div>
        <div className="inp py-3">
          <form onSubmit={handleSubmit}>
            <div className="infield">
              <input type="text" placeholder="First Name" value={first_name} onChange={(e) => setFirst_Name(e.target.value)} />
              <label className="errorLabel">{first_nameError}</label>
            </div>
            <div className="infield">
              <input type="text" placeholder="Last Name" value={last_name} onChange={(e) => setLast_Name(e.target.value)} />
              <label className="errorLabel">{last_nameError}</label>
            </div>
            <div className="infield">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="errorLabel">{emailError}</label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className="errorLabel">{passwordError}</label>
            </div>
            <button className="signup" type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
