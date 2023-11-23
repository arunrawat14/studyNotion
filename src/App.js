import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgotPassword from './Pages/ForgotPassword' 
import UpdatePassword from './Pages/UpdatePassword'
import VerifyEmail from './Pages/VerifyEmail'
import About from './Pages/About'
import ContactUs from './Pages/ContactUs'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile"

function App() {
  return (
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
        <Navbar/>
        <Routes>
          <Route  path="/" element={<Home/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path='/Reset-password' element={<ForgotPassword/>} />
          <Route path='/update-password/:id' element={<UpdatePassword/>} />
          <Route path='/verify-email' element={<VerifyEmail/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<ContactUs/>} />

          <Route
            element={
            <PrivateRoute>
             <Dashboard/>
            </PrivateRoute>
            }
          >

            <Route path="/dashboard/my-profile" element={<MyProfile/>} />
                
          </Route>
        
        </Routes>
      </div>
  );
}
export default App;
