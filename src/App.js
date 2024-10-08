import './App.css';
import Navbar from "./components/Navbar";
import { Route,Routes } from 'react-router';
import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useState } from 'react';
import PrivateRoute from './components/PrivateRoute';
import VerifyEmail from './pages/VerifyEmail'
import StudentInput from './pages/StudentInput';
import { useSelector } from 'react-redux';

function App() {
  const {token}=useSelector((state)=>state.auth)
  return (
    <div className=" w-screen h-fit bg-richblack-700 flex flex-col">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/dashboard" element={
          <PrivateRoute token={token}>
            <Dashboard/>
          </PrivateRoute>
          } />
          <Route path="/student-input" element={
          <PrivateRoute token={token}>
            <StudentInput/>
          </PrivateRoute>
          } />
      </Routes>

    </div>
  );
}

export default App;
