import Home from "./components/home/home" ;
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './components/login/login';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from "./components/signup/signup";

function App() {
  return (
    <Router>
      <div>
      <ToastContainer />
    </div>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
  );
}

export default App;
