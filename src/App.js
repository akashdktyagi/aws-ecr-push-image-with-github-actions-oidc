import React from "react";
import './App.css';
import HeaderComponent from './commonlayout/Headercomponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import { useSelector } from 'react-redux';
import UserDashboard from './components/UserDashboard/UserDashboard';
import Protected from './components/UserDashboard/Protected';
import UserProfileComponent from "./components/UserProfileComponent/UserProfileComponent";
import FindADoctor from "./components/FindADoctor/FindADoctor";
import MyBookingComponent from "./components/MyBooking/MyBookingComponent";

function App() {

  const { isAuthenticated } = useSelector((state) => state.root);

  return (
    <div className="App">
      <Router>
        <HeaderComponent isLoggedIn={isAuthenticated} />
        <Routes>
          <Route path='/' element={<HomeComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          {/* <Route
            path="/dashboard"
            element={<Protected isAuthenticated={isAuthenticated}><UserDashboard /></Protected>}
          /> */}
          

          <Route element={<Protected isAuthenticated={isAuthenticated} />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/userprofile" element={<UserProfileComponent />} />
            <Route path="/findadoctor" element={<FindADoctor />} />
            <Route path="/mybooking" element={<MyBookingComponent />} />
          </Route>

        </Routes>
      </Router>

    </div>
  );
}

export default App;
