import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/core/Common/Navbar";
import Footer from "./components/core/Common/Footer";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from './components/core/Auth/PrivateRoute'
import ProfilePage from "./pages/Profile";
import Chat from "./pages/Chat";
import PaymentPage from "./pages/PaymentPage";
import PaidUser from "./pages/PaidUser";
import UnpaidUser from './pages/UnpaidUser';
import Error from './pages/Error.jsx'
import ContactUs from "./pages/ContactUs.jsx";
import { useEffect, useState } from "react";
import Spinner from "./pages/Spinner.jsx";
import logo from './assets/images/100रु वाली योजना.png'
import { useSelector } from "react-redux";


function App() {

  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
  
    // Simulating loading delay with setTimeout
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate a 2 second loading time

    // Clean up the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  
  }, []); // Run only once when component mounts

  return (
    <div className="w-[100%] min-h-screen flex flex-col font-inter bg-richblack-900 overflow-x-hidden">

      {loading ? (
        <div className="w-full min-h-screen flex items-center justify-center flex-col gap-2">
          {/* Customize your loader here */}
          {
            location.pathname == '/' ? 
            (
              <>
              <img src={logo}/>
              <Spinner/>
              </>
            ) :
            (
              <Spinner/>
            )
          }
          
        </div>
      ) : (
        <div>
      <Navbar/>
      
      <Routes>

        <Route 
          path="/" 
          element={ 
            <OpenRoute>
              <Login/> 
            </OpenRoute> }
          />
        
        <Route 
          path="/signup" 
          element={ 
            <OpenRoute>
              <Signup/> 
            </OpenRoute> 
          } 
        />

        <Route 
          path="/login" 
          element={ 
            <OpenRoute>
              <Login/> 
            </OpenRoute>
          } 
        />

        <Route 
          path="/forgot-password" 
          element={ 
            <OpenRoute>
              <ForgotPassword/> 
            </OpenRoute>
          } 
        />

        <Route 
          path="/update-password/:id" 
          element={ 
            <OpenRoute>
              <ResetPassword/> 
            </OpenRoute>
          } 
        />

        <Route 
          path="/verify-email" 
          element={ 
            <OpenRoute>
              <VerifyEmail/> 
            </OpenRoute>
          } 
        />


        <Route 
          path="/home" 
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/payment" 
          element={
            <PrivateRoute>
              <PaymentPage/>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <Chat/>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <ProfilePage/>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/user/paid" 
          element={
            <PrivateRoute>
              <PaidUser/>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/user/unpaid" 
          element={
            <PrivateRoute>
              <UnpaidUser/>
            </PrivateRoute>
          } 
        />

        <Route 
          path="/user/contact" 
          element={
            <PrivateRoute>
              <ContactUs/>
            </PrivateRoute>
          } 
        />

        <Route 
          path="*" 
          element={
              <Error/>
          } 
        />

      </Routes>


      <Footer/>
      </div>
      )
      }
      
    </div>
  );

}

export default App;
