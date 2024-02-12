// import logo from './logo.svg';
import React from 'react';
import Header  from "../header/header" ;
import './home.css';
import Users from '../users/users';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Login from './components/login/login';

function Home() {
  return (
  <>
    <Header />
    
    <Users />
  </>

  );
}

export default Home;