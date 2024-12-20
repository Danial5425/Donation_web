import React, { useState, useEffect, createContext } from "react";
import Appbar from "./components/Appbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Signup from "./components/pages/Signup";
import Donate from "./components/pages/Donate";
import Login from "./components/pages/Login";

import Donatebtn from "./components/Donatebtn";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import MainLogin from "./components/pages/MainLogin";
import MainSignup from "./components/pages/MainSignup";
import NgoSignup from "./components/pages/NgoSignup";
import NgoLogin from "./components/pages/NgoLogin";
import Account from "./components/Account";
import NgoDashboard from "./components/pages/NgoDashboard";
import AdminDashboard from "./components/pages/AdminDashboard";
import UserProfile from "./components/UserProfile";
import DonationHistory from "./components/pages/DonationHistory";
import NgoProfile from "./components/pages/NgoProfile";
import Clothes from "./components/Donation_form/Clothes";
import Foods from "./components/Donation_form/Foods";
import Money from "./components/Donation_form/Money";
import Footer from "./components/Footer";
import Adminuser from "./components/pages/Adminuserlogin";
import Axios from "axios";

export const IsUserSignedInContext = createContext();
export const SetIsUserSignedInContext = createContext();

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState();
  const token = localStorage.getItem("authToken");
  useEffect(() => {
    const checkUserSignInStatus = async () => {
      try {
        const response = await Axios.get("http://localhost:1000/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
          
        });
        setIsUserSignedIn(response.data.status);
      } catch (error) {
        setIsUserSignedIn(false);
      }
    };
    checkUserSignInStatus();
  }, [token]);

  const ProtectedRoute = ({ children }) => {
    return isUserSignedIn ? children : <Navigate to="/mainlogin" />;
  };

  const GuestRoute = ({ children }) => {
    return !isUserSignedIn ? children : <Navigate to="/" />;
  };

  return (
    <Router>
      <Appbar
        isUserSignedIn={isUserSignedIn}
        setIsUserSignedIn={setIsUserSignedIn}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/donatebtn" element={<Donatebtn />} />

        <Route path="/clothes" element={<Clothes />} />
        <Route path="/foods" element={<Foods />} />
        <Route path="/money" element={<Money />} />

        {/* Restrict access to signup and login when logged in */}
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />
        <Route
          path="/ngosignup"
          element={
            <GuestRoute>
              <NgoSignup />
            </GuestRoute>
          }
        />
        <Route
          path="/mainsignup"
          element={
            <GuestRoute>
              <MainSignup />
            </GuestRoute>
          }
        />
        <Route
          path="/mainlogin"
          element={
            <GuestRoute>
              <MainLogin setIsUserSignedIn={setIsUserSignedIn} />
            </GuestRoute>
          }
        />
        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login setIsUserSignedIn={setIsUserSignedIn} />
            </GuestRoute>
          }

        />
        <Route
          path="/ngologin"
          element={
            <GuestRoute>
              <NgoLogin setIsUserSignedIn={setIsUserSignedIn} />
            </GuestRoute>
          }
        />
        <Route
          path="/adminuser-login"
          element={
            <GuestRoute>
              <Adminuser setIsUserSignedIn={setIsUserSignedIn} />
            </GuestRoute>
          }
        />

        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Protect dashboard and account routes */}

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <NgoDashboard />
            </ProtectedRoute>
          }
        />
     
        <Route
          path="/userprofile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donationhistory"
          element={
            <ProtectedRoute>
              <DonationHistory />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/ngoprofile"
          element={
            <ProtectedRoute>
              <NgoProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
       
      </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;
