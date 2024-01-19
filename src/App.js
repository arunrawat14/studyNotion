import "./App.css";


// Redux
import { useDispatch, useSelector } from "react-redux"
// React Router
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./Pages/Home";
import Navbar from "./components/common/Navbar";

// pages
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import ForgotPassword from './Pages/ForgotPassword'
import UpdatePassword from './Pages/UpdatePassword'
import VerifyEmail from './Pages/VerifyEmail'
import About from './Pages/About'
import ContactUs from './Pages/ContactUs'
import PrivateRoute from './components/core/Auth/PrivateRoute'
import Dashboard from "./Pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses"
import AddCourse from "./components/core/Dashboard/AddCourse"
import MyCourses from "./components/core/Dashboard/MyCourses"
import Instructor from "./components/core/Dashboard/Instructor"
import EditCourse from "./components/core/Dashboard/EditCourse/index"
import Catalog from "./Pages/Catalog"
import CourseDetails from "./Pages/CourseDetails"
import ViewCourse from './Pages/ViewCourse'
import VideoDetails from "./components/core/ViewCourse/VideoDetails"
import Cart from "./components/core/Dashboard/Cart"
import Settings from "./components/core/Dashboard/Settings"

// constants
import { ACCOUNT_TYPE } from "./utils/constants"

function App() {
  const { user } = useSelector((state) => state.profile)
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter ">
      <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/Reset-password' element={<ForgotPassword />} />
        <Route path='/update-password/:id' element={<UpdatePassword />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<ContactUs />} />

        <Route path="courses/:courseId" element={<CourseDetails />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/Settings" element={<Settings />} />
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/enrolled-courses"element={<EnrolledCourses />}/>
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}

          {/* <Route path="/dashboard/enrolled-courses" element={<EnrollPage/>} /> */}
          {/* <Route path="/dashboard/add-course" element={<AddCourse/>} /> */}
          

          {/* Route only for Instructors */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="/dashboard/my-courses" element={<MyCourses/>}/>
              <Route
                path="/dashboard/edit-course/:courseId" element={<EditCourse />}
              />
            </>
          )}


        </Route>






        {/* For the watching course lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails />}
              />
            </>
          )}
        </Route>

      </Routes>
    </div>
  );
}
export default App;
