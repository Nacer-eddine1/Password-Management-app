import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './login.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: email,
        password: password
      }, { withCredentials: true });

      // Successful login
      if (response.status === 200) {
        // Redirect to dashboard or home page using React Router
        // Example: history.push('/');
        window.location.href = '/';
        console.log('Login successful');
      }
    } catch (error) {
      // Failed login
      if (error.response && error.response.status === 401) {
        setError('Invalid email or password');
      } else {
        console.error('Login failed:', error);
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className='body'>
      <div id="container" className="container h-width py-5 login-component">
        <div className="title"><h1>Log In</h1></div>
        <div className="social-container">
          <a href="#" className="social">
            <FontAwesomeIcon icon="fa-brands fa-facebook" />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={["fab", "google-plus-g"]} />
          </a>
          <a href="#" className="social">
            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
          </a>
        </div>
        <div className="register"><a href="/signup" id="forgotten" className="forgot">Not registered? Create your account.</a></div>
        <div className="inp py-3">
          <form onSubmit={handleLogin}>
            <div className="infield">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" />
              <label></label>
            </div>
            <div className="infield">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label></label>
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
