import Home from "./components/home/home" ;
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/login/login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./components/signup/signup";
import Passwords from "./components/passwords/passwords";
import Users from "./components/users/users";

function App() {
  return (
    <Router>
      <div>
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="colored"
      // transition: Bounce
      />
    </div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/passwords" element={<Passwords />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </Router>
  );
}

export default App;
