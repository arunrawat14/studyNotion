import { combineReducers } from '@reduxjs/toolkit'
import authReducer from '../sclices/authSclice'
import profileReducer from '../sclices/profileSlice' 
import cartReducer from '../sclices/cartSlice'
import courseReducer from '../sclices/courseSlice'
import viewCourseReducer from '../sclices/viewCourseSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer,

})

export default rootReducer;